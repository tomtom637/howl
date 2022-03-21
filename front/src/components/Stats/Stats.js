import '../../icons.css';
import { device } from '../../device';
import { useEffect, useState } from 'react';
import { getAllUsers } from '../../api-calls';
import { useAtom } from 'jotai';
import { tokenAtom, userInfosAtom } from '../../store';
import { Link } from 'react-router-dom';
import UsersStyled from "./Stats-styles";
import defaultPicture from '../../images/avatar_default.jpg';

const Stats = () => {
  const [token, setToken] = useAtom(tokenAtom);
  const [userInfos, setUserInfos] = useAtom(userInfosAtom);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getAllUsers(setUsers, token);
  }, []);

  return (
    <UsersStyled className="container">
      <div className="stats-title">
        <h1 className='page-title'>Stats</h1>
        <Link to="/about">What are scores again?</Link>
      </div>
      <div className="users">
        {users.map(user => (
          <div className="user-card" key={user.id}>
            <div className="user-card__header">
              <div className="user-card__name">{user.nickname}</div>
              <div className="user-card__picture">
                <img src={user.picture || defaultPicture} alt={user.name} />
              </div>
              <div className="user-card__motto">{user.motto}</div>
            </div>
            <div className="user-card__body">
              <div className="user-card__stats-of-month">
                <div className="user-card__score-title">This month: </div>
                <div className="user-card__score">Score: </div>
                <div className="user-card__stats">Original posts: </div>
                <div className="user-card__stats">Posts replies: </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </UsersStyled>
  );
};

export default Stats;