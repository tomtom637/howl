import styled from 'styled-components';

const ScrollButtonStyled = styled.button`
  position: fixed;
   right: 1.67rem;
   bottom: 75px;
   height: 20px;
   font-size: 3rem;
   z-index: 1;
   cursor: pointer;
   color: #666;
   background: none;
   border: none;
   outline: none;

   &:focus {
      outline: none;
   }
   svg {
     fill: #555;
     width: 30px;
   }
`;

export default ScrollButtonStyled;