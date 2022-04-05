import styled from 'styled-components';
import topArrow from '../../images/top-arrow.svg';

const ScrollButtonStyled = styled.button`
  position: fixed;
  right: 1.67rem;
  bottom: 50px;
  height: 40px;
  z-index: 20;
  cursor: pointer;
  color: #666;
  background: none;
  border: none;
  outline: none;

  &:focus {
  outline: none;
  }
  & span {
  background: url(${topArrow});
  background-size: contain;
  background-repeat: no-repeat;
  height: 40px;
  width: 40px;
  }
   /* svg {
     fill: #555;
     width: 30px;
     height: 30px;
   } */
`;

export default ScrollButtonStyled;