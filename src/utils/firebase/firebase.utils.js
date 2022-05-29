import { initializeApp } from 'firebase/app';

import {
  getAuth,
  signInWithRedirect,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyC9vQHZcOQqJ8-79F0_k2Tp5-PRTcA01nQ',
  authDomain: 'crown-clothing-v2-1d2a1.firebaseapp.com',
  projectId: 'crown-clothing-v2-1d2a1',
  storageBucket: 'crown-clothing-v2-1d2a1.appspot.com',
  messagingSenderId: '65614627435',
  appId: '1:65614627435:web:571ce083271815b3b4a72e',
};

const firebaseApp = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();

provider.setCustomParameters({ prompt: 'select_account' });

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore(); //generate database

export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, 'user', userAuth.uid);

  const userSnapshot = await getDoc(userDocRef);
  console.log(userSnapshot.exists());

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await setDoc(userDocRef, { displayName, email, createdAt });
    } catch (e) {
      console.log('error from creating user', e.message);
    }
    return userDocRef;
  }
};
