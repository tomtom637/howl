import styled from 'styled-components';
import { device } from '../../device';
import topography from '../../images/topography.svg';

const PostsStyled = styled.div`
  margin: 1rem auto;
  max-width: min(750px, calc(100% - 2rem));
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: var(--dark-grey);

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
                            "  picture message message "
                            "  name   message  message "
                            "  date   message  message "
                            "  motto    motto    motto "
                            "  gif      gif      gif   "
                            "  show     show    show   "
                            "  replies replies replies "
                            "  tog-new  tog-new    .   "
                            "add-post add-post add-post";
      grid-template-columns: 0.3fr 1fr 1fr;
      grid-gap: 0.1rem;
      border-radius: var(--border-radius);
      box-shadow: var(--box-shadow);
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
      width: 120px;
    }
    &__name {
      grid-area: name;
      font-size: 1.1rem;
      margin: 0.5rem 0;
    }
    &__date {
      grid-area: date;
      font-size: 0.8rem;
    }
    &__message {
      grid-area: message;
      font-size: 1rem;
      margin-top: 2rem;
      margin-left: 1rem;
      line-height: 1.6;
    }
    &__gif {
      margin-top: 1rem;
      background: var(--dark-grey);
      border: 10px dashed var(--secondary-light);
      grid-area: gif;
      padding: 1rem;
      border-radius: 3rem;

      img {
        margin: 0 auto;
        width: 200px;
        border-radius: 1rem;
      }
    }
    &__motto {
      font-style: italic;
      color: #888;
      grid-area: motto;
      margin-top: 0.5rem;
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
      grid-template-columns: 1fr 0.5fr 1fr;
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
        border-bottom: 3px solid var(--primary-gray-light);
        grid-column: 1 / 2;
      }
      &:hover::before {
        border-bottom: 3px solid var(--secondary-light);
      }
      &::after {
        content: '';
        display: block;
        border-bottom: 3px solid var(--primary-gray-light);
        grid-column: 3 / 4;
      }
      &:hover::after {
        border-bottom: 3px solid var(--secondary-light);
      }
    }
    &__unread {
      position: absolute;
      color: var(--secondary);
      font-size: 0.8rem;
      top: 2rem;
      left: 50%;
      transform: translateX(-50%);
    }
    &__toggle-new-post {
      grid-area: tog-new;
      display: flex;
      width: 8rem;
      font-size: 1.1rem;
      justify-content: space-between;
      align-items: center;
      border: none;
      color: #555;

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
    justify-content: center;
  }
  .reply {
    &__container {
      margin-bottom: 1rem;
      padding: 1rem 1rem 1rem 1rem;
      border-bottom: 2px solid rgba(0, 0, 0, 0.2);
      //background: rgba(0, 0, 0, 0.05);
      display: grid;
      place-items: start;
      justify-content: start;
      align-items: start;
      grid-template-areas:  "  reply-picture reply-message reply-message "
                            "  reply-name  reply-message   reply-message "
                            "  reply-date  reply-message   reply-message "
                            "  reply-motto   reply-motto   reply-motto   "
                            "  reply-gif      reply-gif      reply-gif   ";
      grid-template-columns: 0.3fr 1fr 1fr;
      grid-gap: 0.1rem;
      border-radius: var(--border-radius);
      //box-shadow: var(--box-shadow);
    }
    &__picture {
      grid-area: reply-picture;
      width: 120px;
    }
    &__name {
      grid-area: reply-name;
      font-size: 1.1rem;
      margin: 0.5rem 0;
    }
    &__date {
      grid-area: reply-date;
      font-size: 0.8rem;
    }
    &__message {
      grid-area: reply-message;
      font-size: 1rem;
      margin-top: 2rem;
      margin-left: 1rem;
      line-height: 1.6;
    }
    &__gif {
      margin-top: 1rem;
      background: var(--dark-grey);
      border: 10px ridge #606060;
      grid-area: reply-gif;
      padding: 1rem;
      border-radius: 3rem;
      width: 300px;

      img {
        margin: 0 auto;
        width: 200px;
        border-radius: 1rem;
      }
    }
    &__motto {
      font-style: italic;
      color: #888;
      grid-area: reply-motto;
      margin-top: 0.5rem;
    }


  }

 @media ${device.tablet} {
   
 }
`;

export default PostsStyled;