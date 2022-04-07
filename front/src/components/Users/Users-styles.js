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
      margin-bottom: 0.5rem;
    }
    &__picture {
      width: 150px;
      align-self: center;
      justify-self: top;
      margin-bottom: 0.5rem;
    }
    &__body {
      display: flex;
      flex-direction: column;
      margin-top: 2rem;
    }
    &__stats-of-month {
      margin-bottom: 1rem;
    }
    &__score-title {
      font-size: 0.8rem;
      text-transform: uppercase;
      letter-spacing: 0.1rem;
      padding-bottom: 0.5rem;
      margin-bottom: 2rem;
      border-bottom: 1px solid #bbb;
    }
    &__score {
      font-size: 1rem;
      text-transform: uppercase;
      margin-bottom: 1.5rem;
      color: var(--secondary);
    }
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