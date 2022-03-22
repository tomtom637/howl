import { useEffect, useRef, useState } from "react";
import AddPostStyled from "./AddPost-styles";
import { atom, useAtom } from 'jotai';
import { userInfosAtom, tokenAtom } from "../../store";
import { addPost } from "../../api-calls";

const AddPost = ({ category, parentId }) => {
  const [userInfos, setUserInfos] = useAtom(userInfosAtom);
  const [token, setToken] = useAtom(tokenAtom);
  const textArea = useRef(null);
  const searchInput = useRef(null);
  const [post, setPost] = useState({
    categoryId: category,
    content: '',
    gifAddress: null,
    parentId: parentId
  });
  const [gifLoading, setGifLoading] = useState(false);
  const [gifsPreview, setGifsPreview] = useState([]);
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
    const content = textArea.current.value;
    const gif =
      addPost(content, setPost, token, userInfos, setToken);
  };

  const handleGifSearch = (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    handleTextAreaSize();
  }, []);

  return (
    <AddPostStyled>
      <form className="add-post" onSubmit={e => handlePostSubmit(e)}>
        <textarea
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
        <button type="submit" className="add-post__submit">PUBLISH</button>
      </form>
      <form onSubmit={e => handleGifSearch} className="add-gif">
        <div className="add-gif__gif-container">
          <div className="add-gif__gif-search">
            <input
              ref={searchInput}
              placeholder="search for an Emoji"
              className="add-gif__input"
              type="search"
              name="search" id="search"
            />
          </div>
          <button className="add-gif__button" type="button">go</button>
          {typeof gifsPreview !== undefined && gifsPreview.length > 0
            && !gifLoading
            && gifsPreview.map(gif => (
              <img
                className="add-gif__gifs-preview"
                key={gif}
                src={gif}
                alt="gif"
                onClick={e => {
                  setPost({ ...post, gifAddress: gif });
                  setGifsPreview([]);
                }}
              />
            ))}
          {post.gifAddress && (
            <div className="add-gif__gif-chosen">
              <img src={post.gifAddress} alt="gif" />
            </div>
          )}
        </div>
      </form>

      {/* {mottoChanged && <button type="submit" className="edit-button profile__edit">UPDATE</button>} */}
    </AddPostStyled>
  );
};

export default AddPost;
