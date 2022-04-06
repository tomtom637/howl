import '../../icons.css';
import { device } from '../../device';
import {Link} from 'react-router-dom';

export default function About({ toggledMenu }) {
  return (
    <div className="container">
      <h1 className='page-title'>About</h1>
      <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. A minima excepturi dolorem nihil natus amet id neque atque. Veritatis libero beatae voluptate nihil eum eius excepturi assumenda ducimus saepe modi!</p>
      <p>
        <Link
          style={{
            color: 'var(--secondary)',
            fontSize: '1.2rem',
          }}
          to="/">Back to the homepage</Link>
      </p>
    </div>
  );
}