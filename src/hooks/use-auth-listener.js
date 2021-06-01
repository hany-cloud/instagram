import { useState, useEffect, useContext } from 'react';
import FirebaseContext from '../context/firebase';
import { getUserByUserId } from '../services/firebase';

export default function useAuthListener() {
  const [authUser, setAuthUser] = useState(JSON.parse(localStorage.getItem('authUser')));
  const [userDoc, setUserDoc] = useState('');
  const { firebase } = useContext(FirebaseContext);

  useEffect(() => {
    const setUserDocInStateByUserId = async (userId) => {
      const [activeUser] = await getUserByUserId(userId); // from firestore
      setUserDoc(activeUser || {});
    }

    const listener = firebase.auth().onAuthStateChanged((authUser) => {
      if (authUser) {
        // we have a user...therefore we can store the user in localstorage
        localStorage.setItem('authUser', JSON.stringify(authUser));
        setAuthUser(authUser);
        setUserDocInStateByUserId(authUser.uid);

      } else {
        // we don't have an authUser, therefore clear the localstorage
        localStorage.removeItem('authUser');
        setAuthUser(null);
        setUserDoc(null);
      }
    });

    // clean-up listener
    return () => listener();
  }, [firebase]);

  // returns 
  // authUser: Firebase Authintication user 
  // userDoc: Firestore users document 
  return { authUser, userDoc };
}
