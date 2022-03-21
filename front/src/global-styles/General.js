const General = /*css*/`
  * { margin: 0; padding: 0; }
  *, *:before, *:after { box-sizing: inherit; }
  html { box-sizing: border-box; }
  html, body { margin: 0; padding: 0; font-family: 'Roboto', sans-serif; min-height: 100vh;}
  ul { list-style: none; }
  li { text-decoration: none; }
  a { text-decoration: none; color: inherit;}
  p, span, li, a { line-height: 1.6; }
  img { display: block; width: 100%; height: auto; }
  
  .edit-button {
    font-size: 0.6rem;
    font-weight: 700;
    letter-spacing: 0.05rem;
    padding: 0.2rem 0.3rem;
    margin-top: 0.5rem;
    background: var(--primary);
    color: #fff;
    border-radius: var(--border-radius);
  }
  .page-title {
    margin: 1rem 0;
  }
`;
 
export default General;