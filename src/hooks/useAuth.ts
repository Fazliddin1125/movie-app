import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, User } from 'firebase/auth';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { auth } from 'src/firebase'
export const useAuth = () =>{
    const [isLoading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string>('')
    const [user, setUser] = useState<User | null>(null)

    const router = useRouter();

    const signUp = async (email: string, password: string)=>{
        setLoading(true);

         await createUserWithEmailAndPassword(auth, email, password)
        .then(res=>{
            setUser(res.user);
            router.push('/');
            setLoading(true);
        })
        .catch(error=>setError(error.message))
        .finally(()=> setLoading(false))
    };


    const signIn = async (email: string, password: string)=>{
        setLoading(true);

         await signInWithEmailAndPassword(auth, email, password)
        .then(res=>{
            setUser(res.user);
            router.push('/');
            setLoading(true);
        })
        .catch(error=>setError(error.message))
        .finally(()=> setLoading(false))
    };

    const logout = async ()=>{
        setLoading(false)

        signOut(auth)
            .then(()=>setUser(null))
            .catch(error => setError(error.message))
            .finally(()=> setLoading(false));
        
    }

    return {error, isLoading, user, signIn, signUp, logout, setUser, setLoading}
};