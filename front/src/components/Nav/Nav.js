import { useState, useEffect, useRef } from 'react';
import { useAtom } from 'jotai';
import { tokenAtom, userInfosAtom, loggedAtom, toggledProfileAtom } from '../../store';
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
  const [toggledProfile, setToggledProfile] = useAtom(toggledProfileAtom);

  useEffect(() => {
    function handleClick(e) {
      if (toggledMenu && e.target !== nav.current && !nav.current.contains(e.target)) {
        setToggledMenu(false);
        setToggledProfile(false);
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
              <Link className='nav-title' onClick={() => setToggledMenu(false)} to="/about">
                <i className='icon-logo'></i>
                ABOUT
              </Link>
            </li>
            {logged && (
              <>
                <li className="nav-item">
                  <div className="nav-title" onClick={() => setToggledProfile(!toggledProfile)}>
                    <i className="icon-profile"></i>
                    PROFILE
                  </div>
                  <AnimatePresence>
                    {toggledProfile && (
                      // <motion.div
                      //   initial={{ y: -100, opacity: 0 }}
                      //   animate={{ y: 0, opacity: 1 }}
                      //   exit={{ y: -100, opacity: 0 }}
                      //   transition={{ duration: 0.2, ease: 'easeInOut' }}
                      // >
                      <div>
                        <Profile />
                      </div>
                    )}
                  </AnimatePresence>
                </li>
                <li className="nav-item">
                  <Link
                    className='nav-title'
                    to="/Stats"
                    onClick={() => setToggledMenu(false)}
                  >
                    <i className="icon-logo"></i>
                    STATS
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className='nav-title'
                    to="/"
                    onClick={() => {
                      setToken(null);
                      setUserInfos(null);
                      setLogged(false);
                      setToggledMenu(false);
                    }}
                  >
                    <i className="icon-logout"></i>
                    LOGOUT
                  </Link>
                </li>
              </>
            )}
          </ul>
        </NavStyled>
      )}
    </AnimatePresence>
  );
}