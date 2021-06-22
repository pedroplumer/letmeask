import { ReactNode } from 'react';
import { createContext, useEffect, useState } from 'react';
import { auth, firebase } from '../services/firebase';

type User = {
    id: string;
    name: string;
    avatar: string;
  }

type AuthContextType = {
    user: User | undefined;
    sigInWithGoogle: () => Promise<void>;
  }

type AuthProviderProps = {
    children: ReactNode
}

const AuthContext = createContext({} as AuthContextType);



const AuthContextProvider = (props: AuthProviderProps) => {

    const [user, setUser] = useState<User>();

    useEffect(() => {
      const usubscribe = auth.onAuthStateChanged(user => {
        if(user) {
          const { displayName, photoURL, uid} = user;
  
          if(!displayName || !photoURL) {
            throw new Error('Missing user')
          }
  
          setUser({
            id: uid,
            name: displayName,
            avatar: photoURL
          })
        }
      })
  
      return () => usubscribe()
    }, [])
  
    const sigInWithGoogle = async () => {
      const provider = new firebase.auth.GoogleAuthProvider();
  
      let result = await auth.signInWithPopup(provider)
      if(result.user) {
        const { displayName, photoURL, uid } = result.user
  
        if (!displayName || !photoURL) {
            throw new Error('Missing user')
        }
        setUser({
          id: uid,
          name: displayName,
          avatar: photoURL
        })
      }
    }
    
    return (
        <AuthContext.Provider value={{user, sigInWithGoogle}}>
            {props.children}
        </AuthContext.Provider>
    )
}

export { AuthContext, AuthContextProvider};

