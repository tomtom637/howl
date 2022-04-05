import styled from 'styled-components';
import { device } from '../../device';

const CategorySelectionStyled = styled.div`
  margin-bottom: 1rem;

  .categories-header {
    height: 13rem;
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
      bottom: 0;
      left: 0;
      right: 0;
      font-family: 'Poller One', cursive;
      padding: 1rem 1rem 2.5rem 1rem;
      background: var(--dark-grey);
      color: #fff;
    }
    &__button {
      padding: 0.5rem 0.9rem;
      position: absolute;
      bottom: 0;
      right: 0;
      background: #f1e0de;
      font-size: 0.65rem;
      font-weight: bold;
      text-transform: uppercase;
      letter-spacing: 0.03rem;
      border: none;
      cursor: pointer;
      color: var(--dark-grey);

      &:hover {
        color: var(--secondary);
      }
    }
  }

  .categories {
    &__container {
      display: grid;
      gap: 0.5rem;
      background: rgba(170, 171, 178, 0.4);
      padding: 1rem;
      border-radius: 0 0 var(--border-radius) var(--border-radius);
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
      z-index: -1;
      height: 250px;
      width: 100%;
      object-fit: cover;
    }
    &__infos {
      padding: 3rem 1rem 0 1rem;
    }
    &__name {
      font-family: 'Poller one', cursive;
      font-size: 1rem;
      background: #fff;
      padding: 0.2rem 0.5rem;
    }
    &__description {
      font-size: 0.9rem;
      background: #fff;
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
  .category__container:hover .category__name {
    color: var(--secondary);
  }
`;

export default CategorySelectionStyled;