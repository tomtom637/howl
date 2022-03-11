import '../../icons.css';
import BrandStyled from './Brand-styles';
import { device } from '../../device';

export default function Brand({ toggledMenu }) {
  return (
    <BrandStyled toggledMenu={toggledMenu} className="brand-container">
      <i className="icon-logo"></i>
      <i className="icon-brand"></i>
    </BrandStyled>
  );
}