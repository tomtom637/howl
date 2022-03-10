import styled from "styled-components";
import { device } from "../device";

const FormStyled = styled.form`
  display: flex;
  flex-direction: column;
  margin: 10px 0;
  .form-control {
    font-size: 0.8rem;
    margin: 2px 0;
  }
  label {
    text-transform: uppercase;
  }
  input {
    display: flex;
    padding: 3px;
    margin: 2px 0;
  }
  @media ${device.tablet} {
    position: absolute;
    top: 27px;
    right: -25px;
    padding: 0 30px;
    background: var(--primary-dark);
  }
`;

export default function Form() {
  return (
    <FormStyled>
      <div className="form-control">
        <label htmlFor="username">username</label>
        <input id="username" name="username" type="text" />
      </div>
      <div className="form-control">
        <label htmlFor="email">email</label>
        <input id="email" name="email" type="text" />
      </div>
      <div className="form-control">
        <label htmlFor="password">password</label>
        <input id="password" name="password" type="text" />
      </div>
    </FormStyled>
  );
}