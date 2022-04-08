import '../../icons.css';
import { device } from '../../device';
import { Link } from 'react-router-dom';
import AboutStyled from './About-styles';

export default function About({ toggledMenu }) {
  return (
    <AboutStyled>
      <div className="about__wrapper">
        <div className="about__title-container">
          <h1 className='about__title'>Welcome to Howl!</h1>
          <Link className='about__link' to="/">Back to Home</Link>
        </div>
        <section className="about__main">
          <p className="about__paragraph">Here you can loosen up and tell us about your work, your weekend plans or your favourite TV shows.<br />Let your imagination run wild, not forgetting to remain civil and courteous.<br />At your disposal, an endless collection of animated Gifs.<br /></p>
          <div className="about__gif-conainer">
            <img src="https://c.tenor.com/8JYaVNXUGiAAAAAC/the-office-finger-guns.gif" alt="gif" />
          </div>
        </section>
      </div>
    </AboutStyled >
  );
}