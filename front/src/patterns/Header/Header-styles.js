import styled from 'styled-components';
import { device, size } from '../../device';

const HeaderStyled = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1;
  background: var(--dark-grey);
  padding-top: 5px;
  padding-bottom: 5px;
  .header-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  @media ${device.tablet} {
    padding-top: 12px;
    padding-bottom: 12px;
  }
`;

export default HeaderStyled;