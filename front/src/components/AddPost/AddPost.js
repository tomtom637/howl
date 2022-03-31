import { useEffect, useRef, useState } from "react";
import AddPostStyled from "./AddPost-styles";
import { atom, useAtom } from 'jotai';
import { postsAtom, userInfosAtom, tokenAtom, categoryAtom } from "../../store";
import { addPost, getAllCategories } from "../../api-calls";

const AddPost = (props) => {
  const { parentId, setToggleNewPost } = props;
  const [posts, setPosts] = useAtom(postsAtom);
  const [categories, setCategories] = useAtom(categoryAtom);
  const [token, setToken] = useAtom(tokenAtom);
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
    if (post.content.trim() === '' && !post.gifAddress) {
      return;
    }
    addPost(post, setPost, token, setNewPost);
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
  // we also toggle the post form
  useEffect(() => {
    if (newPost === null) return;
    if (newPost.parent_id === null) {
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
    setToggleNewPost(false);
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
    <AddPostStyled>
      <form className="add-post" onSubmit={e => handlePostSubmit(e)}>
        <textarea
          tabIndex={2 + props.index}
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
        <button tabIndex={3 + props.index} type="submit" className="add-post__submit">PUBLISH</button>
      </form>
      <form onSubmit={e => handleGifSearch(e)} className="add-gif">
        <div className="add-gif__gif-container">
          <div className="add-gif__gif-search">
            <input
              tabIndex={2 + props.index}
              ref={searchInput}
              placeholder="search for an Emoji"
              className="add-gif__input"
              type="search"
              name="search" id="search"
              autoComplete="off"
            />
          </div>
          <button tabIndex={2 + props.index} className="add-gif__button" type="submit">go</button>
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
          <div className="add-gif__gif-chosen">
            <img src={post.gifAddress} alt="gif" />
          </div>
        )}
      </form>
    </AddPostStyled>
  );
};

export default AddPost;
