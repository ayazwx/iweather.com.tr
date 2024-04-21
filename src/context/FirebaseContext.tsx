// FirebaseContext.tsx
import React, { createContext, useContext } from 'react';
import { app, firestore } from '@/../firebase';
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  updateProfile,
  updatePassword,
} from 'firebase/auth';
import useLocalStorage from '@/hooks/useLocalStorage';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { Location } from '@/types/ValueTypes';
import { notifySuccess } from '@/components/Toast';

type UserType = {
  name: string | null;
  email: string | null;
  logOut: () => void;
  deleteAccount: () => Promise<void>;
  updateUserPhoto: (photoURL: string) => Promise<void>;
  changePassword: (newPassword: string) => Promise<void>;
  userPhoto: string | null;
  updateUser: (displayName: string) => Promise<void>;
  stars: Location[];
  addStar: (stars: Location) => void;
  getStars: () => void;
  removeStar: (star: Location) => void;
};

type FirebaseContextType = {
  signInEmailPassword: (email: string, password: string) => Promise<any>;
  createUserEmailPassword: (email: string, password: string, displayName: string) => Promise<any>;
  signInWithGoogle: () => Promise<any>;
  user: UserType | null;
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
  const [localStars, setLocalStars] = useLocalStorage('stars');
  const auth = getAuth(app);
  const handleUser = (user: any) => {
    if (user) {
      setValue(user);
      getStars();
    }
  };

  const logOut = () => {
    setValue(null);
    setLocalStars([]);
    notifySuccess('Logged out successfully!');
  };

 
  const updateUser = async (displayName: string) => {
    try {
      const user = auth.currentUser;
      if (user) {
        await updateProfile(user, { displayName });
        handleUser(user);
        return state;
      } else {
        throw new Error('No user is currently signed in.');
      }
    } catch (error) {
      console.error('Error updating user profile:', error);
      throw error;
    }
  };
  const signInEmailPassword = async (email: string, password: string) => {
    signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
      handleUser(userCredential.user);
    });
    return state;
  };

  const createUserEmailPassword = async (email: string, password: string, displayName: string) => {
    return createUserWithEmailAndPassword(auth, email, password).then(
      (userCredential) => {
        updateUser(displayName)
        handleUser(userCredential.user);
        return updateProfile(userCredential.user, { displayName });
      }
    ).then(() => {
      return state;
    });
  };

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider).then((userCredential) => {
      handleUser(userCredential.user);
      return state;
    });
  };

  const changePassword = (newPassword: string) => {
    const user = auth.currentUser;
    if (user) {
      return updatePassword(user, newPassword);
    } else {
      return Promise.reject(new Error('No user is currently signed in.'));
    }
  };

  const updateUserPhoto = async (photoURL: string) => {
    try {
      const user = auth.currentUser;
      if (user) {
        await updateProfile(user, { photoURL });
        handleUser(user);
        return state;
      } else {
        throw new Error('No user is currently signed in.');
      }
    } catch (error) {
      console.error('Error updating user photo URL:', error);
      throw error;
    }
  };

  const stars = localStars || [];

  const addStar = async (newStar : Location) => {
    try {
      const user = auth.currentUser;
      if (user) {
        const docRef = doc(firestore, 'users', user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap) {
          const userData = docSnap.data();
            const currentStarsList: Location[] = userData?.starsList ?? [];
            const updatedStarsList = [...currentStarsList, newStar];
            await setDoc(docRef, { starsList: updatedStarsList }, { merge: true });
            setLocalStars(updatedStarsList);
        }
      } else {
        throw new Error('No user is currently signed in.');
      }
    } catch (error) {
      console.error('Error adding new star:', error);
      throw error;
    }
  }
  const getStars = async () => {
    try {
      const user = auth.currentUser;
      if (user) {
        const docRef = doc(firestore, 'users', user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap) {
          const userData = docSnap.data();
          if (userData) {
            setLocalStars(userData.starsList);
          }
        }
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };
  const removeStar = async (starToRemove: Location) => {
    try {
      const user = auth.currentUser;
      if (user) {
        const docRef = doc(firestore, 'users', user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const userData = docSnap.data();
          if (userData) {
            const currentStarsList: Location[] = userData.starsList ?? [];
            const updatedStarsList = currentStarsList.filter(star => star.name !== starToRemove.name);
            await setDoc(docRef, { starsList: updatedStarsList }, { merge: true });
            setLocalStars(updatedStarsList);
          }
        }
      } else {
        throw new Error('No user is currently signed in.');
      }
    } catch (error) {
      console.error('Error removing star:', error);
      throw error;
    }
  };

  const deleteAccount = async () => {
    const user = auth.currentUser;
    if (user) {
      return user.delete().then(() => {
        logOut();
      });
    } else {
      return Promise.reject(new Error('No user is currently signed in.'));
    }
  }



  const authUser: UserType | null = state ? {
    name: state.displayName,
    email: state.email,
    updateUserPhoto,
    logOut,
    userPhoto: state.photoURL,
    updateUser,
    changePassword,
    stars,
    addStar,
    getStars,
    removeStar,
    deleteAccount,
  } : null;

  const value: FirebaseContextType = {
    signInEmailPassword,
    createUserEmailPassword,
    signInWithGoogle,
    user: authUser,
  };

  return (
    <FirebaseContext.Provider value={value}>
      {children}
    </FirebaseContext.Provider>
  );
};
