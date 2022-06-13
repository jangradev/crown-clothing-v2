import { useState } from 'react';
import FormInput from '../form-input/from-input.component.jsx';
import './sign-in-form.styles.scss';

import Button from '../button/button.component.jsx';

import {
  signInWithGooglePopup,
  createUserDocumentFromAuth,
  sigInAuthUserWithEmailAndPassword,
} from '../../utils/firebase/firebase.utils.js';

const defaultFormField = {
  email: '',
  password: '',
};
const SignInForm = () => {
  const [formFields, setFormField] = useState(defaultFormField);
  const { email, password } = formFields;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormField({ ...formFields, [name]: value });
  };

  const resetFormField = () => {
    setFormField(defaultFormField);
  };

  const signInWithGoogle = async () => {
    try {
      const { user } = await signInWithGooglePopup();
      //console.log(user);
      createUserDocumentFromAuth(user);
    } catch (e) {
      if (e.code === 'auth/popup-closed-by-user') {
        console.log('sin in process intruptted');
      }
    }
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await sigInAuthUserWithEmailAndPassword(email, password);
      console.log(response);
      resetFormField();
      console.log('Sign in sucessfully');
    } catch (e) {
      switch (e.code) {
        case 'auth/worng-password':
          console.warn('incorrect password you entered');
          break;
        case 'auth/usser-not-found':
          console.warn('You are not registered user');
          break;
        default:
          console.warn(' Error durring Signin', e.message);
      }
    }
  };
  return (
    <div className='sign-up-container'>
      <h2> Already have an account</h2>
      <span> Sign in with email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput label='Email' type='email' required onChange={handleChange} name='email' value={email}></FormInput>
        <FormInput
          label='Password'
          type='password'
          required
          onChange={handleChange}
          name='password'
          value={password}
        ></FormInput>
        <div className='buttons-container'>
          <Button buttonType='' type='submit'>
            Sign In
          </Button>
          <Button type='button' buttonType='google' onClick={signInWithGoogle}>
            Google Sign In
          </Button>
        </div>
      </form>
    </div>
  );
};
export default SignInForm;
