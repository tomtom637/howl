import styled from 'styled-components';
import { device } from '../../device';

const CategorySelectionStyled = styled.div`
  margin-bottom: 1rem;

  .categories-header {
    height: 10rem;
    position: relative;
    overflow: hidden;

    &__picture {
      position: absolute;
      height: 100%;
      object-fit: cover;
      top: 0;
    }
    &__heading {
      position: absolute;
      top: 2rem;
      left: 0;
      right: 0;
      font-family: 'Poller One', cursive;
      text-align: center;
      padding: 1rem;
      background: rgba(0, 0, 0, 0.8);
      color: #fff;
    }
    &__button {
      padding: 0.5rem 0.9rem;
      position: absolute;
      bottom: 0;
      left: 0;
      background: rgba(255, 255, 255, 0.9);
      font-size: 0.65rem;
      font-weight: bold;
      text-transform: uppercase;
      letter-spacing: 0.03rem;
      border: none;
      cursor: pointer;

      &:hover {
        color: var(--secondary);
      }
    }
  }

  .categories {
    &__container {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 0.3rem;
      margin-top: 1rem;
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
      height: 250px;
      width: 100%;
      object-fit: cover;
    }
    &__infos {
      padding: 1rem;
    }
    &__name {
      font-family: 'Poller one', cursive;
      font-size: 1rem;
      background: rgba(255, 255, 255, 0.8);
      padding: 0.2rem 0.5rem;
    }
    &__description {
      font-size: 0.8rem;
      background: rgba(255, 255, 255, 0.8);
      padding: 0.2rem 0.5rem;
    }
    &__edit {
      position: absolute;
      bottom: 0;
      right: 0;
      padding: 0.3rem 0.6rem;
      font-size: 0.7rem;
      font-weight: bold;
      color: #fff;
      background: #555;
      border: none;
      cursor: pointer;

      &:hover {
        color: var(--secondary);
      }
    }
  }
  .category__container:hover {
    color: var(--secondary);
  }
`;

export default CategorySelectionStyled;