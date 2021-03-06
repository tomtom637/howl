import '../../icons.css';
import { device } from '../../device';
import { useEffect, useState } from 'react';
import { getAllUsers } from '../../api-calls';
import { useAtom } from 'jotai';
import { tokenAtom, userInfosAtom, usersAtom, displayModalAtom, modalContentAtom } from '../../store';
import { Link } from 'react-router-dom';
import UsersStyled from "./Users-styles";
import { DeleteUserModal } from '../Modal/ModalTypes';
import defaultPicture from '../../images/avatar_default.jpg';

const Users = () => {
  const [token, setToken] = useAtom(tokenAtom);
  const [userInfos, setUserInfos] = useAtom(userInfosAtom);
  const [users, setUsers] = useAtom(usersAtom);
  const [displayModal, setDisplayModal] = useAtom(displayModalAtom);
  const [modalContent, setModalContent] = useAtom(modalContentAtom);

  useEffect(() => {
    getAllUsers(setUsers, token);
  }, []);

  return (
    <UsersStyled>
      <div className="users__wrapper">
        <div className="stats-title">
          <h1 className='page-title'>Users</h1>
          <Link to="/"> Back to Home</Link>
        </div>
        <div className="users">
          {users.map(user => (
            <div className="user-card" key={user.id}>
              {!user.deleted && user.role !== 'admin' && (
                <button
                  className="user-card__delete"
                  onClick={() => {
                    setModalContent(<DeleteUserModal userId={user.id} />);
                    setDisplayModal(true);
                  }}
                >SOFT DELETE</button>
              )}
              <div className="user-card__header">
                <div className="user-card__top-container">
                  <div className="user-card__picture">
                    <img src={user.picture || defaultPicture} alt={user.name} />
                  </div>
                  <div className="user-card__name-container">
                    <div className="user-card__name">{user.nickname}</div>
                    <div
                      className="user-card__role"
                      style={{ background: user.role === 'admin' ? '#dfaaa4' : '#73d988' }}
                    >{user.role}</div>
                    <div className="user-card__date">
                      {user.register_date}
                    </div>
                  </div>
                </div>
                <div className="user-card__email">{user.email}</div>
                {user.deleted
                  ? <div className="user-card__motto user-card__deleted">Deleted</div>
                  : <div className="user-card__motto">{user.motto}</div>
                }
              </div>
              <div className="user-card__body">
                <div className="user-card__stats-container">
                  <div className="user-card__stats-infos-container">
                    <h3 className="user-card__stats-title">Last 7 days: </h3>
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
                  </div>
                  <div className="user-card__stats-infos-container">
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
            </div>
          ))}
        </div>
      </div>
    </UsersStyled>
  );
};

export default Users;