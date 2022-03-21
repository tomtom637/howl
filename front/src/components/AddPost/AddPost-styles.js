import styled from 'styled-components';
import { device } from '../../device';

const AddPostStyled = styled.div`
  
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