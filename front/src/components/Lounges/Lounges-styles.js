import styled from 'styled-components';

const LoungesStyled = styled.div`
  background: var(--dark-grey);
  color: #fff;
  padding-top: 15px;
  padding-bottom: 10px;
  h2 {
    font-size: 1.1rem;
    font-weight: 900;
    margin-bottom: 15px;
  }
  .nav-container {
    display: flex;
    align-items: center;
  }
  nav {
    white-space: nowrap;
    overflow: scroll;
  }
  ul {
    display: flex;
  }
  li {
    margin-right: 15px;
  }
  .left {
    transform: rotate(180deg);
    margin-right: 10px;
  }
  .right {
    margin-left: 10px;
  }
`;

export default LoungesStyled;