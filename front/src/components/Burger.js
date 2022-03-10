import styled from 'styled-components';
import { device } from '../device';

const BurgerStyled = styled.div`
  margin: 5px 0 5px 5px;
  height: 15px;
  width: 22px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  cursor: pointer;
  .line {
    height: 3px;
    background: ${props => props.toggledMenu ? 'var(--primary-light)' : '#fff'};
    transition: all 0.2s ease-in-out;
  }
  .line-top {
    width: 19px;
    margin-left: ${props => props.toggledMenu ? '3px' : 0};
  }
  .line-center {
    width: 22px;
  }
  .line-bottom {
    width: 15px;
    margin-left: ${props => props.toggledMenu ? '7px' : 0};
  }
  @media ${device.tablet} {
    display: none;
  }
`;

export default function Burger({ toggledMenu, setToggledMenu }) {

  return (
    <BurgerStyled
      toggledMenu={toggledMenu}
      className="burger"
      onClick={() => setToggledMenu(!toggledMenu)}
    >
      <div className="line line-top" />
      <div className="line line-center" />
      <div className="line line-bottom" />
    </BurgerStyled>
  );
}