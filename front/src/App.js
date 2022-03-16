import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { atom, useAtom } from 'jotai';
import { tokenAtom, userInfosAtom, formAtom, loggedAtom } from './store';

import { getInfosFromToken } from './api-calls';

import GlobalStyles from './global-styles/GlobalStyles';

import Header from './patterns/Header/Header';
import Hero from './patterns/Hero/Hero';
import About from './components/About/About';
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
    <Router>
      <>
        <GlobalStyles />
        <div className="site-wrapper">
          <Header />
          <div className='main-content-wrapper'>
            <Switch>
              <Route exact path="/">
                <>
                  <Hero />
                  {!logged && (
                    formType === 'login'
                      ? <LoginForm />
                      : <SignupForm />
                  )}
                </>
              </Route>
              <Route path="/about">
                <About />
              </Route>
            </Switch>
          </div>
          <Footer />
        </div>
      </>
    </Router>
  );
};

export default App;