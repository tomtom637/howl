import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { atom, useAtom } from 'jotai';
import { tokenAtom, userInfosAtom, formAtom, loggedAtom, modalContentAtom, displayModalAtom } from './store';

import { getInfosFromToken } from './api-calls';

import GlobalStyles from './global-styles/GlobalStyles';

import ScrollButton from './components/ScrollButton/ScrollButton';
import Modal from './components/Modal/Modal';
import Header from './components/Header/Header';
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
  const [modalContent, setModalContent] = useAtom(modalContentAtom);
  const [displayModal, setDisplayModal] = useAtom(displayModalAtom);
  const [busy, setBusy] = useState(true);
  const [connectionError, setConnectionError] = useState(false);

  useEffect(() => {
    if (token) {
      getInfosFromToken(userInfos, setUserInfos, token, setLogged, setBusy, setConnectionError);
    } else {
      setBusy(() => false);
    }
  }, []);

  const { nickname, email, motto, picture, role } = userInfos ?? {};
  return (
    <Router>
      <>
        <GlobalStyles />
        <ScrollButton />
        <div className="site-wrapper">
          <Header />
          <div className='main-content-wrapper'>
            {displayModal && (
              <Modal>{modalContent}</Modal>
            )}
            <Switch>
              <Route exact path="/">
                <>
                  {connectionError && (
                    <div className="container">
                      <div className="error-message">
                        <p>It seems we can't connect to the server at this time...</p>
                      </div>
                    </div>
                  )}
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