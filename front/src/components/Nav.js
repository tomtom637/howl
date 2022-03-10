import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styled from 'styled-components';
import { device } from '../device';
import Form from './Form';

const NavStyled = styled.nav`
  display: flex;
  background: var(--dark-grey);
  color: #fff;
  position: fixed;
  top: 35px;
  bottom: 0;
  width: 250px;
  right: 0%;
  overflow-y: auto;
  z-index: 1000;
  ul {
    display: flex;
    flex-direction: column;
    width: 85%;
    margin: 50px 30px;
  }
  li {
    position: relative;
    border-bottom: 1px solid rgba(255, 255, 255, 0.23);
    padding-bottom: 20px;
    margin-bottom: 20px;
    cursor: pointer;
  }
  li:last-child {
    border-bottom: none;
  }
  .nav-title {
    display: flex;
    align-items: center;
  }
  i {
    margin-right: 25px;
  }
  @media ${device.tablet} {
    position: static;
    width: auto;
    overflow-y: visible;
    ul {      
      flex-direction: row;
      align-items: top;
      width: auto;
      margin: 0;
    }
    li {
      border: none;
      padding: 0;
      margin: 0 35px 0 0;
    }
    li:last-child {
      margin: 0
    }
    i {
      margin-right: 10px;
    }
  }
`;

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