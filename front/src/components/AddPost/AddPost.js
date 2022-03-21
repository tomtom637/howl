import { useEffect, useRef, useState } from "react";
import AddPostStyled from "./AddPost-styles";
import { atom, useAtom } from 'jotai';
import { userInfosAtom, tokenAtom } from "../../store";
import { addPost } from "../../api-calls";

const AddPost = ({ category, parentId }) => {
  const [userInfos, setUserInfos] = useAtom(userInfosAtom);
  const [token, setToken] = useAtom(tokenAtom);
  const textArea = useRef(null);
  const [post, setPost] = useState({
    categoryId: category,
    content: '',
    gifAddress: null,
    parentId: parentId
  });
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
    const message = textArea.current.value;
    addPost(post, token, userInfos, setToken);
  }

  useEffect(() => {
    handleTextAreaSize();
  }, []);

  return (
    <AddPostStyled>
      <form onSubmit={e => handlePostSubmit(e)}>
        <textarea
          ref={textArea}
          onFocus={e => handleTextAreaSize(e)}
          onKeyDown={e => handleTextAreaSize(e)}
          onBlur={e => { handleTextAreaSize(e); }}
          onChange={e => {
            setPost(e.target.value);
          }}
          className="profile__motto scroll"
          value={post || ''}
          placeholder="write your motto here"
        ></textarea>
        {mottoChanged && <button type="submit" className="edit-button profile__edit">UPDATE</button>}
      </form>
    </AddPostStyled>
  );
};

export default AddPost;
