import styled from 'styled-components';
import { device } from '../../device';

const AddPostStyled = styled.div`
  display: flex;
  flex-direction: column;
  .add-post {
    
    &__textarea {
      width: 100%;
      padding: 0.5rem;
      font-size: 1.1rem;
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
      margin: 0 1rem 1rem;
      font-size: 1.1rem;
      letter-spacing: 0.1rem;
      font-weight: bold;
      color: #fff;
      background: var(--primary-light);
    }    
  }
  .add-gif {
    margin-bottom: 3rem;
    &__gif-container {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
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
    }
    &__button {
      padding: 0.5rem;
      font-size: 1.1rem;
      text-transform: uppercase;
    }
    &__gifs-preview {}
    &__gif-chosen {}
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

export default AddPostStyled;