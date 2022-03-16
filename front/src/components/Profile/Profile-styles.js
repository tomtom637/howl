import styled from 'styled-components';

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
    font-size: 0.9rem;
    line-height: 1.3rem;
    border: none;
    outline: none;
    width: 100%;
  }
  .profile__motto:focus {
    background: #222;
    padding: 0.2rem;
  }
  .profile__edit {
    font-size: 0.6rem;
    font-weight: 700;
    letter-spacing: 0.05rem;
    padding: 0.2rem 0.3rem;
    margin-top: 0.5rem;
    background: var(--primary);
    color: #fff;
    border-radius: var(--border-radius);
  }
  text-area {
    overflow: hidden;
  }
  .scroll::-webkit-scrollbar {
   display: none;
 }
`;

export default ProfileStyled;