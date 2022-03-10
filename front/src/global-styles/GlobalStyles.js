import { createGlobalStyle } from "styled-components";
import General from './General';
import Variables from './Variables';
import Container from './Container';

const GlobalStyles = createGlobalStyle`
  ${General}
  ${Variables}
  ${Container}
`;

export default GlobalStyles;