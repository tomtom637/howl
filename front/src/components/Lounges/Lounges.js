import LoungesStyled from './Lounges-styles';

export default function Lounges() {
  return (
    <LoungesStyled className="container">
      <h2>LOUNGES</h2>
      <div className="nav-container">
        <i
          className="icon-arrow-right left"></i>
        <nav>
          <ul>
            <li>General</li>
            <li>Weekends are great</li>
            <li>Guessing games</li>
            <li>Sport/eSport</li>
            <li>Work stories</li>
          </ul>
        </nav>
        <i
          className="icon-arrow-right right"></i>
      </div>
    </LoungesStyled>
  );
}