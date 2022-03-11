import { useState, useEffect } from 'react';
import Brand from '../../components/Brand/Brand';
import Menu from '../Menu/Menu';
import HeaderStyled from './Header-styles';
import { device, size } from '../../device';

export default function Header() {
  const [toggledMenu, setToggledMenu] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    
    function handleResize() {
      setWindowWidth(window.innerWidth);
    }

    window.addEventListener('resize', handleResize);
    return (() => {
      window.removeEventListener('resize', handleResize);
    });
  }, []);

  return (
    <HeaderStyled>
      <div className="container header-container">
        <Brand toggledMenu={toggledMenu} />
        {windowWidth < size.tablet
          ?
          <Menu toggledMenu={toggledMenu} setToggledMenu={setToggledMenu}/>
          :
          <Menu toggledMenu={true} setToggledMenu={setToggledMenu}/>
        }
      </div>
    </HeaderStyled>
  );
}