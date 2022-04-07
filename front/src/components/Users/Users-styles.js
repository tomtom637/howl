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
    grid-gap: 1.5rem 2rem;
    margin-bottom: 3rem;
  }
  .user-card {
    padding: 1rem;
    background: var(--grey);
    border-radius: var(--border-radius);
    box-shadow: var(--box-shadow);
    display: grid;
    align-items: baseline;
    grid-template-columns: 170px 1fr;
    color: var(--dark-grey);

    &__header {
      padding-right: 0.1rem;
      margin-right: 1rem;
      width: 100%;
    }
    &__name {
      font-size: 1.3rem;
      margin-bottom: 0.5rem;
    }
    &__email {
      font-size: 0.9rem;
      margin-bottom: 1.5rem;
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