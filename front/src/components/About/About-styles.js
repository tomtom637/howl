import styled from 'styled-components';

const AboutStyled = styled.div`
  .about__wrapper {
    width: min(calc(100% - 2rem), 900px);
    margin: 1rem auto 0;
  }
  .about__title-container {
    display: flex;
    justify-content: space-between;
    /* align-items: baseline; */
  }
  .about__title {
    font-size: clamp(2rem, 2.5vw, 3rem); 
    font-family: 'Poller one', cursive;
    margin-bottom: 1rem;
    margin-top: 4rem;
  }
  .about__link{
    color: var(--secondary);
    font-size: 1rem;
    min-width: 7rem;
  }
  .about__main {
  }
  .about__paragraph {
    font-size: 1.1rem;
    margin: 1rem;
    line-height: 2;
  }
  .about__gif-conainer {
    margin: 4rem auto 1.5rem;
    max-width: 550px;
  }
`;

export default AboutStyled;