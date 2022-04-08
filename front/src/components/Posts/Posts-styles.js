import styled from 'styled-components';
import { device } from '../../device';
import topography from '../../images/topography.svg';

const PostsStyled = styled.div`
  position: relative;
  margin: 1rem auto;
  max-width: min(550px, calc(100% - 2rem));
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: var(--dark-grey);

  .add-parent-post-container {
    position: relative;
    padding: 1rem;
    background: rgba(225, 230, 234, 0.6);    
  }
  .toggle-new-post {
    position: fixed;
    top: 40px;
    left: 5px;
    right: 0%;
    z-index: 10;
    width: 50px;
    padding: 0.5rem;
    color: #555;
    display: flex;
    align-items: center;
    border-radius: var(--border-radius);
    cursor: pointer;
    border: none;
    background: #555;
    border-radius: 0 0 0 var(--border-radius);
    border-bottom: 3px solid var(--secondary-light);

    &:hover {
      color: var(--secondary);
    }
    &:focus {
      outline: none;
      color: var(--secondary);
    }
    i {
      margin-right: 0.5rem;
      font-size: 1.5rem;
      color: #fff;
    }
    span {
      font-size: 0.8rem;
      color: #fff;
    }
  }
  .post {
    &__container {
      margin: 1rem 0;
      position: relative;
      overflow: hidden;
      background: rgba(225, 230, 234, 0.6) url(${topography});
      border-radius: 8px;
      box-shadow: 0 0 0.2rem 0 rgba(0, 0, 0, 0.3);
    }
    &__category-picture {
      height: 5rem;
      width: 70%;
      position: absolute;
      top: 0;
      left: 0;
      border-radius: var(--border-radius) var(--border-radius) 0 0;
      -webkit-mask-image:-webkit-gradient(linear, left, right, from(rgba(0,0,0,1)), to(rgba(0,0,0,0)));
      mask-image: linear-gradient(to right, rgba(0,0,0,1), rgba(0,0,0,0));
      object-fit: cover;
      object-position: center;
      transform: translateY(-1rem) scale(1.15) rotate(-2deg);

    }
    &__body {
      display: grid;
      position: relative;
      //background: #e1e6ea;
      justify-content: start;
      align-items: start;
      padding: 1rem;
      grid-template-areas:  "category category category"
                            "  picture  name      name "
                            "  picture    .       date "
                            "  message message message "
                            "  gif      gif      gif   "
                            "  motto    motto    motto "
                            "  show     show    show   "
                            "  replies replies replies "
                            "    .       .     tog-new "
                            "add-post add-post add-post";
      grid-template-columns: 0.3fr 1fr 1fr;
      grid-template-rows: 0 1.9rem 2.5rem auto;
      grid-gap: 0.1rem;
      border-radius: var(--border-radius);
      border: 2px solid #9e9e9e;
    }
    &__picture {
      grid-area: picture;
      width: 75px;
      height: 75px;
      overflow: hidden;

      & img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
    &__name {
      grid-area: name;
      font-size: 1.1rem;
      text-align: right;
      white-space: nowrap;
    }
    &__date {
      grid-area: date;
      font-size: 0.8rem;
      text-align: right;
    }
    &__message {
      grid-area: message;
      font-size: 1rem;
      margin-top: 1rem;
      line-height: 1.6;
    }
    &__gif {
      grid-area: gif;
      margin-top: 0.5rem;

      img {
        height: 150px;
        width: auto;
        border-radius: 0.4rem;
        object-fit: contain;
      }
    }
    &__edit {
      position: absolute;
      top: 5rem;
      right: 5.2rem;
      border: none;
      padding: 0.4rem 0.5rem;
      background: #ccc;
      border-radius: 0.2rem;
      font-size: 0.65rem;
      font-weight: bold;
      letter-spacing: 0.03rem;
      color: #555;
      cursor: pointer;
    }
    &__delete {
      position: absolute;
      top: 5rem;
      right: 1rem;
      border: none;
      padding: 0.4rem 0.5rem;
      background: var(--red);
      color: #fff;
      border-radius: 0.2rem;
      font-size: 0.65rem;
      font-weight: bold;
      letter-spacing: 0.03rem;
      cursor: pointer;
    }
    &__motto {
      font-size: 0.9rem;
      font-style: italic;
      color: #999;
      grid-area: motto;
      margin-top: 0.5rem;
      margin-bottom: 0.5rem;
      padding-top: 0.7rem;
    }
    &__user-deleted {
      color: var(--secondary);
    }
    &__show-replies {
      position: relative;
      grid-area: show;
      text-align: center;
      padding: 0.7rem;
      margin-top: 1rem;
      text-transform: uppercase;
      letter-spacing: 0.05rem;
      word-spacing: 0.3rem;
      font-weight: bold;
      color: #555;
      cursor: pointer;
      border-radius: var(--border-radius);
      display: grid;
      grid-template-columns: 1fr 160px 1fr;
      align-items: center;
      border: none;
      background: none;
      
      &:focus {
        outline: none;
        color: var(--secondary);
      }
      &:hover {
        color: var(--secondary);
      }
      &::before {
        content: '';
        display: block;
        border-bottom: 2px solid var(--primary-gray-light);
        grid-column: 1 / 2;
      }
      &:hover::before {
        border-bottom: 1px solid var(--secondary);
      }
      &::after {
        content: '';
        display: block;
        border-bottom: 2px solid var(--primary-gray-light);
        grid-column: 3 / 4;
      }
      &:hover::after {
        border-bottom: 1px solid var(--secondary);
      }
    }
    &__unread {
      font-family: 'poller one', cursive;
      position: absolute;
      color: var(--secondary);
      font-size: 5rem;
      top: -37px;
      left: 26%;
      width: 4rem;
      opacity: 0.15;
      transform: translateX(-50%) rotate(5deg) scale(1.2);
    }
    &__toggle-new-post {
      grid-area: tog-new;
      display: flex;
      font-size: 1.1rem;
      justify-content: space-between;
      align-items: flex-end;
      border: none;
      color: #555;
      cursor: pointer;
      margin-left: auto;
      background: none;

      & i {
        margin-left: auto;
      }

      &:focus {
        outline: none;
        color: var(--secondary);
      }
      &:hover {
        color: var(--secondary);
      }
    }
    &__add-post-container {
      grid-area: add-post;
      margin-top: 1rem;
    }
  }
  .replies-container {
    grid-area: replies;
    margin: 1.5rem 0;
    display: flex;
    flex-direction: column;
    overflow-y: scroll;
    max-height: 30rem;
    background: #d7d9db;
    border-radius: var(--border-radius);
  }
  .reply {
    margin: auto;
    &__container {
      position: relative;
      margin-bottom: 0.5rem;
      padding: 1rem 1rem 1rem 1rem;
      border-bottom: 2px solid rgba(0, 0, 0, 0.2);
      display: grid;
      justify-content: start;
      align-items: start;
      grid-template-areas:  "  reply-picture    reply-name    reply-name "
                            "  reply-picture        .         reply-date "
                            "  reply-message reply-message reply-message "
                            "  reply-gif      reply-gif      reply-gif   "
                            "  reply-motto    reply-motto    reply-motto ";
      grid-template-columns: 0.3fr 1fr 1fr;
      grid-template-rows: 1.9rem 2.5rem auto;
      grid-gap: 0.1rem;
      border-radius: var(--border-radius);

      &:last-child {
        border-bottom: none;
      }
    }
    &__picture {
      grid-area: reply-picture;
      width: 65px;
      //height: 100px;
      overflow: hidden;
    }
    &__name {
      grid-area: reply-name;
      font-size: 1.1rem;
      text-align: right;
      white-space: nowrap;
    }
    &__date {
      grid-area: reply-date;
      font-size: 0.8rem;
      text-align: right;
    }
    &__message {
      grid-area: reply-message;
      font-size: 1rem;
      margin-top: 1rem;
      line-height: 1.6;
    }
    &__gif {
      grid-area: reply-gif;
      margin-top: 0.5rem;

      img {
        height: 150px;
        width: auto;
        border-radius: 0.4rem;
        object-fit: contain;
      }
    }
    &__edit {
      position: absolute;
      top: 5rem;
      right: 5.2rem;
      border: none;
      padding: 0.4rem 0.5rem;
      background: #ccc;
      border-radius: 0.2rem;
      font-size: 0.65rem;
      font-weight: bold;
      letter-spacing: 0.03rem;
      color: #555;
      cursor: pointer;
    }
    &__delete {
      position: absolute;
      top: 5rem;
      right: 1rem;
      border: none;
      padding: 0.4rem 0.5rem;
      background: var(--red);
      color: #fff;
      border-radius: 0.2rem;
      font-size: 0.65rem;
      font-weight: bold;
      letter-spacing: 0.03rem;
      cursor: pointer;
    }
    &__motto {
      font-size: 0.9rem;
      font-style: italic;
      color: #999;
      grid-area: reply-motto;
      margin-top: 0.5rem;
      margin-bottom: 0.5rem;
      padding-top: 0.7rem;
    }
    &__user-deleted {
      color: var(--secondary);
    }
  }

  @media ${device.tablet} {
    .toggle-new-post {     
      height: 55px;
      top: 49px;
      left: calc(50% - 300px);
      z-index: 1;
    }
    .post {

    }
  }
`;

export default PostsStyled;