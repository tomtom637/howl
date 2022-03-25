const URLS = {
  home: 'http://192.168.1.62:3000/api',
  local: 'http://localhost:3000/api',
  wrong: 'http://error.com/abracadabroo'
};

const BASE_URL = URLS.local;

export const getInfosFromToken = (userInfos, setUserInfos, token, setLogged, setBusy, setConnectionError) => {
  const fetchData = async () => {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token }),
    };
    try {
      const response = await fetch(BASE_URL + '/auth/own', options);
      const result = await response.json();
      setUserInfos(result);
      setLogged(true);
      setBusy(() => false);
    } catch (error) {
      setLogged(false);
      setBusy(false);
      setConnectionError(true);
    }
  };
  fetchData();
};

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
      const response = await fetch(BASE_URL + '/auth/login', options);
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
  fetchData();
};

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
    try {
      const response = await fetch(BASE_URL + '/auth/signup', options);
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
    } catch (error) {
      console.log(error);
    }
  };
  fetchData();
};

export const updateMotto = (userInfos, setUserInfos, currentMotto, token) => {
  const fetchData = async () => {
    const options = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ motto: currentMotto }),
    };
    try {
      await fetch(BASE_URL + `/auth/motto/${userInfos.id}`, options);
      setUserInfos({ ...userInfos, motto: currentMotto });
    } catch (error) {
      console.log(error);
    }
  };
  fetchData();
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
    try {
      const response = await fetch(BASE_URL + `/auth/picture/${userInfos.id}`, options);
      const result = await response.json();
      setUserInfos({ ...userInfos, picture: result.url });
    } catch (error) {
      console.log(error);
    }
  };
  fetchData();
};

export const getAllUsers = (setUsers, token) => {
  const fetchData = async () => {
    const options = {
      method: 'GET',
      headers: {
        'authorization': `Bearer ${token}`,
      },
    };
    try {
      const response = await fetch(BASE_URL + '/auth/', options);
      const result = await response.json();
      setUsers(result.users);
    } catch (error) {
      console.log(error);
    }
  };
  fetchData();
};

export const getPosts = (posts, setPosts, setBusy, token) => {
  const fetchData = async () => {
    const options = {
      method: 'GET',
      headers: {
        'authorization': `Bearer ${token}`,
      },
    };
    try {
      const response = await fetch(BASE_URL + '/posts/0', options);
      const result = await response.json();
      setPosts(() => result);
      setBusy(false);
    } catch (error) {
      console.log(error);
    }
  };
  fetchData();
};

export const markPostAsRead = (postId, token) => {
  const fetchData = async () => {
    const options = {
      method: 'POST',
      headers: {
        'authorization': `Bearer ${token}`,
      },
    };
    try {
      await fetch(BASE_URL + `/posts/read/${postId}`, options);
    } catch (error) {
      console.log(error);
    }
  }
  fetchData();
}

export const addPost = (post, setPost, setPostAdded, token, userInfos) => {
  const fetchData = async () => {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({post}),
    };
    try {
      const response = await fetch(BASE_URL + '/posts', options);
      const result = await response.json();
      setPostAdded(prev => prev + 1);
      setPost({...post, content: '', gifAddress: null});
    } catch (error) {
      console.log(error);
    }
  };
  fetchData();
};

export const getAllCategories = (setCategories, token) => {
  const fetchData = async () => {
    const options = {
      method: 'GET',
      headers: {
        'authorization': `Bearer ${token}`,
      },
    };
    try {
      const response = await fetch(BASE_URL + '/categories', options);
      const result = await response.json();
      setCategories([...result.categories]);
    } catch (error) {
      console.log(error);
    }
  };
  fetchData();
}