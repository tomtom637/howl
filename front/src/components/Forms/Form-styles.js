import styled from 'styled-components';

const FormStyled = styled.div`
  margin: 40px auto;
  padding: 15px;
  max-width: 350px;
  background: var(--grey);
  border-radius:var(--border-radius);
  box-shadow: var(--box-shadow);

  h3 {
    text-align: center;
    margin-bottom: 20px;
    font-weight: 400;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    color: #bbb;
    padding-bottom: 10px;
    border-bottom: 1px solid #bbb;
    cursor: pointer;
  }
  .active {
    color: var(--dark-grey);
  }
  form {
    display: flex;
    flex-direction: column;
  }
  .form-group {
    display: flex;
    flex-direction: column;
    margin-bottom: 15px;
    position: relative;
  }
  label {
    margin-bottom: 5px;
    color: var(--dark-grey);
  }
  input {
    padding: 10px 15px;
    border-radius:var(--border-radius);
    border: 1px solid #bbb;
    font-size: 1.1rem;
  }
  button {
    margin-top: 15px;
    padding: 10px 15px;
    border-radius:var(--border-radius);
    border: 1px solid var(--primary-light);
    letter-spacing: 1.5px;
    text-transform: uppercase;
    background: var(--primary);
    color: var(--primary-brightest);
  }
  .error {
    color: var(--red);
    font-size: 0.85rem;
    position: absolute;
    bottom: -1.3rem;
    right: 0;
  }
`;

export default FormStyled;