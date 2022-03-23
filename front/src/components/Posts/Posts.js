import { useState, useEffect } from 'react';
import { useAtom } from 'jotai';
import { userInfosAtom, tokenAtom, postsAtom } from "../../store";
import { getPosts, markPostAsRead } from '../../api-calls';
import PostsStyled from "./Posts-styles";
import AddPost from "../AddPost/AddPost";

import defaultPicture from '../../images/avatar_default.jpg';

const Posts = () => {
  const [posts, setPosts] = useAtom(postsAtom);
  const [token, setToken] = useAtom(tokenAtom);
  const [postAdded, setPostAdded] = useState(1);
  const [busy, setBusy] = useState(true);

  useEffect(() => {
    getPosts(posts, setPosts, setBusy, token);
  }, [postAdded]);

  return (
    <PostsStyled className="posts-container">
      {!busy && posts.map((post, index) => {
        return (
          <Post
            post={post}
            index={index}
            setPostAdded={setPostAdded}
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
  const [showReplies, setShowReplies] = useState(false);
  const [unreadAlert, setUnreadAlert] = useState(true);
  const [isRead, setIsRead] = useState(false);

  const markAsRead = (postId) => {
    markPostAsRead(postId, token);
  };

  useEffect(() => {
    for (let reply of replies) {
      if (!reply.read) {
        break;
      }
      setIsRead(true);
    }
    if (isRead) {
      const newPosts = [...posts];
      newPosts[props.index] = { ...posts[props.index] };
      newPosts[props.index].replies = [...posts[props.index].replies];
      posts[props.index].replies.forEach((reply, i) => {
        if (!reply.read) {
          newPosts[props.index].replies[i].read = true;
          markAsRead(reply.id);
        }
      });
      setPosts(newPosts);
      setUnreadAlert(false);
    }
  }, [isRead]);


  return (
    <div className="post__container" key={id}>
      {category_picture && <img src={category_picture} alt={from_category} className="post__category-picture" />}
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
          showReplies ? (
            <>
              <button
                tabIndex={1 + props.index}
                className="post__show-replies"
                onClick={() => setShowReplies(!showReplies)}
              >
                Hide replies &#10095;&#10095;
              </button>
              <div className="replies-container">
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
              tabIndex={1 + props.index}
              className="post__show-replies"
              onClick={() => {
                setShowReplies(!showReplies);
                setUnreadAlert(false);
                setIsRead(true);
              }}
            >
              replies &#10095;&#10095;
              {unreadAlert && <span className="post__unread"> (new)</span>}
            </button>
          )
        )}
        <div className="post__add-post-container">
          <AddPost categoryId={category_id} parentId={id} setPostAdded={props.setPostAdded} index={props.index} />
        </div>
      </div>
    </div >
  );
};

export default Posts;;