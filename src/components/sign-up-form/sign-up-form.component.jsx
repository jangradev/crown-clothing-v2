import { useState } from 'react';
const defaultFormField = {
  displayName: '',
  email: '',
  password: '',
  confirmPassword: '',
};
const SignUpForm = () => {
  const [formField, setFormField] = useState(defaultFormField);
  const { displayName, email, password, confirmPassword } = formField;
  console.log(formField);

  const handleChange = (event) => {
    console.log(event.target);
    const { name, value } = event.target;
    setFormField({ ...formField, [name]: value });
  };
  return (
    <div>
      <h1> Sign up with email and password</h1>
      <form onClick={() => {}}>
        <label>Display Name</label>
        <input
          type='text'
          required
          onChange={handleChange}
          name='displayName'
          value={displayName}
        ></input>

        <label>Email</label>
        <input
          type='email'
          required
          onChange={handleChange}
          name='email'
          value={email}
        ></input>

        <label>Password</label>
        <input
          type='password'
          required
          onChange={handleChange}
          name='password'
          value={password}
        ></input>

        <label>Confirm Password</label>
        <input
          type='password'
          required
          onChange={handleChange}
          name='confirmPassword'
          value={confirmPassword}
        ></input>
        <button type='submit'>Sign Up</button>
      </form>
    </div>
  );
};
export default SignUpForm;
