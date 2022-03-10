import Burger from '../components/Burger';
import Nav from '../components/Nav';
import styled from 'styled-components';

export default function Menu({toggledMenu, setToggledMenu}) {

  return (
    <>
      <Burger toggledMenu={toggledMenu} setToggledMenu={setToggledMenu} />
      <Nav toggledMenu={toggledMenu} setToggledMenu={setToggledMenu} />
    </>
  );
}