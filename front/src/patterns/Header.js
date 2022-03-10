import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { device, size } from '../device';
import Brand from '../components/Brand';
import Menu from './Menu';

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