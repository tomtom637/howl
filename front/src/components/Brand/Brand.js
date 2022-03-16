import '../../icons.css';
import BrandStyled from './Brand-styles';
import { device } from '../../device';
import { Link } from 'react-router-dom';

export default function Brand({ toggledMenu }) {
  return (
    <BrandStyled toggledMenu={toggledMenu} className="brand-container">
      <Link className="brand-container" to="/">
        <i className="icon-logo"></i>
        <i className="icon-brand"></i>
      </Link>
    </BrandStyled>
  );
}