// FirebaseContext.tsx
import React, { createContext, useContext, useState } from 'react';
import { app } from '../../firebase';
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from 'firebase/auth';
import useLocalStorage from '@/hooks/useLocalStorage';
// import { addDoc, collection, getDocs, getFirestore, query, serverTimestamp, where } from 'firebase/firestore';

type FirebaseContextType = {
  signInEmailPassword: (email: string, password: string) => Promise<any>;
  createUserEmailPassword: (email: string, password: string) => Promise<any>;
  user: any;
  signOut: () => void;
};

const FirebaseContext = createContext<FirebaseContextType | null>(null);

export const useFirebase = () => {
  const firebaseContext = useContext(FirebaseContext);
  if (!firebaseContext) {
    throw new Error('useFirebase must be used within a FirebaseProvider');
  }
  return firebaseContext;
};

type FirebaseProviderProps = {
  children: React.ReactNode;
};

export const FirebaseProvider: React.FC<FirebaseProviderProps> = ({
  children,
}) => {
  const [state, setValue] = useLocalStorage('auth');

  // const getUserStars = async (user: any) => {
  //   const db = getFirestore(app);

  //   try {
  //     console.log('trying to add document');
  //     const docRef = await addDoc(collection(db, 'users'), {
  //       starsList: ['istanbul', 'izmir', 'antalya'],
  //     });
  //     console.log('Document written with ID: ', docRef.id);
  //   } catch (e) {
  //     console.error('Error adding document: ', e);
  //   }
  //   // const querySnapshot = await getDocs(query(collection(db, 'users'), where('uid', '==', user.uid)));

  //   // console.log('querySnapshot', querySnapshot);
  //   // querySnapshot.forEach((doc) => {
  //   //   console.log(`${doc.id} => ${doc.data()}`);
  //   // });
  // };
  // getUserStars(state);

  const auth = getAuth(app);

  const handleUser = (user: any) => {
    if (user) {
      setValue(user);
    }
  };

  const signOut = () => {
    setValue(null);
  };

  const signInEmailPassword = (email: string, password: string) => {
    signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
      handleUser(userCredential.user);
    });
    return state;
  };

  const createUserEmailPassword = (email: string, password: string) => {
    console.log(auth, email, password);
    createUserWithEmailAndPassword(auth, email, password).then(
      (userCredential) => {
        handleUser(userCredential.user);
      }
    );
    return state;
  };

  const value: FirebaseContextType = {
    signInEmailPassword,
    createUserEmailPassword,
    user: state,
    signOut,
  };

  return (
    <FirebaseContext.Provider value={value}>
      {children}
    </FirebaseContext.Provider>
  );
};
