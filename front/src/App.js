import React, { useState, useEffect } from 'react';

import { atom, useAtom } from 'jotai';
import { tokenAtom, userInfosAtom, formAtom, loggedAtom } from './store';

import { getInfosFromToken } from './api-calls';

import GlobalStyles from './global-styles/GlobalStyles';

import Header from './patterns/Header/Header';
import Hero from './patterns/Hero/Hero';
import { LoginForm, SignupForm } from './components/Forms/Forms';
import Footer from './components/Footer/Footer';

const App = () => {
  const [token, setToken] = useAtom(tokenAtom);
  const [userInfos, setUserInfos] = useAtom(userInfosAtom);
  const [formType, setFormType] = useAtom(formAtom);
  const [logged, setLogged] = useAtom(loggedAtom);

  useEffect(() => {
    if (token) {
      getInfosFromToken(userInfos, setUserInfos, token, setLogged);
    } else {
      setLogged(false);
    }
  }, []);

  const { nickname, email, motto, picture, role } = userInfos ?? {};
  return (
    <>
      <GlobalStyles />
      <div className="site-wrapper">
        <div className='main-content-wrapper'>
          <Header />
          <Hero />
          {!logged && (
            formType === 'login'
              ? <LoginForm />
              : <SignupForm />
          )}
        </div>
        <Footer />
      </div>
    </>
  );
};

export default App;