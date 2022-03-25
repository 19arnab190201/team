import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../firebase";
import { onSnapshot, collection,query, where } from "firebase/firestore";
import {db} from '../firebase';
const userAuthContext = createContext();

export function UserAuthContextProvider({ children }) {
  const [userData, setUserData] = useState({});

  function logIn(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }
  function signUp(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
  }
  function logOut() {
    return signOut(auth);
  }
  function googleSignIn() {
    const googleAuthProvider = new GoogleAuthProvider();
    return signInWithPopup(auth, googleAuthProvider);
  }
  const getProjects = (interests) =>{

    console.log("first",interests)
    const dbref = collection(db, "PROJECTS");
    let projects = [];

    for (let index = 0; index < interests.length; index++) {
      const q = query(dbref,where("category", "==", interests[index]))
      onSnapshot(q,(snapshot)=>{
        snapshot.docs.forEach((doc)=>{
          projects.push({...doc.data()})
        })
        
      })
    }
    console.log(projects);
  }
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentuser) => {
      console.log("Auth", currentuser);
      setUserData(currentuser);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <userAuthContext.Provider
      value={{ userData, logIn, signUp, logOut, googleSignIn,getProjects }}
    >
      {children}
    </userAuthContext.Provider>
  );
}

export function useUserAuth() {
  return useContext(userAuthContext);
}
