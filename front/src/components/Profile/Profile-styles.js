import styled from 'styled-components';

const ProfileStyled = styled.div`
  display: flex;
  overflow: hidden;

  li {
    border-bottom: none;
    padding: 0;
    margin: 0.5rem 0;
  }
  .profile__motto {
    color: #fff;
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
`;

export default ProfileStyled;