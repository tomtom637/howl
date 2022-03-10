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
`;

export default Container;