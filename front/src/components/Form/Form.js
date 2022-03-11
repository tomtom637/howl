import FormStyled from './Form-styles';

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