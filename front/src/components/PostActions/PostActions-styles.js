import styled from 'styled-components';
import { device } from '../../device';

const PostActionsStyled = styled.div`
  display: flex;
  flex-direction: column;

  .add-post {
    &__error {
      color: var(--red);
      margin-bottom: 0.5rem;
    }
    &__textarea {
      width: 100%;
      padding: 1rem;
      font-size: 1.1rem;
      border: none;
      font-family: 'Roboto', sans-serif;
      background: #fff;
      max-height: 15rem;
      overflow-y: scroll;

      &:focus {
        outline: none;
        border: 1px solid var(--dark-grey);
        border-radius: var(--border-radius);
      }
    }
    &__hidden-gif-input {
      display: none;
    }
    &__submit {
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      padding: 0.5rem;
      margin: 0 auto 0.5rem;
      width: 95%;
      font-size: 1rem;
      letter-spacing: 0.1rem;
      font-weight: bold;
      color: #606060;
      background: var(--primary-gray-light);
      border: none;
      border-radius: var(--border-radius);
      z-index: 20;

      &:focus {
        outline: 1px solid var(--dark-grey);
        border-right: none;
      }
      &:hover {
        box-shadow: 0 0 0.2rem 0 rgba(0, 0, 0, 0.2);
        color: #222222;
        cursor: pointer;
      }
    }
  }
  .add-gif {
    margin-bottom: 3rem;
    &__gif-container {
      display: flex;
      justify-content: space-between;
      align-items: stretch;
      margin: 1rem 0;
    }
    &__gif-search {
      display: flex;
      flex-direction: column;
      flex-basis: 100%;
    }
    &__label {
      margin-bottom: 0.5rem;
    }
    &__input {
      padding: 0.5rem;
      font-size: 1.1rem;
      border: none;

      &:focus {
        outline: none;
        border: 1px solid var(--dark-grey);
        border-right: none;
        border-radius: var(--border-radius) 0 0 var(--border-radius);
      }
    }
    &__button {
      padding: 0.5rem 0.8rem;
      font-size: 1rem;
      font-weight: bold;
      color: #606060;
      letter-spacing: 0.05rem;
      background: var(--primary-gray-light);
      text-transform: uppercase;
      border: none;
      border-radius: 0 var(--border-radius) var(--border-radius) 0;

      &:focus {
        outline: 1px solid var(--dark-grey);
      }
      &:hover {
        box-shadow: 0 0 0.2rem 0 rgba(0, 0, 0, 0.2);
        color: #222222;
        cursor: pointer;
      }
    }
    &__gif-preview-container {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      grid-template-rows: masonry;
      height: 20rem;
      overflow: scroll;
      border: 5px solid rgba(0, 0, 0, 0.5);
    }
    &__gif-image {
      cursor: pointer;
    }
    &__gif-chosen {
      position: relative;
      width: 250px;
      margin: 1rem auto;
      border-radius: var(--border-radius);
      overflow: hidden;
    }
    &__remove-gif {
      background: var(--secondary-light);
      cursor: pointer;
      padding: 0.1rem 0.6rem;
      font-weight: 500;
      border-radius: var(--border-radius);
      border: none;
      font-size: 1.1rem;
      color: #2c3e50;
      position: absolute;
      right: 0;
      top: 0;
    }
  }
  @media ${device.tablet} {
    .add-post {

      &__textarea {}
      &__hidden-gif-input {}
      &__submit {}    
    }
    .add-gif {

      &__gif-container {}
      &__gif-search {}
      &__label {}
      &__input {}
      &__button {}
      &__gifs-preview {}
      &__gif-chosen {}
    }
  }
`;

export default PostActionsStyled;