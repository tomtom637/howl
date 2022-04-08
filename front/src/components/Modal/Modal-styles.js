import styled from 'styled-components';
import { device } from '../../device';

const ModalStyled = styled.div`

  .post-actions {
    
    &__container {
    padding: 0.5rem 1rem;
    background: #ebebeb;
    border-radius: 0.3rem;
    }
    &__title {
      font-family: 'Poller One', cursive;
      font-size: 1rem;
      color: #666;
      text-align: center;
      padding: 1rem 0 2rem;
      letter-spacing: 0.05rem;
    }
  }
  .modal {
    &__dark-bg {
      background-color: rgba(0, 0, 0, 0.5);
      position: fixed;
      width: 100vw;
      height: 100vh;
      z-index: 20;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
    &__container {
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: min(50%, 350px);
      min-width: 20rem;
      min-height: 10rem;
      max-height: 95vh;
      background: #fff;
      color: white;
      z-index: 30;
      border-radius: var(--border-radius);
      margin: auto;
      overflow: hidden;
    }
    &__header {
      height: 40px;
      background: white;
      overflow: hidden;
      border-top-left-radius: var(--border-radius);
      border-top-right-radius: var(--border-radius);
    }
    &__heading {
      margin: 0;
      padding: 0.5rem;
      color: #2c3e50;
      font-weight: 500;
      font-size: 1.1rem;
      text-align: center;
    }
    &__content {
      padding: 0.5rem;
      font-size: 0.9rem;
      color: #2c3e50;
      text-align: center;
      line-height: 1.5;
    }
    &__actions {
      padding: 0.5rem;
    }
    &__actions-container {
      display: flex;
      justify-content: space-around;
      align-items: center;
    }
    &__btn {
      &:focus {
        outline: 2px solid #777;
      }
    }
    &__close-btn {
      background: var(--secondary-light);
      cursor: pointer;
      padding: 0.1rem 0.6rem;
      font-weight: 500;
      border: none;
      font-size: 1.1rem;
      color: #2c3e50;
      position: absolute;
      right: 0;
      top: 0;
      align-self: flex-end;
    }
    &__action-btn {
      margin-top: 10px;
      cursor: pointer;
      font-weight: 500;
      padding: 11px 28px;
      border-radius: var(--border-radius);
      font-size: 0.8rem;
      border: none;
      color: #fff;
      background: var(--red);
      transition: all 0.25s ease;
    }
    &__cancel-btn {
      margin-top: 0.5rem;
      cursor: pointer;
      font-weight: 500;
      padding: 11px 28px;
      border-radius: var(--border-radius);
      font-size: 0.8rem;
      border: none;
      color: #2c3e50;
      background: #eee;
      transition: all 0.25s ease;
    }
    &__cancel-btn:hover {
      box-shadow: none;
      background: whitesmoke;
    }
  }
  .category-modal {
    &__list {
      margin: 1rem;
      display: flex;
      flex-direction: column;
    }
    &__item {
      border-bottom: none;
    }
    &__name {
      font-size: 1.2rem;
      margin-top: 1rem;
      padding: 0.5rem;
      width: 100%;
      font-family: 'Poller One', cursive;
    }
    &__description {
      font-size: 0.9rem;
      margin-top: 1rem;
      padding: 0.5rem;
      width: 100%;
      font-family: 'Roboto', sans-serif;
    }
    &__picture {
      width: 100%;
      margin-top: 1rem;
      object-fit: cover;
    }
    &__picture-label {
    cursor: pointer;
    }
    &__picture-input {
      display: none;
    }
    &__message {
      font-size: 1rem;
      color: #333333;
      text-align: center;
      margin-bottom: 1rem;
    }

  }

 @media ${device.tablet} {
   
 }
`;

export default ModalStyled;