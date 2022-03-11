import Burger from '../../components/Burger/Burger';
import Nav from '../../components/Nav/Nav';

export default function Menu({toggledMenu, setToggledMenu}) {

  return (
    <>
      <Burger toggledMenu={toggledMenu} setToggledMenu={setToggledMenu} />
      <Nav toggledMenu={toggledMenu} setToggledMenu={setToggledMenu} />
    </>
  );
}