import styled from 'styled-components';
import { device } from "../device";

const HeroStyled = styled.section`
  background: var(--primary);
  position: relative;
  padding: 55px;
  overflow: hidden;
  margin-top: 35px;
  &::after {
    display: block;
    content: '';
    width: 100%;
    height: auto;
  }
  h1 {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    text-align: center;
    font-family: 'Poller One', cursive;
    color: #fff;
    font-size: 36px;
    font-weight: normal;
    padding: 30px;
  }
  svg {
    position: absolute;
    right: calc(50% + 65px);
    top: 15px;
    transform: translateX(50%);
  }
  i {
    position: absolute;
    top: 15px;
    right: calc(50% - 130px);
    transform: translateX(50%);
    color: var(--primary-light);
    font-size: 400px;
  }
  @media ${device.tablet} {
      padding: 80px;
      margin-top: 48px;
      h1 {
        font-size: 55px;
        padding: 50px;
      }
      svg {
        transform: scale(1.3);
        top: 45px;
      }
      i {
        font-size: 650px;
        right: calc(50% - 280px);
      }
    }
`;

export default function Hero() {
  return (
    <>
      <HeroStyled>
        <svg width="85" height="94" viewBox="0 0 85 94" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M6.10938 0C5.39758 0.0113 4.53744 1.05758 4.08594 2.5C3.76964 3.51077 3.54679 3.85492 3.27539 3.75C2.10029 3.296 1.51859 4.39781 2.05469 6.0625C2.63239 7.85619 2.68558 9.21434 2.33398 13.3398C2.14878 15.5159 2.05831 17.6964 2.13281 18.1836L2.26562 19.0684L1.13281 18.8867L0 18.7031L0.861328 19.5977L1.72266 20.4941L1.11719 20.9277C0.563488 21.3255 0.552872 21.3889 0.951172 21.6895C1.35067 21.9911 1.35458 22.2244 1.01318 24.6074C0.590684 27.5806 0.52123 34.0458 0.88623 36.252C1.33373 38.9546 2.22675 41.7464 3.49365 44.3945C4.46795 46.4309 4.77792 47.3983 4.91162 48.8262C5.00562 49.831 5.17397 51.0626 5.28467 51.5625L5.48584 52.4707L5.81006 51.2422C6.11166 50.0998 6.70259 49.2382 6.98779 49.5254C7.05479 49.5932 7.18861 50.3906 7.28271 51.2988L7.45459 52.9492L8.02686 52.2266C8.45346 51.6879 8.73744 51.5471 9.14014 51.6758C9.61474 51.8273 9.67838 52.048 9.66748 53.4824C9.65248 55.6472 10.201 56.9077 11.7847 58.334L13.0874 59.5059L13.3726 61.8516C13.5937 63.6708 13.5757 65.1013 13.2966 68.2344C13.0626 70.8548 13.0673 71.8459 12.5583 72.1172L12.738 72.1797C9.17374 76.8567 14.2583 79.3762 16.3611 73.9395C16.604 73.367 16.6605 72.6848 17.3748 72.3906C17.1476 69.8311 17.4798 61.5502 17.8318 60.9766C17.9694 60.7522 18.1277 60.7345 18.3494 60.92C18.5954 61.1258 18.6648 60.8871 18.6501 59.8711C18.6311 58.623 19.0906 57.8461 19.8123 57.8496V57.8476C19.8803 57.8479 19.949 57.8566 20.0212 57.871C21.476 58.1601 21.9562 61.4546 21.822 70.2636C21.763 74.1314 21.7709 74.1237 21.5583 74.5644C19.1679 77.9253 22.2196 80.7224 24.7634 77.2871C24.8144 77.1683 25.0235 76.4444 25.1404 76.1855C25.4504 74.7555 25.6552 73.7138 26.4626 73.3964C27.0795 73.154 27.1275 73.2916 27.0173 71.4921C26.9563 70.489 26.908 67.6744 26.908 65.2382C26.908 61.5675 26.99 60.5978 27.3826 59.5722C27.6434 58.8915 27.9065 58.3339 27.9705 58.3339C28.0345 58.3339 28.5065 58.5096 29.0173 58.7246C30.2669 59.2502 30.2674 59.2506 29.5994 58.1621L29.0154 57.2089L29.949 57.3613C30.728 57.4886 30.8611 57.4458 30.7322 57.1074C30.6482 56.8875 30.6911 56.793 31.0544 56.791C31.2736 56.7901 31.6078 56.8224 32.1033 56.8808C34.7922 57.1989 35.5129 58.1706 36.8572 63.2851C37.994 67.6102 39.5784 70.6642 41.7517 72.7245C42.6998 73.6233 44.185 74.7385 45.0544 75.203C46.3543 75.8976 46.6653 76.1916 46.7986 76.8632C47.0503 78.1295 46.9905 82.1942 46.7085 82.9394C46.6395 83.121 46.5656 83.2398 46.48 83.3358C46.48 83.3388 46.47 83.3418 46.47 83.3458C44.2547 85.5726 43.2774 87.7402 44.0969 88.3478C44.3412 88.402 44.583 88.458 44.8274 88.5119C45.8496 88.4529 47.677 87.6061 50.4622 85.5626L50.3882 83.4767C50.3312 81.8606 50.4832 80.7198 51.064 78.3966L51.812 75.4005L50.9722 74.3576C48.4251 71.1977 48.3605 69.1906 50.7983 69.1583C50.8173 69.1582 50.8394 69.1583 50.8594 69.1583C52.5514 69.1583 56.2677 72.0393 58.1211 74.7872C60.0654 77.6698 61.8001 82.3768 63.123 88.3634C63.175 88.6006 63.084 88.7485 62.8574 88.8087C62.4629 90.1314 60.7046 92.6846 61.9514 92.9873C62.8699 93.127 64.4252 93.5522 67.5586 90.7013C67.5006 90.637 67.436 90.5711 67.4138 90.5119C67.3065 90.2253 67.1325 88.8441 67.0293 87.4415C66.8754 85.3503 66.7367 84.7632 66.2578 84.1837C64.6713 82.2624 64.3104 80.5838 64.3066 75.1037V70.6369L63.0427 69.6662C59.8962 67.2503 58.0133 62.9786 59.5349 61.7072C60.0462 61.2799 60.3604 61.5802 62.0254 64.0939C62.8306 65.3097 63.4356 66.0064 63.4844 65.7716C63.5847 65.2895 63.8356 65.2607 64.2556 65.6837C64.4268 65.8562 65.0617 66.1399 65.666 66.3146C66.2703 66.4893 67.5771 66.8762 68.5703 67.174C71.8962 68.1709 75.8098 67.8286 78.9863 66.2638C80.4452 65.5452 84.482 61.8845 84.166 61.5665C84.07 61.4697 83.0057 61.5994 81.8027 61.8537C80.2165 62.1884 78.9379 62.2796 77.1543 62.1857C75.0282 62.0737 74.4346 61.9324 72.7988 61.1466C70.3134 59.9526 68.7935 58.5285 64.9492 53.7912C63.1975 51.6326 60.9097 49.0244 59.8652 47.9943C57.6869 45.846 54.2636 43.5912 51.8574 42.7208C49.8895 42.009 49.7552 41.9006 49.6716 40.9552C49.6376 40.5542 49.5958 40.1452 49.5818 40.047C49.5668 39.9488 48.5362 39.9354 47.2908 40.0158C44.5262 40.1946 42.7623 39.7869 39.0818 38.1232C29.5198 33.8009 20.5941 26.7746 17.9822 21.5119C17.1605 19.8563 17.1731 19.5142 18.062 19.508C18.3738 19.506 18.8033 19.3925 19.0151 19.258C19.3345 19.0547 19.2462 18.8523 18.4976 18.0685C18.0011 17.5484 17.2882 16.9614 16.9136 16.7639C16.3961 16.4906 16.1925 16.1357 16.0659 15.2853C15.7526 13.1815 14.7711 11.5768 12.2241 9.00409C10.2532 7.01329 9.61664 6.16477 8.83374 4.49823C6.96944 0.52908 6.72131 0.100872 6.24951 0.0119019C6.20351 0.00390186 6.15698 0 6.10938 0Z" fill="#2A4758"/>
          <circle cx="11" cy="12" r="1" fill="#EA5A47"/>
        </svg>
        <i className="icon-logo"></i>
        <h1>Howl</h1>
      </HeroStyled>
    </>
  );
}