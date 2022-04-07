import styled from 'styled-components';

const UsersStyled = styled.div`
  display: flex;
  flex-direction: column;

  .stats-title {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
  }
  a {
    color: var(--secondary);
  }
  .users {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 2rem;
    margin-bottom: 3rem;
  }
  .user-card {
    position: relative;
    padding: 1rem;
    background: var(--grey);
    border-radius: var(--border-radius);
    box-shadow: var(--box-shadow);
    display: grid;
    align-items: baseline;
    grid-template-columns: 170px 1fr;
    color: var(--dark-grey);

    &__delete {
      position: absolute;
      margin-top: -0.5rem;
      top: 0;
      right: 1rem;
      border: none;
      padding: 0.4rem 0.5rem;
      background: #bd5167;
      color: #fff;
      border-radius: 0.2rem;
      font-size: 0.65rem;
      font-weight: bold;
      letter-spacing: 0.03rem;
      cursor: pointer;
    }

    &__header {
      padding-right: 0.1rem;
      margin-right: 1rem;
      width: 100%;
    }
    &__name {
      font-size: 1.3rem;
      margin-bottom: 0.5rem;
    }
    &__role {
      text-transform: uppercase;
      font-size: 0.7rem;
      font-weight: bold;
      letter-spacing: 0.05rem;
      margin: 0.5rem 0;
      //background: var(--secondary-light);
      width: 75px;
      padding: 0.1rem 0.3rem;
    }
    &__email {
      font-size: 0.9rem;
      margin-bottom: 1.5rem;
      text-decoration: underline;
    }
    &__picture {
      width: 75px;
      height: 75px;
      object-fit: cover;
      align-self: center;
      justify-self: top;
      margin-bottom: 0.5rem;
      overflow: hidden;
    }
    &__body {
      display: flex;
      flex-direction: column;
    }
    &__stats-container {
      margin-bottom: 1rem;
    }
    &__stats-title {
      font-size: 0.8rem;
      text-transform: uppercase;
      letter-spacing: 0.1rem;
      padding-bottom: 0.5rem;
      margin-bottom: 0.5rem;
      margin-top: 1rem;
      border-bottom: 1px solid #bbb;
    }
    &__stats-infos {
      display: flex;
    }
    &__labels {
      margin-right: 0.5rem;
    }
    &__values {}
    &__stats {
      font-size: 0.8rem;
      margin-bottom: 0.8rem;
    }
    &__motto {
      font-style: italic;
      color: #777;
    }
    &__deleted {
      color: var(--secondary);
    }
  }
`;

export default UsersStyled;