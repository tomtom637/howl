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
      font-size: 1rem;
      color: #666;
      text-align: center;
      padding-bottom: 0.5rem;
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
      background: #fff;
      color: white;
      z-index: 30;
      border-radius: var(--border-radius);
      margin: auto;
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
      cursor: pointer;
      padding: 0.3rem 0.8rem;
      font-weight: 500;
      border-radius: var(--border-radius);
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
      background: #bd5167;
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

 @media ${device.tablet} {
   
 }
`;

export default ModalStyled;