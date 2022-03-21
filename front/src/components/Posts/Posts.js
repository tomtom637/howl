import { useState, useEffect } from 'react';
import { useAtom } from 'jotai';
import { userInfosAtom, tokenAtom, postsAtom } from "../../store";
import { getPosts } from '../../api-calls';
import PostsStyled from "./Posts-styles";

import defaultPicture from '../../images/avatar_default.jpg';

const Posts = () => {
  const [posts, setPosts] = useAtom(postsAtom);
  const [token, setToken] = useAtom(tokenAtom);
  const [busy, setBusy] = useState(true);

  useEffect(() => {
    getPosts(posts, setPosts, setBusy, token);
  }, []);

  return (
    <PostsStyled className="posts-container">
      {!busy && posts.map(({ id, user, date, message, picture, motto, replies, from_category, category_picture }) => {
        return (
          <div className="post__container" key={id}>
            {category_picture && <img src={category_picture} alt={from_category} className="post__category-picture" />}
            <div className="post__body">
              <div className='post__category'>{from_category}</div>
              <div className='post__picture'>
                {picture
                  ? <img src={picture} alt="user" />
                  : <img src={defaultPicture} alt="user" />
                }
              </div>
              <div className='post__name'>{user}</div>
              <div className='post__date'>{date}</div>
              <div className='post__message'>{message}</div>
              <div className='post__motto'>{motto}</div>
              {replies && <div className='replies-container'>
                {replies.map(({ id, user, date, message, picture, motto }) => (

                  <div className="reply__container" key={id}>
                    <div className="reply__picture">
                      {picture
                        ? <img src={picture} alt="user" />
                        : <img src={defaultPicture} alt="user" />
                      }
                    </div>
                    <div className='reply__name'>{user}</div>
                    <div className='reply__date'>{date}</div>
                    <div className='reply__message'>{message}</div>
                    <div className='reply__motto'>{motto}</div>
                  </div>
                ))}
              </div>}
            </div>
          </div>
        );
      })}

      {busy && <p>LOADING...</p>}
    </PostsStyled>
  );
};

export default Posts;