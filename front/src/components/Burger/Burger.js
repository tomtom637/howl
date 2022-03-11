import { device } from '../../device';
import BurgerStyled from './Burger-styles';

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