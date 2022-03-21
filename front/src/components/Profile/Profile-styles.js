import styled from 'styled-components';
import { device } from '../../device';

const ProfileStyled = styled.div`
  display: flex;
  overflow: hidden;

  .profile__list {
    margin: 0;
    cursor: default;
  }
  .profile__item {
    border-bottom: none;
    padding: 0;
  }
  .profile__name {
    font-size: 1.5rem;
    margin-top: 1rem;
  }
  .profile__picture {
    width: 150px;
    margin-top: 1rem;
  }
  .profile__picture-label {
    cursor: pointer;
  }
  .profile__picture-input {
    display: none;
  }
  .profile__email {
    font-size: 1rem;
    color: var(--secondary-light);
    text-decoration: underline;
  }
  .profile__motto {
    margin-top: 1rem;
    color: #ddd;
    background: var(--dark-grey);
    font-style: italic;
    font-size: 1.05rem;
    line-height: 1.4rem;
    border: none;
    outline: none;
    width: 100%;
  }
  .profile__motto:focus {
    background: #222;
    padding: 0.2rem;
  }
  .profile__edit {
    
  }
  text-area {
    overflow: hidden;
  }
  .scroll::-webkit-scrollbar {
   display: none;
 }

 @media ${device.tablet} {
   
   .profile__list {
      background: var(--dark-grey);
      width: 100%;
      position: fixed;
      flex-direction: column;
      padding: 1rem;
      right: 0;
      left: 0;
      top: 35px;
   }
 }
`;

export default ProfileStyled;