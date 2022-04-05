import { useEffect, useRef, useState } from "react";
import ProfileStyled from "./Profile-styles";
import { atom, useAtom } from 'jotai';
import { userInfosAtom, tokenAtom, postsAtom } from "../../store";
import { updateMotto, updatePicture } from "../../api-calls";

import defaultPicture from '../../images/avatar_default.jpg';

const Profile = () => {
  const [userInfos, setUserInfos] = useAtom(userInfosAtom);
  const [token, setToken] = useAtom(tokenAtom);
  const [posts, setPosts] = useAtom(postsAtom);
  const [pictureChanged, setPictureChanged] = useState(false);
  const [mottoChanged, setMottoChanged] = useState(false);
  const [currentMotto, setCurrentMotto] = useState(userInfos.motto);
  const preview = useRef(null);
  const textArea = useRef(null);
  const inputFile = useRef(null);
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

  const handleMottoSubmit = e => {
    e.preventDefault();
    setMottoChanged(false);
    updateMotto(userInfos, setUserInfos, currentMotto, token);
  };

  const handlePictureSubmit = e => {
    e.preventDefault();
    const file = inputFile.current.files[0];
    let formData = new FormData();
    formData.append('image', file, file.name);
    updatePicture(userInfos, setUserInfos, posts, setPosts, token, formData);
    setPictureChanged(false);
  };

  const handlePictureChange = e => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = event => {
      preview.current.src = event.target.result;
    };
    reader.readAsDataURL(file);
    setPictureChanged(true);
  }

  useEffect(() => {
    handleTextAreaSize();
  }, [])

  return (
    <ProfileStyled>
      <ul className="profile__list">
        <li className="profile__name profile__item">{nickname}</li>
        <li className="profile__email profile__item">{email}</li>
        <li className="profile__picture profile__item">
          <form onSubmit={e => handlePictureSubmit(e)}>
            <label className="profile__picture-label" htmlFor="picture-input">
              {picture
                ? <img ref={preview} src={picture} alt={nickname}></img>
                : <img ref={preview} src={defaultPicture} alt={nickname}></img>
              }
            </label>
            <input
              ref={inputFile}
              id="picture-input"
              type="file"
              onChange={e => handlePictureChange(e)}
              className="profile__picture-input"
              accept="image/png, image/jpeg, image/jpg, image/gif"
            />
            {pictureChanged && <button type="submit" className="edit-button profile__edit">UPDATE</button>}
          </form>
        </li>
        <li className="profile__item">
          <form onSubmit={e => handleMottoSubmit(e)}>
            <textarea
              ref={textArea}
              onFocus={e => handleTextAreaSize(e)}
              onKeyDown={e => handleTextAreaSize(e)}
              onBlur={e => {handleTextAreaSize(e)}}
              onChange={e => {
                setMottoChanged(true);
                setCurrentMotto(e.target.value);
              }}
              className="profile__motto scroll"
              value={currentMotto || ''}
              placeholder="write your motto here"
            ></textarea>
            {mottoChanged && <button type="submit" className="edit-button profile__edit">UPDATE</button>}
          </form>
        </li>
      </ul>
    </ProfileStyled>
  );
};

export default Profile;
