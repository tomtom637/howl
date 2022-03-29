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
    padding: 0.5rem;
    color: #555;
    display: flex;
    align-items: center;
    border-radius: var(--border-radius);
    cursor: pointer;
    border: 2px solid #8e8e8e;
    background: #fff;
    position: relative;

    &:hover {
      color: var(--secondary);
    }
    &:focus {
      outline: none;
      color: var(--secondary);
    }
    &--fixed {
      position: fixed;
      top: 40px;
      left:10px;
      right: 0;
      background: #a7aeb3;
      z-index: 10;
      width: 50px;

      &:hover i {
        color: var(--secondary);
      }
    }
    &__anchor {
      position: absolute;
      top: 40px;
    }

    i {
      margin-right: 0.5rem;
      font-size: 1.1rem;
    }
    span {
      font-size: 1.1rem;
    }
    &--fixed span {
      display: none;
    }
    &--fixed i {
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
      width: 100%;
      position: absolute;
      top: 0;
      right: 0;
      border-radius: var(--border-radius) var(--border-radius) 0 0;
      object-fit: cover;
      object-position: center;
      z-index: -10;
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
      grid-template-rows: auto 2.5rem auto;
      grid-gap: 0.1rem;
      border-radius: var(--border-radius);
      border: 2px solid #9e9e9e;
    }
    &__category {
      grid-area: category;
      padding: 0.5rem;
      font-family: 'poller one', cursive;
      font-size: 0.9rem;
      text-align: center;
      color: #555;
      letter-spacing: 0.05rem;
      text-transform: uppercase;
      border-radius: var(--border-radius);
    }
    &__picture {
      grid-area: picture;
      width: 65px;
    }
    &__name {
      grid-area: name;
      font-size: 1.1rem;
      text-align: right;
      margin-top: 1rem;
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
      margin: 0.5rem 0;
      grid-area: gif;

      img {
        width: 270px;
        border-radius: 0.4rem;
        margin: 0 auto;
      }
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
      font-size: 0.7rem;
      top: 1.8rem;
      left: 15%;
      width: 4rem;
      transform: translateX(-50%) rotate(-2deg) scale(1.2);
    }
    &__toggle-new-post {
      grid-area: tog-new;
      display: flex;
      width: 8rem;
      font-size: 1.1rem;
      justify-content: space-between;
      align-items: flex-end;
      border: none;
      color: #555;
      cursor: pointer;
      margin-left: auto;

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
    height: 30rem;
    background: #d7d9db;
    border-radius: var(--border-radius);
  }
  .reply {
    margin: auto;
    &__container {
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
      grid-template-rows: 2.5rem auto;
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
      margin-top: 1rem;
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
      margin: 0.5rem 0;
      grid-area: reply-gif;

      img {
        width: 270px;
        border-radius: 0.4rem;
        margin: 0 auto;
      }
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
  }

  @media ${device.tablet} {
    .post {

      /* &__body {
        grid-template-areas:  "category category category"
                              "  picture     .      name "
                              "  picture     .      date "
                              "  message  message    gif "
                              "  motto    motto    motto "
                              "  show     show    show   "
                              "  replies replies replies "
                              "  tog-new  tog-new    .   "
                              "add-post add-post add-post";
      }
      &__message {
        margin-top: 2rem;
      }
    }
    .reply {

      &__container {
        grid-template-areas:  "  reply-picture         .         reply-name "
                              "  reply-picture         .         reply-date "
                              "  reply-message  reply-message     reply-gif "
                              "  reply-motto    reply-motto     reply-motto ";
      }
      &__message {
        margin-top: 2rem;
      } */
    }
  }
`;

export default PostsStyled;