import { useState } from "react";
import FormStyled from "./Form-styles";
import { atom, useAtom } from 'jotai';
import { formAtom, userInfosAtom, tokenAtom, loggedAtom } from "../../store";
import { signupUser, loginUser } from "../../api-calls";

export const SignupForm = () => {
  const [formType, setFormType] = useAtom(formAtom);
  const [userInfos, setUserInfos] = useAtom(userInfosAtom);
  const [token, setToken] = useAtom(tokenAtom);
  const [logged, setLogged] = useAtom(loggedAtom);
  const [email, setEmail] = useState('');
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const [nicknameError, setNicknameError] = useState(null);
  const [emailError, setEmailError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    signupUser(email, nickname, password, setNicknameError, setEmailError,
      setPasswordError, setUserInfos, setToken, setLogged);
  };

  return (
    <FormStyled>
      <h3 onClick={() => setFormType('login')}>
        <span className="active">Signup</span> / Login
      </h3>
      <form onSubmit={e => handleSubmit(e)} id="login-form">
        <div className="form-group">
          <label htmlFor="nickname">Nickname</label>
          <input
            type="text"
            className="form-control"
            id="nickname"
            placeholder="Enter a nickname"
            value={nickname}
            onChange={e => setNickname(e.target.value)}
          />
          {nicknameError && <p className="error">{nicknameError}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            className="form-control"
            id="email"
            aria-describedby="emailHelp"
            placeholder="Enter your email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          {emailError && <p className="error">{emailError}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          {passwordError && <p className="error">{passwordError}</p>}
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </FormStyled>
  );
};

export const LoginForm = () => {
  const [formType, setFormType] = useAtom(formAtom);
  const [userInfos, setUserInfos] = useAtom(userInfosAtom);
  const [token, setToken] = useAtom(tokenAtom);
  const [logged, setLogged] = useAtom(loggedAtom);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    loginUser(email, password, setEmailError, setPasswordError, setUserInfos, setToken, setLogged);
  };

  return (
    <FormStyled>
      <h3 onClick={() => setFormType('signup')}>
        Signup / <span className="active">Login</span>
      </h3>
      <form onSubmit={e => handleSubmit(e)} id="login-form">
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            className="form-control"
            id="email"
            placeholder="Enter email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          {emailError && <p className="error">{emailError}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          {passwordError && <p className="error">{passwordError}</p>}
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </FormStyled>
  );
};
