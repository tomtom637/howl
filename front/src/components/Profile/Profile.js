import { useState } from "react";
import ProfileStyled from "./Profile-styles";
import { atom, useAtom } from 'jotai';
import { userInfosAtom, tokenAtom } from "../../store";
import { updateMotto } from "../../api-calls";

import defaultPicture from'../../images/avatar_default.jpg';

const Profile = () => {
  const [userInfos, setUserInfos] = useAtom(userInfosAtom);
  const [token, setToken] = useAtom(tokenAtom);
  const { nickname, email, motto, picture } = userInfos ?? {};

  const handleTextAreaSize = (e) => {
    e.target.style.height = 'inherit';
    const computed = window.getComputedStyle(e.target);
    const height = parseInt(computed.getPropertyValue('border-top-width'), 10)
      + parseInt(computed.getPropertyValue('padding-top'), 10)
      + e.target.scrollHeight
      + parseInt(computed.getPropertyValue('padding-bottom'), 10)
      + parseInt(computed.getPropertyValue('border-bottom-width'), 10);

    e.target.style.height = `${height}px`;
  };

  const handleMottoSubmit = (e) => {
    e.preventDefault();
    updateMotto(userInfos, token);
  }

  return (
    <ProfileStyled>
      <ul>
        <li>
          {picture
            ? <img src={picture} alt={nickname}></img>
            : <img src={defaultPicture} alt={nickname}></img>
          }
          <button className="profile__edit">EDIT</button>
        </li>
        <li>{nickname}</li>
        <li className="profile__email">{email}</li>
        <li>
          <form onSubmit={e => handleMottoSubmit(e)}>
            <textarea
              rows="2"
              onFocus={e => handleTextAreaSize(e)}
              onKeyDown={e => handleTextAreaSize(e)}
              onBlur={e => handleTextAreaSize(e)}
              onChange={e => setUserInfos({ ...userInfos, motto: e.target.value })}
              className="profile__motto"
              value={motto}
              placeholder="write your motto here, then press update"
            ></textarea>
            <button type="submit" className="profile__edit">UPDATE</button>
          </form>
        </li>
      </ul>
    </ProfileStyled>
  );
};

export default Profile;
