import '../../icons.css';
import { device } from '../../device';
import { useEffect, useState } from 'react';
import { getAllUsers } from '../../api-calls';
import { useAtom } from 'jotai';
import { tokenAtom, userInfosAtom, usersAtom } from '../../store';
import { Link } from 'react-router-dom';
import UsersStyled from "./Users-styles";
import defaultPicture from '../../images/avatar_default.jpg';

const Users = () => {
  const [token, setToken] = useAtom(tokenAtom);
  const [userInfos, setUserInfos] = useAtom(userInfosAtom);
  const [users, setUsers] = useAtom(usersAtom);

  useEffect(() => {
    getAllUsers(setUsers, token);
  }, []);

  return (
    <UsersStyled className="container">
      <div className="stats-title">
        <h1 className='page-title'>Users</h1>
      </div>
      <div className="users">
        {users.map(user => (
          <div className="user-card" key={user.id}>
            {!user.deleted && user.role !== 'admin' && (
              <button className="user-card__delete">SOFT DELETE</button>
            )}
            <div className="user-card__header">
              <div className="user-card__name">{user.nickname}</div>
              <div className="user-card__picture">
                <img src={user.picture || defaultPicture} alt={user.name} />
              </div>
              <div
                className="user-card__role"
                style={{ background: user.role === 'admin' ? '#dfaaa4' : '#73d988' }}
              >{user.role}</div>
              <div className="user-card__email">{user.email}</div>
              {user.deleted
                ? <div className="user-card__motto user-card__deleted">Deleted</div>
                : <div className="user-card__motto">{user.motto}</div>
              }
            </div>
            <div className="user-card__body">
              <div className="user-card__stats-container">
                <h3 className="user-card__stats-title">This week: </h3>
                <div className="user-card__stats-infos">
                  <div className="user-card__labels">
                    <div className="user-card__stats">Original posts: </div>
                    <div className="user-card__stats">Posts replies: </div>
                  </div>
                  <div className="user-card__values">
                    <div className="user-card__stats">{user.original_posts_of_week}</div>
                    <div className="user-card__stats">{user.posts_replies_of_week}</div>
                  </div>
                </div>
                <h3 className="user-card__stats-title">Total: </h3>
                <div className="user-card__stats-infos">
                  <div className="user-card__labels">
                    <div className="user-card__stats">Original posts: </div>
                    <div className="user-card__stats">Posts replies: </div>
                  </div>
                  <div className="user-card__values">
                    <div className="user-card__stats">{user.original_posts_total}</div>
                    <div className="user-card__stats">{user.posts_replies_total}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </UsersStyled>
  );
};

export default Users;