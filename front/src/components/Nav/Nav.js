import { useState, useEffect, useRef } from 'react';
import { useAtom } from 'jotai';
import { tokenAtom, userInfosAtom, loggedAtom, toggledProfileAtom, postsAtom, categoryAtom, busyAtom } from '../../store';
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
  const [posts, setPosts] = useAtom(postsAtom);
  const [category, setCategory] = useAtom(categoryAtom);
  const [busy, setBusy] = useAtom(busyAtom);

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
            <li tabIndex={1} className="nav-item">
              <Link className='nav-title' onClick={() => setToggledMenu(false)} to="/about">
                <i className='icon-logo'></i>
                ABOUT
              </Link>
            </li>
            {logged && (
              <>
                <li tabIndex={1} className="nav-item">
                  <div className="nav-title" onClick={() => setToggledProfile(!toggledProfile)}>
                    <i className="icon-profile"></i>
                    PROFILE
                  </div>
                  <AnimatePresence>
                    {toggledProfile && (
                      <div>
                        <Profile />
                      </div>
                    )}
                  </AnimatePresence>
                </li>
                {userInfos.role === 'admin' && (
                  <li tabIndex={1} className="nav-item">
                    <Link
                      className='nav-title'
                      to="/Users"
                      onClick={() => setToggledMenu(false)}
                    >
                      <i>
                        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#fff" viewBox="0 0 30 28">
                          <path d="M9.266 14c-1.625 0.047-3.094 0.75-4.141 2h-2.094c-1.563 0-3.031-0.75-3.031-2.484 0-1.266-0.047-5.516 1.937-5.516 0.328 0 1.953 1.328 4.062 1.328 0.719 0 1.406-0.125 2.078-0.359-0.047 0.344-0.078 0.688-0.078 1.031 0 1.422 0.453 2.828 1.266 4zM26 23.953c0 2.531-1.672 4.047-4.172 4.047h-13.656c-2.5 0-4.172-1.516-4.172-4.047 0-3.531 0.828-8.953 5.406-8.953 0.531 0 2.469 2.172 5.594 2.172s5.063-2.172 5.594-2.172c4.578 0 5.406 5.422 5.406 8.953zM10 4c0 2.203-1.797 4-4 4s-4-1.797-4-4 1.797-4 4-4 4 1.797 4 4zM21 10c0 3.313-2.688 6-6 6s-6-2.688-6-6 2.688-6 6-6 6 2.688 6 6zM30 13.516c0 1.734-1.469 2.484-3.031 2.484h-2.094c-1.047-1.25-2.516-1.953-4.141-2 0.812-1.172 1.266-2.578 1.266-4 0-0.344-0.031-0.688-0.078-1.031 0.672 0.234 1.359 0.359 2.078 0.359 2.109 0 3.734-1.328 4.062-1.328 1.984 0 1.937 4.25 1.937 5.516zM28 4c0 2.203-1.797 4-4 4s-4-1.797-4-4 1.797-4 4-4 4 1.797 4 4z"></path>
                        </svg>
                      </i>
                      USERS
                    </Link>
                  </li>
                )}
                <li tabIndex={1} className="nav-item">
                  <Link
                    className='nav-title'
                    to="/"
                    onClick={() => {
                      setToken(null);
                      setLogged(false);
                      setUserInfos(null);
                      setToggledMenu(false);
                      setPosts([]);
                      setCategory([]);
                      setBusy(true);
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