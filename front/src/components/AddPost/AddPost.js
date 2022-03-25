import { useEffect, useRef, useState } from "react";
import AddPostStyled from "./AddPost-styles";
import { atom, useAtom } from 'jotai';
import { userInfosAtom, tokenAtom } from "../../store";
import { addPost, getAllCategories } from "../../api-calls";

const AddPost = (props) => {
  const { categoryId, parentId, setPostAdded } = props;
  const [userInfos, setUserInfos] = useAtom(userInfosAtom);
  const [token, setToken] = useAtom(tokenAtom);
  const textArea = useRef(null);
  const searchInput = useRef(null);
  const [post, setPost] = useState({
    categoryId,
    parentId,
    content: '',
    gifAddress: null
  });
  const [gifLoading, setGifLoading] = useState(false);
  const [gifsPreview, setGifsPreview] = useState([]);
  const [categories, setCategories] = useState([]);
  const [showCategories, setShowCategories] = useState(false);
  const [categorySelected, setCategorySelected] = useState(null);
  const { nickname, email, motto, picture } = userInfos ?? {};

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

  const handlePostSubmit = (e) => {
    e.preventDefault();
    if (post.content.trim() === '' && !post.gifAddress) {
      return;
    }
    addPost(post, setPost, setPostAdded, token, userInfos);
  };

  const handleGifSearch = (e) => {
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

  useEffect(() => {
    handleTextAreaSize();
    getAllCategories(setCategories, token);
  }, []);

  useEffect(() => {
    textArea.current.focus();
  }, [textArea.current])

  return (
    <AddPostStyled>
      <form className="add-post" onSubmit={e => handlePostSubmit(e)}>
        {!categoryId && (
          <div className="add-post__categories-wrapper">
            <button
              tabIndex={1}
              className="add-post__categories-button"
              type="button"
              onClick={() => setShowCategories(!showCategories)}
            >
              {!post.categoryId
                ? 'Select a category'
                : `${categorySelected}`
              }
            </button>
            {showCategories && (
              <div className="add-post__categories-container">
                {categories.map(category => (
                  <div
                    key={category.id}
                    className="add-post__category-container"
                    onClick={() => {
                      setPost({ ...post, categoryId: category.id });
                      setCategorySelected(category.name);
                      setShowCategories(false);
                    }}
                  >
                    {category.picture && (
                      <img
                        className="add-post__category-picture"
                        src={category.picture}
                        alt={category.name}
                      />
                    )}
                    <h3 tabIndex={1} className="add-post__category-name">{category.name}</h3>
                    <p className="add-post__category-description">{category.description}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
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
