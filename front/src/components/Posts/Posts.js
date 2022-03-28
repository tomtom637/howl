import { useState, useEffect, useRef } from 'react';
import { useAtom } from 'jotai';
import { userInfosAtom, tokenAtom, postsAtom, offsetAtom } from "../../store";
import { getPosts, markPostAsRead } from '../../api-calls';
import PostsStyled from "./Posts-styles";
import AddPost from "../AddPost/AddPost";

import defaultPicture from '../../images/avatar_default.jpg';

const Posts = () => {
  const [posts, setPosts] = useAtom(postsAtom);
  const [token, setToken] = useAtom(tokenAtom);
  const [fetchOffset, setFetchOffset] = useAtom(offsetAtom);
  const [busy, setBusy] = useState(true);
  const [toggleNewPost, setToggleNewPost] = useState(false);
  const [fetchMorePosts, setFectchMorePosts] = useState(false);

  const tabIndex = -1;

  // fetch posts on mount if there are no posts
  // or if the user has scrolled to the bottom of the page
  useEffect(() => {
    if (posts.length === 0) {
      getPosts(posts, setPosts, fetchOffset, setFetchOffset, token);
    }
    if (fetchMorePosts) {
      getPosts(posts, setPosts, fetchOffset, setFetchOffset, token);
      setFectchMorePosts(false);
    }
  }, [fetchMorePosts]);

  useEffect(() => {
    if (posts.length > 0) {
      setBusy(false);
    }
  }, [posts]);

  return (
    <PostsStyled className="posts-container">
      <button
        tabIndex={1}
        className="toggle-new-post"
        onClick={() => {
          setToggleNewPost(!toggleNewPost);
        }}
      >
        <i className='icon-plus'></i>
        <span>Write a new post</span>
      </button>
      {toggleNewPost && (
        <div className="add-parent-post-container">
          <AddPost
            categoryId={null}
            parentId={null}
            index={tabIndex}
          />
        </div>
      )}
      {!busy && posts.map((post, index) => {
        return (
          <Post
            setBusy={setBusy}
            post={post}
            index={index}
            key={post.id}
          />
        );
      })}
      {busy && <p>LOADING...</p>}
    </PostsStyled>
  );
};


const Post = (props) => {
  const { id, user, date, message, gif_address, picture, motto, replies, from_category, category_id, category_picture } = props.post;
  const [token, setToken] = useAtom(tokenAtom);
  const [posts, setPosts] = useAtom(postsAtom);
  const [toggleShowReplies, setToggleShowReplies] = useState(false);
  const [unreadAlert, setUnreadAlert] = useState(false);
  const [isRead, setIsRead] = useState(false);
  const [toggleNewPost, setToggleNewPost] = useState(false);
  const addPostRef = useRef(null);
  const repliesRef = useRef(null);

  // if isRead state is activated on a reply,
  // we mark all siblings as read in the states
  // and if not marked as read in the db,
  // we add it to the read_post table
  useEffect(() => {
    if (isRead) {
      const updatedPosts = [...posts];
      updatedPosts[props.index] = { ...posts[props.index] };
      updatedPosts[props.index].replies = [...posts[props.index].replies];
      posts[props.index].replies.forEach((reply, i) => {
        if (!reply.read) {
          updatedPosts[props.index].replies[i].read = true;
          markPostAsRead(reply.id, token);
        }
      });
      setPosts(updatedPosts);
    }
  }, [isRead]);

  // toggles the form for adding posts
  useEffect(() => {
    if (toggleNewPost) {
      addPostRef.current.scrollIntoView({ block: 'center', behavior: 'smooth' });
    }
  }, [toggleNewPost]);

  // upon posts state load and update
  // we mark the post as unread if it is not read
  // we also scroll to the last reply after it has been published
  useEffect(() => {
    // if one of the replies hasn't been read in this post
    // we set unreadAlert to true
    posts[props.index].replies.forEach((reply, i) => {
      if (!reply.read) {
        setUnreadAlert(true);
      }
    });
    // scroll to the bottom of the replies after the user has added a new reply
    // listens for posts updates
    if (repliesRef.current) {
      repliesRef.current.scrollTo({
        top: repliesRef.current.scrollHeight,
        left: 0,
        behavior: 'smooth'
      });
    }
  }, [posts]);


  return (
    <div className="post__container" key={id}>
      {category_picture && (
        <img src={category_picture} alt={from_category} className="post__category-picture" />
      )}
      <div className="post__body">
        <div className='post__category'>{from_category}</div>
        <div className='post__picture'>
          {picture
            ? <img src={picture} alt="user" />
            : <img src={defaultPicture} alt="user" />
          }
        </div>
        <div className='post__name'>{user}</div>
        <div className='post__date'>{date}</div>
        <div className='post__message'>{message}</div>
        {gif_address && (
          <div className="post__gif">
            <img
              src={gif_address}
              alt="gif"
            />
          </div>
        )}
        <div className='post__motto'>{motto}</div>
        {typeof replies !== undefined && replies.length > 0 && (
          toggleShowReplies ? (
            <>
              <button
                tabIndex={2 + props.index}
                className="post__show-replies"
                onClick={() => {
                  setToggleShowReplies(!toggleShowReplies);
                  setToggleNewPost(false);
                }}
              >
                Hide replies &#10095;&#10095;
              </button>
              <div ref={repliesRef} id="replies-container" className="replies-container">
                {replies.map(({ id, user, date, message, picture, motto, gif_address, read }) => (
                  <div className="reply__container" key={id}>
                    <div className="reply__picture">
                      {picture
                        ? <img src={picture} alt="user" />
                        : <img src={defaultPicture} alt="user" />
                      }
                    </div>
                    <div className='reply__name'>{user}</div>
                    <div className='reply__date'>{date}</div>
                    <div className='reply__message'>{message}</div>
                    {gif_address && (
                      <div className='reply__gif'>
                        <img
                          src={gif_address}
                          alt="gif"
                        />
                      </div>
                    )}
                    <div className='reply__motto'>{motto}</div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <button
              tabIndex={2 + props.index}
              className="post__show-replies"
              onClick={() => {
                setToggleShowReplies(!toggleShowReplies);
                setUnreadAlert(false);
                setIsRead(true);
              }}
            >
              replies &#10095;&#10095;
              {unreadAlert && <span className="post__unread"> new replies</span>}
            </button>
          )
        )}
        <button
          ref={addPostRef}
          tabIndex={2 + props.index}
          className="post__toggle-new-post"
          onClick={() => {
            setToggleNewPost(!toggleNewPost);
            setToggleShowReplies(true);
            setIsRead(true);
          }}
        >
          <i className='icon-plus'></i>
          <span>Write a reply</span>
        </button>
        {toggleNewPost && (
          <div className="post__add-post-container">
            <AddPost
              // setIsRead={setIsRead}
              setBusy={props.setBusy}
              categoryId={category_id}
              parentId={id}
              index={props.index}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Posts;;