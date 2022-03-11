import styled from 'styled-components';

const LogoStyled = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  overflow-x: hidden;
  z-index: -1000;
  i {
    position: absolute;
    font-size: 400px;
    color: var(--primary-light);
    top: 80px;
    left: 30%;
  }
`;

export default LogoStyled;