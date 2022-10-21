import { initializeApp } from 'firebase/app';
import {
    getAuth,
    signInWithRedirect,
    signInWithPopup,
    GoogleAuthProvider
} from 'firebase/auth';

import {
    getFirestore,
    doc,
    getDoc,
    setDoc
} from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyBTRjZqtESaTlbLkB-2xRjmnx7DJE75Qeo",
    authDomain: "crown-clothing-db-edfaf.firebaseapp.com",
    projectId: "crown-clothing-db-edfaf",
    storageBucket: "crown-clothing-db-edfaf.appspot.com",
    messagingSenderId: "536120961604",
    appId: "1:536120961604:web:336d89c430dc62193baa11"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
    prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore()

export const createUserDocumentFromAuth = async (userAuth) => {
    const userDocRef = doc(db, 'users', userAuth.uid);

    console.log(userDocRef);

    const userSnapshot = await getDoc(userDocRef);
    console.log(userSnapshot);
    console.log(userSnapshot.exists());

    // if user data does not exist
    if (!userSnapshot.exists()) {
        // create / set the document with the data from userAut in my collection
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt
            });
        }
        catch (error) {
            console.log('error createing the user', error.message);
        }
    }
    // if user data exists, return userDocRef
    return userDocRef;
}