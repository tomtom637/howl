import { useEffect, useRef, useState } from "react";
import PostActionsStyled from "./PostActions-styles";
import { atom, useAtom } from 'jotai';
import { postsAtom, userInfosAtom, tokenAtom, categoryAtom, displayModalAtom } from "../../store";
import { addPost, getAllCategories, updatePost } from "../../api-calls";

export const AddPost = (props) => {
  const { parentId, setToggleNewPost, repliesRef, addPostRef } = props;
  const [posts, setPosts] = useAtom(postsAtom);
  const [categories, setCategories] = useAtom(categoryAtom);
  const [token, setToken] = useAtom(tokenAtom);
  const [displayModal, setDisplayModal] = useAtom(displayModalAtom);
  const [emptyMessageError, setEmptyMessageError] = useState(false);
  const textArea = useRef(null);
  const searchInput = useRef(null);
  const [post, setPost] = useState({
    categoryId: categories.find(category => category.active).id,
    parentId,
    content: '',
    gifAddress: null
  });
  const [gifLoading, setGifLoading] = useState(false);
  const [gifsPreview, setGifsPreview] = useState([]);
  const [newPost, setNewPost] = useState(null);

  const handleTextAreaSize = () => {
    textArea.current.style.height = 'inherit';
    const computed = window.getComputedStyle(textArea.current);
    const height = parseInt(computed.getPropertyValue('border-top-width'), 10)
      + parseInt(computed.getPropertyValue('padding-top'), 10)
      + textArea.current.scrollHeight
      + parseInt(computed.getPropertyValue('padding-bottom'), 10)
      + parseInt(computed.getPropertyValue('border-bottom-width'), 10);

    textArea.current.style.height = `${height}px`;
  };

  const handlePostSubmit = e => {
    e.preventDefault();
    if (post.content.trim() === '') {
      setEmptyMessageError(true);
      return;
    }
    addPost(post, setPost, token, setNewPost);
    setEmptyMessageError(false);
  };

  const handleGifSearch = e => {
    e.preventDefault();
    setGifLoading(true);
    const fetchData = async () => {
      const searchTerm = searchInput.current.value;
      const API_KEY = 'HR1T2639M3G9';
      const limit = 50;
      const url = 'https://g.tenor.com/v1/search?q=' + searchTerm + '&key=' + API_KEY + "&limit=" + limit;
      try {
        const response = await fetch(url);
        const result = await response.json();
        setGifsPreview(result.results);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData().then(setGifLoading(false));
  };

  // upon category change, reset post category
  useEffect(() => {
    setPost({ ...post, categoryId: categories.find(category => category.active).id });
  }, [categories]);

  // when a new post is added to states
  // if it is of type parent post, we increment the offset
  // else, we add the reply to the parent post
  // making sure to set that reply as read
  // we also toggle the post form.
  // scroll to the bottom of the replies after a user added a new reply
  // listens for posts updates
  useEffect(() => {
    if (!newPost) return;
    if (!newPost.parent_id) {
      setPosts(() => [newPost, ...posts]);
      const newCategories = [...categories];
      const newActiveCategory = newCategories.find(category => category.active);
      newActiveCategory.fetchOffset += 1;
      setCategories(newCategories);
    } else {
      newPost.read = true;
      const updatedPosts = [...posts];
      updatedPosts
        .filter(thePost => thePost.id === newPost.parent_id)[0]
        .replies
        .push(newPost);
      setPosts(() => updatedPosts);
    }
    if (repliesRef && repliesRef.current) {
      setTimeout(() => {
        repliesRef.current.scrollTo({
          top: repliesRef.current.scrollHeight,
          left: 0,
          behavior: 'smooth'
        });
      }, 100);
    }
    if (addPostRef && addPostRef.current) {
      setTimeout(() => {
        addPostRef.current.scrollIntoView(
          { behaviour: 'smooth', block: 'end' }
        );
      }, 100);
      setDisplayModal(false);
      setToggleNewPost(false);
    }
    setDisplayModal(false);
  }, [newPost]);

  // upon mounting, we set the textarea to the height of the text
  useEffect(() => {
    handleTextAreaSize();
  }, []);

  // if the textarea is into view, we focus to it
  useEffect(() => {
    textArea.current.focus();
  }, [textArea.current]);

  return (
    <PostActionsStyled>
      <form className="add-post" onSubmit={e => handlePostSubmit(e)}>
        {emptyMessageError && (
          <div className="add-post__error">
            You need to provide a message to post.
          </div>
        )}
        <textarea
          tabIndex={1}
          className="add-post__textarea"
          ref={textArea}
          onFocus={e => handleTextAreaSize(e)}
          onKeyDown={e => handleTextAreaSize(e)}
          onBlur={e => { handleTextAreaSize(e); }}
          onChange={e => {
            setPost({ ...post, content: e.target.value });
          }}
          value={post.content}
          placeholder="write your message here"
        ></textarea>
        <input
          type="text"
          className="add-post__hidden-gif-input"
          value={post.gifAddress || ''}
          readOnly
        />
        <button tabIndex={2} type="submit" className="add-post__submit">PUBLISH</button>
      </form>
      <form onSubmit={e => handleGifSearch(e)} className="add-gif">
        <div className="add-gif__gif-container">
          <div className="add-gif__gif-search">
            <input
              tabIndex={1}
              ref={searchInput}
              placeholder="search for an Emoji"
              className="add-gif__input"
              type="search"
              name="search" id="search"
              autoComplete="off"
            />
          </div>
          <button tabIndex={1} className="add-gif__button" type="submit">go</button>
        </div>
        {typeof gifsPreview !== undefined && gifsPreview.length > 0
          && !gifLoading
          && (
            <div className="add-gif__gif-preview-container">
              {gifsPreview.map(gif => (
                <img
                  className="add-gif__gif-image"
                  key={gif.id}
                  src={gif.media[0].tinygif.url}
                  alt="gif.content_description"
                  onClick={e => {
                    setPost({ ...post, gifAddress: gif.media[0].tinygif.url });
                    setGifsPreview([]);
                    searchInput.current.value = '';
                  }}
                />
              ))}
            </div>
          )}
        {post.gifAddress && (
          <div
            className="add-gif__gif-chosen"
            onClick={() => {
              setPost({ ...post, gifAddress: '' });
            }}
          >
            <span className="add-gif__remove-gif">&#215;</span>
            <img src={post.gifAddress} alt="gif" />
          </div>
        )}
      </form>

    </PostActionsStyled>
  );
};

export const EditPost = props => {
  const { post: currentPost } = props;
  const [posts, setPosts] = useAtom(postsAtom);
  const [categories, setCategories] = useAtom(categoryAtom);
  const [token, setToken] = useAtom(tokenAtom);
  const [displayModal, setDisplayModal] = useAtom(displayModalAtom);
  const [emptyMessageError, setEmptyMessageError] = useState(false);
  const textArea = useRef(null);
  const searchInput = useRef(null);
  const [post, setPost] = useState({
    id: currentPost.post.id,
    categoryId: currentPost.post.category_id || posts.find(p => p.id === currentPost.post.parent_id).category_id,
    parentId: currentPost.post.parent_id,
    content: currentPost.post.message,
    gifAddress: currentPost.post.gif_address
  });
  const [gifLoading, setGifLoading] = useState(false);
  const [gifsPreview, setGifsPreview] = useState([]);

  const handleTextAreaSize = () => {
    textArea.current.style.height = 'inherit';
    const computed = window.getComputedStyle(textArea.current);
    const height = parseInt(computed.getPropertyValue('border-top-width'), 10)
      + parseInt(computed.getPropertyValue('padding-top'), 10)
      + textArea.current.scrollHeight
      + parseInt(computed.getPropertyValue('padding-bottom'), 10)
      + parseInt(computed.getPropertyValue('border-bottom-width'), 10);

    textArea.current.style.height = `${height}px`;
  };

  const handlePostSubmit = e => {
    e.preventDefault();
    if (post.content.trim() === '') {
      setEmptyMessageError(true);
      return;
    };
    setEmptyMessageError(false);
    updatePost(posts, setPosts, post, token);
    setDisplayModal(false);
  };

  const handleGifSearch = e => {
    e.preventDefault();
    setGifLoading(true);
    const fetchData = async () => {
      const searchTerm = searchInput.current.value;
      const API_KEY = 'HR1T2639M3G9';
      const limit = 50;
      const url = 'https://g.tenor.com/v1/search?q=' + searchTerm + '&key=' + API_KEY + "&limit=" + limit;
      try {
        const response = await fetch(url);
        const result = await response.json();
        setGifsPreview(result.results);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData().then(setGifLoading(false));
  };

  // upon mounting, we set the textarea to the height of the text
  useEffect(() => {
    handleTextAreaSize();
  }, []);

  // if the textarea is into view, we focus to it
  useEffect(() => {
    textArea.current.focus();
  }, [textArea.current]);

  return (
    <PostActionsStyled>
      <form className="add-post" onSubmit={e => handlePostSubmit(e)}>
        {emptyMessageError && (
          <div className="add-post__error">
            You need to provide a message to post.
          </div>
        )}
        <textarea
          tabIndex={1}
          className="add-post__textarea"
          ref={textArea}
          onFocus={e => handleTextAreaSize(e)}
          onKeyDown={e => handleTextAreaSize(e)}
          onBlur={e => { handleTextAreaSize(e); }}
          onChange={e => {
            setPost({ ...post, content: e.target.value });
          }}
          value={post.content}
          placeholder="write your message here"
        ></textarea>
        <input
          type="text"
          className="add-post__hidden-gif-input"
          value={post.gifAddress || ''}
          readOnly
        />
        <button tabIndex={2} type="submit" className="add-post__submit">PUBLISH</button>
      </form>
      <form onSubmit={e => handleGifSearch(e)} className="add-gif">
        <div className="add-gif__gif-container">
          <div className="add-gif__gif-search">
            <input
              tabIndex={1}
              ref={searchInput}
              placeholder="search for an Emoji"
              className="add-gif__input"
              type="search"
              name="search" id="search"
              autoComplete="off"
            />
          </div>
          <button tabIndex={1} className="add-gif__button" type="submit">go</button>
        </div>
        {typeof gifsPreview !== undefined && gifsPreview.length > 0
          && !gifLoading
          && (
            <div className="add-gif__gif-preview-container">
              {gifsPreview.map(gif => (
                <img
                  className="add-gif__gif-image"
                  key={gif.id}
                  src={gif.media[0].tinygif.url}
                  alt="gif.content_description"
                  onClick={e => {
                    setPost({ ...post, gifAddress: gif.media[0].tinygif.url });
                    setGifsPreview([]);
                    searchInput.current.value = '';
                  }}
                />
              ))}
            </div>
          )}
        {post.gifAddress && (
          <div
            className="add-gif__gif-chosen"
            onClick={() => {
              setPost({ ...post, gifAddress: '' });
            }}
          >
            <span className="add-gif__remove-gif">&#215;</span>
            <img src={post.gifAddress} alt="gif" />
          </div>
        )}
      </form>

    </PostActionsStyled>
  );
};
