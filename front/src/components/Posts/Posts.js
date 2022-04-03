import { useState, useEffect, useRef } from 'react';
import { useAtom } from 'jotai';
import {
  categoryAtom,
  tokenAtom,
  postsAtom,
  busyAtom,
  userInfosAtom,
  modalContentAtom,
  displayModalAtom
} from "../../store";
import { getPosts, markPostAsRead, getPostsFromCategory } from '../../api-calls';
import PostsStyled from "./Posts-styles";
import CategorySelection from "../CategorySelection/CategorySelection";
import { AddPost } from "../PostActions/PostActions";

import defaultPicture from '../../images/avatar_default.jpg';
import { DeleteModal, AddPostModal, EditPostModal } from '../Modal/ModalTypes';

const Posts = () => {
  const [posts, setPosts] = useAtom(postsAtom);
  const [token, setToken] = useAtom(tokenAtom);
  const [categories, setCategories] = useAtom(categoryAtom);
  const [busy, setBusy] = useAtom(busyAtom);
  const [displayModal, setDisplayModal] = useAtom(displayModalAtom);
  const [modalContent, setModalContent] = useAtom(modalContentAtom);
  const [toggleNewPost, setToggleNewPost] = useState(false);
  const [fetchMorePosts, setFetchMorePosts] = useState(false);
  const bottomOfList = useRef(null);
  const newPostAnchor = useRef(null);
  const newPostElement = useRef(null);
  const postsContainer = useRef(null);

  const tabIndex = -1;

  useEffect(() => {
    if (!busy && posts.length === 0) {
      const activeCategory = categories.find(category => category.active);
      if (activeCategory.morePostsToFetch === true) {
        getPostsFromCategory(setPosts, categories, setCategories, token);
      }
      setFetchMorePosts(false);
    }
  }, [busy]);

  // fetch posts on mount if there are no posts
  // or if the user has scrolled to the bottom of the page
  useEffect(() => {
    if (!busy && fetchMorePosts) {
      const activeCategory = categories.find(category => category.active);
      if (activeCategory.morePostsToFetch) {
        getPostsFromCategory(setPosts, categories, setCategories, token);
      }
      setFetchMorePosts(false);
    }
  }, [fetchMorePosts, categories]);

  // when the user scrolls to the bottom of the page,
  // fetch more posts
  useEffect(() => {
    if (!busy) {
      const activeCategory = categories.find(category => category.active);
      function intersectionCallback(entries) {
        if (entries[0].isIntersecting && activeCategory.morePostsToFetch) {
          setFetchMorePosts(true);
        }
      }
      const intersectionOptions = {
        root: null,
        rootMargin: '300px',
        threshold: 0
      };
      const observer = new IntersectionObserver(intersectionCallback, intersectionOptions);
      if (bottomOfList.current && posts.length > 0) {
        observer.observe(bottomOfList.current);
      }
      return () => {
        if (bottomOfList.current) {
          observer.unobserve(bottomOfList.current);
        }
      };
    }
  }, [bottomOfList.current, categories]);

  // sets the toggleNewPost button to fixed upon scroll
  useEffect(() => {
    function intersectionCallback(entries) {
      if (!newPostElement.current) return;
      if (!entries[0].isIntersecting) {
        newPostElement.current.classList.add('toggle-new-post--fixed');
        postsContainer.current.style.paddingTop = newPostElement.current.offsetHeight + 8 + 'px';
      } else {
        newPostElement.current.classList.remove('toggle-new-post--fixed');
        postsContainer.current.style.paddingTop = '0';
      }
    }
    const intersectionOptions = {
      root: null,
      rootMargin: '20px',
      threshold: 0
    };
    const observer = new IntersectionObserver(intersectionCallback, intersectionOptions);
    if (newPostAnchor.current) {
      observer.observe(newPostAnchor.current);
    }
    return () => {
      if (newPostAnchor.current) {
        observer.unobserve(newPostAnchor.current);
      }
    };
  }, [newPostAnchor.current]);

  // when a post is added, toggleNewPost is set to false
  useEffect(() => {
    if (toggleNewPost) {
      setToggleNewPost(false);
    }
  }, [posts]);

  return (
    <PostsStyled ref={postsContainer} className="posts-container">
      <CategorySelection />
      <div
        ref={newPostAnchor}
        className="toggle-new-post__anchor"
      ></div>
      <button
        ref={newPostElement}
        tabIndex={2}
        className="toggle-new-post"
        onClick={() => {
          setModalContent(() => (
            <div className="add-parent-post-container">
              <AddPostModal
                setToggleNewPost={setToggleNewPost}
                categoryId={null}
                parentId={null}
                index={tabIndex}
              />
            </div>
          ));
          setDisplayModal(true);
        }}
      >
        <i className='icon-plus'></i>
        <span>Write a new post</span>
      </button>
      {!busy && posts
        .filter(post => post.category_id === categories.find(category => category.active).id)
        .map((post, index) => (
          <Post
            setBusy={setBusy}
            post={post}
            index={index}
            key={post.id}
          />
        ))}
      {busy && <p>LOADING...</p>}
      <div ref={bottomOfList} className="bottom-of-list"></div>
    </PostsStyled>
  );
};


const Post = (props) => {
  const { id, user, date, message, gif_address, picture, motto, replies, from_category, category_id, category_picture } = props.post;
  const [token, setToken] = useAtom(tokenAtom);
  const [posts, setPosts] = useAtom(postsAtom);
  const [modalContent, setModalContent] = useAtom(modalContentAtom);
  const [displayModal, setDisplayModal] = useAtom(displayModalAtom);
  const [userInfos, setUserInfos] = useAtom(userInfosAtom);
  const [toggleShowReplies, setToggleShowReplies] = useState(false);
  const [unreadAlert, setUnreadAlert] = useState(false);
  const [isRead, setIsRead] = useState(false);
  const [toggleNewPost, setToggleNewPost] = useState(false);
  const addPostRef = useRef(null);
  const repliesRef = useRef(null);
  const newPostContainerRef = useRef(null);

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

  // scrolls automatically to the form to add a reply
  useEffect(() => {
    if (toggleNewPost) {
      setTimeout(() => {
        newPostContainerRef.current.scrollIntoView({ block: 'center', behavior: 'smooth' });
      }, 100);
    }
  }, [toggleNewPost]);

  // upon posts state load and update
  // we mark the post as unread if it is not read
  useEffect(() => {
    if (posts[props.index] && posts[props.index].replies) {
      posts[props.index].replies.forEach((reply, i) => {
        if (!reply.read) {
          setUnreadAlert(true);
        }
      });
    }
  }, [posts]);

  return (
    <div className="post__container" key={id}>
      {category_picture && (
        <img src={category_picture} alt={from_category} className="post__category-picture" />
      )}
      <div className="post__body">
        <div className='post__picture'>
          {picture
            ? <img src={picture} alt="user" />
            : <img src={defaultPicture} alt="user" />
          }
        </div>
        <div className='post__name'>{user}</div>
        <div className='post__date'>{date}</div>
        <div className='post__message'>{message}</div>
        {userInfos.nickname === user && (
          <button
            className="post__edit"
            onClick={() => {
              setModalContent(<EditPostModal />);
              setDisplayModal(true);
            }}
          >EDIT</button>
        )}
        {(userInfos.nickname === user || userInfos.role === 'admin') && (
          <button
            className="post__delete"
            onClick={() => {
              setModalContent(() => <DeleteModal postId={id} postType="post" />);
              setDisplayModal(true);
            }}
          >DELETE</button>
        )}
        {gif_address && (
          <div
            className="post__gif"
            onClick={() => {
              setModalContent(() => <img src={gif_address} alt="gif" />);
              setDisplayModal(true);
            }}
          >
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
                tabIndex={3 + props.index}
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
                    {userInfos.nickname === user && (
                      <button
                        className="reply__edit"
                        onClick={() => {
                          setDisplayModal(true);
                        }}
                      >EDIT</button>
                    )}
                    {(userInfos.nickname === user || userInfos.role === 'admin') && (
                      <button
                        className="reply__delete"
                        onClick={() => {
                          setModalContent(() => <DeleteModal postId={id} postType="reply" />);
                          setDisplayModal(true);
                        }}
                      >DELETE</button>
                    )}
                    {gif_address && (
                      <div
                        className='reply__gif'
                        onClick={() => {
                          setModalContent(() => <img src={gif_address} alt="gif" />);
                          setDisplayModal(true);
                        }}
                      >
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
              tabIndex={3 + props.index}
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
          tabIndex={3 + props.index}
          className="post__toggle-new-post"
          onClick={() => {
            setToggleShowReplies(true);
            setIsRead(true);
            setModalContent(() => (
              <div className="add-parent-post-container">
                <AddPostModal
                  setToggleNewPost={setToggleNewPost}
                  categoryId={category_id}
                  parentId={id}
                />
              </div>
            ));
            setDisplayModal(true);
          }}
        >
          <i aria-controls='add a reply' className='icon-plus'></i>
        </button>
      </div>
    </div>
  );
};

export default Posts;;