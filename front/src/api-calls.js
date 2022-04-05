const URLS = {
  home: 'http://192.168.1.62:3000/api',
  local: 'http://localhost:3000/api',
  wrong: 'http://error.com/abracadabroo'
};

const BASE_URL = URLS.home;

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

export const getPosts = (posts, setPosts, fetchOffset, setFetchOffset, setMorePostsToFetch, token) => {
  const fetchData = async () => {
    const options = {
      method: 'GET',
      headers: {
        'authorization': `Bearer ${token}`,
      },
    };
    try {
      const response = await fetch(BASE_URL + `/posts/${fetchOffset}`, options);
      const result = await response.json();
      setPosts(() => [...posts, ...result]);
      if (result.length < 5) {
        setMorePostsToFetch(false);
        setFetchOffset(prevOffset => prevOffset + result.length);
      } else {
        setFetchOffset(prevOffset => prevOffset + 5);
      }
    } catch (error) {
      console.log(error);
    }
  };
  fetchData();
};

export const getPost = (setNewPost, postId, token) => {
  const fetchData = async () => {
    const options = {
      method: 'GET',
      headers: {
        'authorization': `Bearer ${token}`,
      },
    };
    try {
      const response = await fetch(BASE_URL + `/posts/single/${postId}`, options);
      const result = await response.json();
      Promise.all([result]);
      setNewPost(result);
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
  };
  fetchData();
};

export const addPost = (post, setPost, token, setNewPost) => {
  const fetchData = async () => {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ post }),
    };
    try {
      const response = await fetch(BASE_URL + '/posts', options);
      const result = await response.json();
      return result;
    } catch (error) {
      console.log(error);
    }
  };
  let resultId = null;
  fetchData()
    .then(result => {
      resultId = result.postId;
      getPost(setNewPost, resultId, token);
    })
    .then(() => markPostAsRead(resultId, token))
    .then(() => setPost({ ...post, content: '', gifAddress: null }));
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
};

export const getPostsFromCategory = (setPosts, categories, setCategories, token) => {
  const fetchData = async () => {
    const options = {
      method: 'GET',
      headers: {
        'authorization': `Bearer ${token}`,
      },
    };
    try {
      const activeCategory = categories.find(category => category.active);

      const response = await fetch(BASE_URL + `/categories/${activeCategory.id}/${activeCategory.fetchOffset}`, options);
      const result = await response.json();
      setPosts(prevPosts => [...prevPosts, ...result]);
      setCategories(prevCategories => {
        const newCategories = [...prevCategories];
        const newActiveCategory = newCategories.find(category => category.id === activeCategory.id);
        newActiveCategory.fetchOffset += result.length;
        if (result.length < 5) newActiveCategory.morePostsToFetch = false;
        return newCategories;
      });
    } catch (error) {
      console.log(error);
    }
  };
  fetchData();
};

export const deletePost = (posts, setPosts, categories, setCategories, postId, token) => {
  const fetchData = async () => {
    const options = {
      method: 'DELETE',
      headers: {
        'authorization': `Bearer ${token}`,
      },
    };
    try {
      await fetch(BASE_URL + `/posts/${postId}`, options);
    } catch (error) {
      console.log(error);
    }
  };
  fetchData()
    .then(() => {
      const thePost = posts.find(post => post.id === postId);
      if (thePost === undefined) {
        setPosts(prevPosts => {
          const newPosts = [];
          prevPosts.forEach((post, i) => {
            newPosts[i] = post;
            newPosts[i].replies = post.replies.filter(reply => reply.id !== postId)
          });
          return newPosts;
        });
        return;
      }
      const newCategories = [...categories];
      const newActiveCategory = newCategories.find(category => category.active);
      newActiveCategory.fetchOffset -= 1;
      setCategories(newCategories);
      setPosts(prevPosts => prevPosts.filter(post => post.id !== postId));
    });
};

export const updatePost = (posts, setPosts, post, token) => {
  const fetchData = async () => {
    const options = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ post }),
    };
    try {
      await fetch(BASE_URL + `/posts/${post.id}`, options);
    } catch (error) {
      console.log(error);
    }
  };
  fetchData()
    .then(() => {
      const newPosts = [...posts];
      let newPost = newPosts.find(p => p.id === post.id);
      if (newPost === undefined) {
        newPost = newPosts.find(p => p.id === post.parentId).replies.find(r => r.id === post.id);
      }
      newPost.message = post.content;
      newPost.gif_address = post.gifAddress;
      setPosts(newPosts);
    });
}

export const updateCategoryName = (categories, setCategories, currentName, categoryIndex, token) => {
  const fetchData = async () => {
    const options = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ name: currentName }),
    };
    try {
      await fetch(BASE_URL + `/categories/name/${categories[categoryIndex].id}`, options);
    } catch (error) {
      console.log(error);
    }
  };
  fetchData()
    .then(() => {
      const newCategories = [...categories];
      newCategories[categoryIndex].name = currentName;
      setCategories(newCategories);
    });
}

export const updateCategoryDescription = (categories, setCategories, currentDescription, categoryIndex, token) => {
  const fetchData = async () => {
    const options = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ description: currentDescription }),
    };
    try {
      await fetch(BASE_URL + `/categories/description/${categories[categoryIndex].id}`, options);
    } catch (error) {
      console.log(error);
    }
  };
  fetchData()
    .then(() => {
      const newCategories = [...categories];
      newCategories[categoryIndex].description = currentDescription;
      setCategories(newCategories);
    });
}

export const updateCategoryPicture = (categories, setCategories, categoryIndex, token, file) => {
  const fetchData = async () => {
    const options = {
      method: 'PUT',
      headers: {
        'authorization': `Bearer ${token}`,
      },
      body: file,
    };
    try {
      const response = await fetch(BASE_URL + `/categories/picture/${categories[categoryIndex].id}`, options);
      const result = await response.json();
      const newCategories = [...categories];
      newCategories[categoryIndex].picture = result.url;
      setCategories(newCategories);
    } catch (error) {
      console.log(error);
    }
  };
  fetchData();
}