import { getRedirectResult } from 'firebase/auth';
import { useEffect } from 'react';
import SignUpForm from '../../components/sign-up-form/sign-up-form.component.jsx';

import {
  auth,
  signInWithGooglePopup,
  createUserDocumentFromAuth,
  signInWithGoogleRdirect,
  signInWithFacebook,
} from '../../utils/firebase/firebase.utils.js';

const SignIn = () => {
  const logGoogleUser = async () => {
    const { user } = await signInWithGooglePopup();
    console.log(user);
    createUserDocumentFromAuth(user);
  };

  const logFacebookUser = async () => {
    const { user } = await signInWithFacebook();
    console.log(user);
    createUserDocumentFromAuth(user);
  };

  useEffect(
    () => async () => {
      const response = await getRedirectResult(auth);
      console.log(response); // if this user data available in response
      if (response) {
        await createUserDocumentFromAuth(response.user);
      }
    },
    []
  );
  return (
    <div>
      <h1> sign in Page</h1>
      <button onClick={logGoogleUser}>Sign With Google</button>
      <button onClick={signInWithGoogleRdirect}>Sign With GoogleRedirect</button>
      <button onClick={logFacebookUser}>Sign With FaceBook</button>
      <SignUpForm />
    </div>
  );
};
export default SignIn;
