import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Form from '../Form/Form';
import NavStyled from './Nav-styles';

export default function Nav({ toggledMenu, setToggledMenu }) {

  const nav = useRef(null);

  useEffect(() => {
    function handleClick(e) {
      if(toggledMenu && e.target !== nav.current && !nav.current.contains(e.target)) {
        setToggledMenu(false);
      }
    }

    document.addEventListener('click', handleClick);
    return () => {
      document.removeEventListener('click', handleClick);
    }
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
              <i className="icon-fingerprint"></i>
              LOGIN
              </div>
              <Form />
            </li>
            <li className="nav-item">
              <div className="nav-title">
                <i className="icon-signup"></i>
                SIGNUP
              </div>
              
            </li>
            <li className="nav-item">
              <div className="nav-title">
                <i className="icon-profile"></i>
                PROFILE
              </div>
              
            </li>
          </ul>
        </NavStyled>
      )}
    </AnimatePresence>
  );
}