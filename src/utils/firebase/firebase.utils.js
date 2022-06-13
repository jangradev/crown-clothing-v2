import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithRedirect,
  GoogleAuthProvider,
  signInWithPopup,
  FacebookAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
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
initializeApp(firebaseConfig);
//console.log(firebaseApp);
const provider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
facebookProvider.setCustomParameters({ prompt: 'select_account' });
export const auth = getAuth();
//console.log(auth);
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
export const signInWithGoogleRdirect = () => signInWithRedirect(auth, provider);
export const signInWithFacebook = () => signInWithPopup(auth, facebookProvider);
export const db = getFirestore(); //generate database

export const createUserDocumentFromAuth = async (userAuth, additional = {}) => {
  if (!userAuth) return;
  const userDocRef = doc(db, 'user', userAuth.uid);
  console.log(userDocRef); // user document reference from fireStore
  //  mainly this is location reference
  const userSnapshot = await getDoc(userDocRef);
  /* A DocumentSnapshot contains data read from a document 
    in your Cloud Firestore database. 
    The data can be extracted with the getData() or get(String) methods*/
  console.log(userSnapshot);
  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await setDoc(userDocRef, { displayName, email, createdAt, ...additional });
    } catch (e) {
      console.log('error from creating user', e.message);
    }
    return userDocRef;
  }
};
export const creatAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  return await createUserWithEmailAndPassword(auth, email, password);
};

export const sigInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  return await signInWithEmailAndPassword(auth, email, password);
};
