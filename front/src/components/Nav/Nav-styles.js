import styled from 'styled-components';
import { device } from '../../device';

const NavStyled = styled.nav`
  display: flex;
  background: var(--dark-grey);
  color: #fff;
  position: fixed;
  top: 35px;
  bottom: 0;
  width: 80%;
  right: 0%;
  overflow-y: auto;
  z-index: 1000;

  ul {
    display: flex;
    flex-direction: column;
    width: 85%;
    margin: 50px 30px;
  }
  .nav-item {
    position: relative;
    border-bottom: 1px solid rgba(255, 255, 255, 0.23);
    padding-bottom: 20px;
    margin-bottom: 20px;
    cursor: pointer;
  }
  .nav-item:last-child {
    border-bottom: none;
  }
  .nav-title {
    display: flex;
    align-items: center;
  }
  i {
    margin-right: 25px;
  }
  .icon-logout {
    color: var(--secondary);
  }
  @media ${device.tablet} {
    position: static;
    width: auto;
    overflow-y: visible;
    ul {      
      flex-direction: row;
      align-items: top;
      width: auto;
      margin: 0;
    }
    .nav-item {
      border: none;
      padding: 0;
      margin: 0 35px 0 0;
    }
    li:last-child {
      margin: 0
    }
    i {
      margin-right: 10px;
    }
  }
`;

export default NavStyled;