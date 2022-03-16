import { device } from "../device";

const Container = /*css*/`
  .container {
    padding-left: 10px;
    padding-right: 10px;
    max-width: 1200px;
    margin: 0 auto;
  }
  @media ${device.tablet} {
    .container {
      padding-left: 25px;
      padding-right: 25px;
    }
  }

  .site-wrapper {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .main-content-wrapper {
    margin-top: 35px;
  }
  @media ${device.tablet} {
    .main-content-wrapper {
      margin-top: 49.594px;
    }
  }

`;

export default Container;