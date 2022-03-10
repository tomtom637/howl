import '../icons.css';
import styled from 'styled-components';
import { device } from '../device';

const BrandStyled = styled.div`
  font-size: 25px;
  display: flex;
  align-items: center;
  .icon-logo {
    color: var(--secondary);
    margin-right: 5px;
  }
  .icon-brand {
    color: ${props => props.toggledMenu ? 'var(--primary-light)' : '#fff'};
    font-size: 13.5px;
    margin-top: 2px;
    transition: all 0.2s ease-in-out;
  }
  @media ${device.tablet} {
    .icon-brand {
      color: #fff;
    }
  }
`;

export default function Brand({ toggledMenu }) {
  return (
    <BrandStyled toggledMenu={toggledMenu} className="brand-container">
      <i className="icon-logo"></i>
      <i className="icon-brand"></i>
    </BrandStyled>
  );
}