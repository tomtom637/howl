import styled from 'styled-components';
import { device } from "../../device";

const HeroStyled = styled.section`
  background: var(--primary);
  position: relative;
  padding: 55px;
  &::after {
    display: block;
    content: '';
    width: 100%;
    height: auto;
  }
  h1 {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    text-align: center;
    font-family: 'Poller One', cursive;
    color: #fff;
    font-size: 36px;
    font-weight: normal;
    padding: 30px;
  }
  svg {
    position: absolute;
    right: calc(50% + 65px);
    top: 55%;
    left: 25%;
    transform: scale(2.1);
  }
  i {
    position: absolute;
    top: 15px;
    right: calc(50% - 130px);
    transform: translateX(50%);
    color: var(--primary-light);
    font-size: 400px;
    display: none;
  }
  @media ${device.tablet} {
      padding: 80px;
      h1 {
        font-size: 55px;
        padding: 50px;
      }
      svg {
        transform: scale(1.3);
        top: 45px;
      }
      i {
        font-size: 650px;
        right: calc(50% - 280px);
      }
    }
`;

export default HeroStyled;