import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { atom, useAtom } from 'jotai';
import { tokenAtom, userInfosAtom, formAtom, loggedAtom } from './store';

import { getInfosFromToken } from './api-calls';

import GlobalStyles from './global-styles/GlobalStyles';

import Header from './patterns/Header/Header';
import Hero from './patterns/Hero/Hero';
import Posts from './components/Posts/Posts';
import About from './components/About/About';
import Stats from './components/Stats/Stats';
import { LoginForm, SignupForm } from './components/Forms/Forms';
import Footer from './components/Footer/Footer';

const App = () => {
  const [token, setToken] = useAtom(tokenAtom);
  const [userInfos, setUserInfos] = useAtom(userInfosAtom);
  const [formType, setFormType] = useAtom(formAtom);
  const [logged, setLogged] = useAtom(loggedAtom);
  const [busy, setBusy] = useState(true);

  useEffect(() => {
    if (token) {
      getInfosFromToken(userInfos, setUserInfos, token, setLogged, setBusy);
    } else {
      setBusy(() => false);
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
                  {!logged && !busy && (
                    formType === 'login'
                      ? <LoginForm />
                      : <SignupForm />
                  )}
                  {logged && !busy && (
                    <Posts />
                  )}
                </>
              </Route>
              <Route path="/about">
                <About />
              </Route>
              <Route path="/stats">
                {logged && !busy && (
                  <Stats />
                )}
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