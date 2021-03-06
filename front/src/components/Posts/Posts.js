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
import { markPostAsRead, getPostsFromCategory } from '../../api-calls';
import PostsStyled from "./Posts-styles";
import CategorySelection from "../CategorySelection/CategorySelection";
import ScrollToTop from 'react-scroll-up';

import defaultPicture from '../../images/avatar_default.jpg';
import defaultCategoryPicture from '../../images/category_default.jpeg';
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
    const activeCategory = categories.find(category => category.active);
    if (!busy && posts.length === 0) {
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

  return (
    <PostsStyled ref={postsContainer} className="posts-container">
      <ScrollToTop
        showUnder={160}
        style={{
          color: '#fff',
          zIndex: '30',
          background: '#555',
          borderRadius: '50px',
          padding: '10px',
        }}
      >
        TOP
      </ScrollToTop>
      <CategorySelection />
      <button
        aria-label="add a new post to this category"
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
      </button>
      <div
        ref={newPostAnchor}
        className="toggle-new-post__anchor"
      ></div>
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
      {!busy 
        && !categories.find(category => category.active).morePostsToFetch
        && categories.find(category => category.active).fetchOffset === 0
        && (
          <>
            <p>There are no posts here yet... Add one by clicking the
              <span style={{ fontSize: '1.2rem', padding: '0.5rem', color: 'var(--secondary' }}>top left ??? sign</span>
            </p>
            <img style={{ maxWidth: '350px', margin: '0 auto' }} src="https://c.tenor.com/mBJCnIrHef0AAAAi/fun-funny.gif" al="Carlton danse" />
          </>
        )}
      {busy && <p>LOADING...</p>}
      <div ref={bottomOfList} className="bottom-of-list"></div>
    </PostsStyled>
  );
};


const Post = (props) => {
  const { id, user, deleted, date, message, gif_address, picture, motto, replies, category_id } = props.post;
  const [token, setToken] = useAtom(tokenAtom);
  const [posts, setPosts] = useAtom(postsAtom);
  const [categories, setCategories] = useAtom(categoryAtom);
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
      setUnreadAlert(false);
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
      <img src={categories.find(c => c.id === category_id).picture || defaultCategoryPicture} alt={categories.find(c => c.id === category_id)} className="post__category-picture" />
      <div className="post__body">
        <div className='post__picture'>
          {picture
            ? <img src={picture} alt={user} />
            : <img src={defaultPicture} alt={user} />
          }
        </div>
        <div className='post__name'>{user}</div>
        <div className='post__date'>{date}</div>
        <div className='post__message'>{message}</div>
        {userInfos.nickname === user && (
          <button
            aria-label="edit this post"
            className="post__edit"
            onClick={() => {
              setModalContent(
                <EditPostModal
                  post={posts.find(post => post.id === id)}
                />
              );
              setDisplayModal(true);
            }}
          >EDIT</button>
        )}
        {(userInfos.nickname === user || userInfos.role === 'admin') && (
          <button
            aria-label="delete this post"
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
        {deleted
          ? <div className="post__motto post__user-deleted">This user has been deleted</div>
          : <div className='post__motto'>{motto}</div>
        }
        {typeof replies !== undefined && replies.length > 0 && (
          toggleShowReplies ? (
            <>
              <button
                aria-label="show or hide the post replies"
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
                {replies.map(({ id, user, deleted, date, message, picture, motto, gif_address, read }) => (
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
                        aria-label="edit this reply"
                        className="post__edit"
                        onClick={() => {
                          setModalContent(
                            <EditPostModal
                              post={
                                props.post.replies.find(reply => reply.id === id)
                              }
                            />
                          );
                          setDisplayModal(true);
                        }}
                      >EDIT</button>
                    )}
                    {(userInfos.nickname === user || userInfos.role === 'admin') && (
                      <button
                        aria-label="delete this reply"
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
                    {deleted
                      ? <div className="reply__motto reply__user-deleted">This user has been deleted</div>
                      : <div className='reply__motto'>{motto}</div>
                    }
                  </div>
                ))}
              </div>
            </>
          ) : (
            <button
              aria-label="show or hide the post replies"
              tabIndex={3 + props.index}
              className="post__show-replies"
              onClick={() => {
                setToggleShowReplies(!toggleShowReplies);
                setUnreadAlert(false);
                setIsRead(true);
              }}
            >
              replies &#10095;&#10095;
              {unreadAlert && <span className="post__unread">new</span>}
            </button>
          )
        )}
        <button
          aria-label="add a reply"
          ref={addPostRef}
          tabIndex={3 + props.index}
          className="post__toggle-new-post"
          onClick={() => {
            setToggleShowReplies(true);
            setIsRead(true);
            setModalContent(() => (
              <div className="add-child-post-container">
                <AddPostModal
                  setToggleNewPost={setToggleNewPost}
                  categoryId={category_id}
                  parentId={id}
                  repliesRef={repliesRef}
                  addPostRef={addPostRef}
                />
              </div>
            ));
            setDisplayModal(true);
          }}
        >
          <i className='icon-plus'></i>
        </button>
      </div>
    </div>
  );
};

export default Posts;;