import { ReactNode, createContext, useEffect, useMemo, useState } from 'react'
import { User, onAuthStateChanged } from 'firebase/auth'
import { useAuth } from 'src/hooks/useAuth';
import { auth } from 'src/firebase';
import { useRouter } from 'next/router';



interface AuthContextState {
    user: User | null;
    error: string;
    isLoading: boolean;
    signUp: (email: string, password: string) => Promise<void>;
    signIn: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
} 

export const AuthContext = createContext<AuthContextState>({
    user: null,
    error: '',
    isLoading: false,
    signUp:  async () => { },
    signIn:  async () => { },
    logout:  async () => { },
})
const AuthContextProvider = ({ children }: { children: ReactNode }) => {

    const {error, isLoading, logout, signIn, signUp, user, setUser, setLoading} = useAuth()
    const router = useRouter()
    const [initialLoder, setInitialLoder] = useState<boolean>(true)
    const value = useMemo(()=>({
        user, isLoading, logout, signIn, error, signUp
    }),
    //eslint-disable-next-line 
    [user, isLoading, error]
    );
 
    useEffect(()=> onAuthStateChanged(auth, user =>{
        if(user){
            setLoading(false);
            setUser(user)
        }else{
            setUser(null);
            setLoading(true);
            router.push('/auth');
        }
        setLoading(false);
        setInitialLoder(false);
    //eslint-disable-next-line    
    }), []);
    return <AuthContext.Provider value={value}>{!initialLoder ? children: " Loading..."} </AuthContext.Provider>
}

export default AuthContextProvider;