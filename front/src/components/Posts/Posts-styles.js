import styled from 'styled-components';
import { device } from '../../device';
import topography from '../../images/topography.svg';

const PostsStyled = styled.div`
  margin: 1rem auto;
  max-width: 750px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: var(--dark-grey);

  .post {
    &__container {
      margin: 1rem 0;
      position: relative;
      overflow: hidden;
      background: rgba(0, 0, 0, 0) url(${topography});
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
      opacity: 0.7;
      z-index: -10;
      transform: translateY(-1rem) scale(1.15) rotate(-2deg);

    }
    &__body {
      display: grid;
      background: rgba(200, 200, 200, 0.5);
      justify-content: start;
      align-items: start;
      padding: 1rem;
      grid-template-areas:  "category category category"
                            "  picture message message "
                            "  picture message message "
                            "  picture message message "
                            "  picture message message "
                            "  name  message  message  "
                            "  date    motto    motto  "
                            "  show    show    show    "
                            "  replies replies replies ";
      grid-template-columns: 0.4fr 1fr 1fr;
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
    &__motto {
      font-style: italic;
      color: #888;
      grid-area: motto;
      margin-left: 1rem;
    }
    &__show-replies {
      grid-area: show;
      text-align: center;
      padding: 1rem;
      background: #ccc;
      margin-top: 1rem;
      text-transform: uppercase;
      letter-spacing: 0.05rem;
      word-spacing: 0.3rem;
      font-weight: bold;
      color: #555;
      cursor: pointer;
    }
  }
  .replies-container {
    grid-area: replies;
    margin: 1.5rem 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 90%;
  }
  .reply {
    &__container {
      margin-bottom: 1rem;
      padding: 1rem 1rem 1rem 1rem;
      border-bottom: 2px solid rgba(0, 0, 0, 0.2);
      //background: rgba(0, 0, 0, 0.05);
      display: grid;
      justify-content: start;
      align-items: start;
      grid-template-areas:  "  reply-picture reply-message reply-message "
                            "  reply-picture reply-message reply-message "
                            "  reply-picture reply-message reply-message "
                            "  reply-picture reply-message reply-message "
                            "  reply-name  reply-message  reply-message  "
                            "  reply-date  reply-motto  reply-motto      ";
      grid-template-columns: 0.9fr 1fr 1fr;
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
    &__motto {
      font-style: italic;
      color: #888;
      grid-area: reply-motto;
      margin-left: 1rem;
    }


  }

 @media ${device.tablet} {
   
 }
`;

export default PostsStyled;