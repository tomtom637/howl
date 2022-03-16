import { useState, useEffect, useRef } from 'react';
import { useAtom } from 'jotai';
import { tokenAtom, userInfosAtom, loggedAtom } from '../../store';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import Profile from '../Profile/Profile';
import NavStyled from './Nav-styles';

export default function Nav({ toggledMenu, setToggledMenu }) {

  const nav = useRef(null);
  const profile = useRef(null);
  const [token, setToken] = useAtom(tokenAtom);
  const [userInfos, setUserInfos] = useAtom(userInfosAtom);
  const [logged, setLogged] = useAtom(loggedAtom);
  const [toggledProfile, setToggledProfile] = useState(false);

  useEffect(() => {
    function handleClick(e) {
      if (toggledMenu && e.target !== nav.current && !nav.current.contains(e.target)) {
        setToggledMenu(false);
      }
    }

    document.addEventListener('click', handleClick);
    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, [toggledMenu, setToggledMenu]);

  return (
    <AnimatePresence>
      {toggledMenu && (
        <NavStyled
          ref={nav}
          toggledMenu={toggledMenu}
          as={motion.nav}
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
        >
          <ul className="nav-list">
            <li className="nav-item">
              <div className="nav-title">
                <i className='icon-logo'></i>
                <Link onClick={() => setToggledMenu(false)} to="/about">ABOUT</Link>
              </div>
            </li>
            {logged && (
              <>
                <li className="nav-item">
                  <div className="nav-title">
                    <i className="icon-profile"></i>
                    PROFILE
                  </div>
                  <Profile />
                </li>
                <li className="nav-item">
                  <div className="nav-title">
                    <i className="icon-logout"></i>
                    <Link
                      to="/"
                      onClick={() => {
                        setToken(null);
                        setUserInfos(null);
                        setLogged(false);
                        setToggledMenu(false);
                      }}
                    >LOGOUT</Link>
                  </div>
                </li>
              </>
            )}
          </ul>
        </NavStyled>
      )}
    </AnimatePresence>
  );
}