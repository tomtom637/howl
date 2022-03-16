// CHECK LOCALSTORAGE FOR TOKEN
// export const checkStorage = (data, setData) => {
//   const fetchData = async () => {
//     const response = await fetch('https://jsonplaceholder.typicode.com/users/1');
//     const result = await response.json();
//     setData(result.name);
//   }
//   if(!data) {
//     fetchData().catch(error => console.error(error));
//   }
// }

// GET USER INFOS FROM TOKEN
export const getInfosFromToken = (userInfos, setUserInfos, token, setLogged) => {
  const fetchData = async () => {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token }),
    };
    const response = await fetch('http://192.168.1.62:3000/api/auth/own', options);
    const result = await response.json();
    setUserInfos(result);
    setLogged(true);
  };
  fetchData().catch(error => console.error(error));
};

// LOGIN THE USER
export const loginUser = (
  email,
  password,
  setEmailError,
  setPasswordError,
  setUserInfos,
  setToken,
  setLogged
) => {
  const fetchData = async () => {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    };
    try {
      const response = await fetch('http://192.168.1.62:3000/api/auth/login', options);
      const result = await response.json();
      setEmailError(null);
      setPasswordError(null);
      if (result.errors) {
        result.errors.forEach(error => {
          switch (error.type) {
            case 'email':
              setEmailError(error.errorMessage);
              break;
            case 'password':
              setPasswordError(error.errorMessage);
              break;
          }
        });
        return;
      }
      setToken(result.token);
      setUserInfos({
        id: result.id,
        nickname: result.nickname,
        email: result.email,
        motto: result.motto,
        picture: result.picture,
        role: result.role
      });
      setLogged(true);
    } catch (error) {
      console.log(error);
    }

  };
  fetchData().catch(error => console.error(error));
};

// SIGNUP THE USER
export const signupUser = (
  email,
  nickname,
  password,
  setNicknameError,
  setEmailError,
  setPasswordError,
  setUserInfos,
  setToken,
  setLogged
) => {
  const fetchData = async () => {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, nickname, password }),
    };
    const response = await fetch('http://192.168.1.62:3000/api/auth/signup', options);
    const result = await response.json();
    setEmailError(null);
    setNicknameError(null);
    setPasswordError(null);
    if (result.errors) {
      result.errors.forEach(error => {
        switch (error.type) {
          case 'email':
            setEmailError(error.errorMessage);
            break;
          case 'nickname':
            setNicknameError(error.errorMessage);
            break;
          case 'password':
            setPasswordError(error.errorMessage);
            break;
        }
      });
      return;
    }
    loginUser(email, password, setEmailError, setPasswordError, setUserInfos, setToken, setLogged);
  };
  fetchData().catch(error => console.error(error));
};

export const updateMotto = (userInfos, token) => {
  console.log(userInfos);
  const fetchData = async () => {
    const options = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ motto: userInfos.motto }),
    };
    await fetch(`http://192.168.1.62:3000/api/auth/motto/${userInfos.id}`, options);
  };
  fetchData().catch(error => console.error(error));
};

export const updatePicture = (userInfos, setUserInfos, token, file) => {
  const fetchData = async () => {
    const options = {
      method: 'PUT',
      headers: {
        // 'Content-Type': 'application/json',
        'authorization': `Bearer ${token}`,
      },
      body: file,
    };
    const response = await fetch(`http://192.168.1.62:3000/api/auth/picture/${userInfos.id}`, options);
    const result = await response.json();
    setUserInfos({ ...userInfos, picture: result.url });
  };
  fetchData().catch(error => console.error(error));
};