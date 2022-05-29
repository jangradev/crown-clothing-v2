import {
  signInWithGooglePopup,
  createUserDocumentFromAuth,
} from '../../utils/firebase/firebase.utils.js';

const SignIn = () => {
  const logGoogleUser = async () => {
    const { user } = await signInWithGooglePopup();
    console.log(user);
    createUserDocumentFromAuth(user);
  };

  return (
    <div>
      <h1> sign in Page</h1>
      <button onClick={logGoogleUser}>Sign With Google</button>
    </div>
  );
};
export default SignIn;
