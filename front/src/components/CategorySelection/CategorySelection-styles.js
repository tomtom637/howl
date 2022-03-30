import styled from 'styled-components';
import { device } from '../../device';

const CategorySelectionStyled = styled.div`
  margin-bottom: 1rem;

  .categories {
    &__button {
      padding: 0.2rem 0.5rem;
    }
    &__container {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 0.3rem;
    }
  }
  .category {
    &__container {
      position: relative;
      cursor: pointer;
      overflow: hidden;
    }
    &__picture {
      position: absolute;
      top: 0;
      left: 0;
      opacity: 0.4;
      z-index: -1;
      height: 100px;
      width: 100%;
      object-fit: cover;
    }
    &__name {
      font-family: 'Poller one', cursive;
      font-size: 1rem;
      padding: 1rem 0 0.2rem 1.5rem;
    }
    &__description {
      font-size: 0.8rem;
      padding: 0 0 1rem 1.5rem;
    }
  }
`;

export default CategorySelectionStyled;