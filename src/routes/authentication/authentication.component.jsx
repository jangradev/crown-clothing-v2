import { getRedirectResult } from 'firebase/auth';
import { useEffect } from 'react';
import SignUpForm from '../../components/sign-up-form/sign-up-form.component.jsx';
import SignInForm from '../../components/sign-in-form/sign-in-form.component.jsx';
import './authentication.styles.scss';

import {
  auth,
  createUserDocumentFromAuth,
  signInWithGoogleRdirect,
  signInWithFacebook,
} from '../../utils/firebase/firebase.utils.js';

const Authentication = () => {
  const logFacebookUser = async () => {
    const { user } = await signInWithFacebook();
    console.log(user);
    createUserDocumentFromAuth(user);
  };

  useEffect(
    () => async () => {
      const response = await getRedirectResult(auth);
      //console.log(response); // if this user data available in response
      if (response) {
        await createUserDocumentFromAuth(response.user);
      }
    },
    []
  );

  return (
    <div className='authentication-container'>
      {/*
      <button onClick={signInWithGoogleRdirect}>Sign With GoogleRedirect</button>
      <button onClick={logFacebookUser}>Sign With FaceBook</button>   
    */}
      <SignInForm />
      <SignUpForm />
    </div>
  );
};
export default Authentication;
