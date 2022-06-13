import { useState } from 'react';
import FormInput from '../form-input/from-input.component.jsx';
import './sign-up-form.styles.scss';
import {
  creatAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
} from '../../utils/firebase/firebase.utils.js';
import Button from '../button/button.component.jsx';
const defaultFormField = {
  displayName: '',
  email: '',
  password: '',
  confirmPassword: '',
};
const SignUpForm = () => {
  const [formFields, setFormField] = useState(defaultFormField);
  const { displayName, email, password, confirmPassword } = formFields;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormField({ ...formFields, [name]: value });
  };

  const resetFormField = () => {
    setFormField(defaultFormField);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      console.log('both password are not same');
      return;
    }
    try {
      const response = await creatAuthUserWithEmailAndPassword(email, password);
      console.log(response);
      const { user } = response;
      await createUserDocumentFromAuth(user, { displayName });
      resetFormField();
      console.log(' User created');
    } catch (e) {
      if (e.code === 'auth/email-already-in-use') {
        console.warn('user id already in use');
      }

      console.warn('error in sinup method', e.message);
    }
  };
  return (
    <div className='sign-up-container'>
      <h2> Don`t have an account</h2>
      <span> Sign up with email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label='Display Name'
          type='text'
          required
          onChange={handleChange}
          name='displayName'
          value={displayName}
        ></FormInput>

        <FormInput
          label='Email'
          type='email'
          required
          onChange={handleChange}
          name='email'
          value={email}
        ></FormInput>

        <FormInput
          label='Password'
          type='password'
          required
          onChange={handleChange}
          name='password'
          value={password}
        ></FormInput>

        <FormInput
          label='Confirm Password'
          type='password'
          required
          onChange={handleChange}
          name='confirmPassword'
          value={confirmPassword}
        ></FormInput>

        <Button buttonType='' type='submit'>
          Sign Up
        </Button>
      </form>
    </div>
  );
};
export default SignUpForm;
