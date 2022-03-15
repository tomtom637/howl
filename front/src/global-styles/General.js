const General = /*css*/`
  * { margin: 0; padding: 0; }
  *, *:before, *:after { box-sizing: inherit; }
  html { box-sizing: border-box; }
  html, body { margin: 0; padding: 0; font-family: 'Roboto', sans-serif; min-height: 100vh; background: var(--dark-grey); }
  ul { list-style: none; }
  li { text-decoration: none; }
  p, span, li, a { line-height: 1.6; }
  img { display: block; width: 100%; height: auto; }

  .site-wrapper {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
`;
 
export default General;