import { createContext, useEffect, useState } from 'react';
import { toast } from "react-toastify";
import { 
    createUserWithEmailAndPassword, 
    GoogleAuthProvider, 
    onAuthStateChanged, 
    signInWithEmailAndPassword, 
    signInWithPopup, 
    signOut,
    getAuth,  
    updateProfile 
} from 'firebase/auth';
import { app } from './../firebase/firebase.config'
import useAxiosPublic from './../Hooks/useAxiosPublic';


// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext=createContext(null)
const auth = getAuth(app);

const AuthProvider = (props) => {
    const axiosPublic=useAxiosPublic()
    // ====Context API testing=====
        const imon='A Student of  Batch 10 of Programming Hero from AuthProvider';
    // ===========================
    const [user,setUser]=useState(null);
    const [loading,setLoading]=useState(true)
    console.log(user,loading);

    // _____Authentication start_____________
    //=========Email & Password Register========
    //===Register/CreateUser=====
    const handleRegister=(email,password)=>{
        setLoading(true);
        return createUserWithEmailAndPassword(auth,email,password)
    }
    //=========Email & Password Login========
    const handleLogin=(email,password)=>{
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password)
    }
    // ============GoogleLogin===============
    const provider = new GoogleAuthProvider();
    const handleGoogleLogin=()=>{
        setLoading(true);
        return signInWithPopup(auth, provider)
    }
    // ===========Logout===================
    const handleLogout=async ()=>{
        setLoading(true);
        // return signOut(auth);
        try {
            await signOut(auth);
            toast.success('successfully Log-out');
            setUser(null);
        } catch (err) {
            toast.info('Log-out',err.message)
        }
    }
    // _____Authentication end_______________

    // ====Update user profile at firebse=====
    const updateUserProfile = (name, photo) => {
        return updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: photo,
        })
    }

    //-----The following Observer on the Auth object always observes on user.Any kind of user's change,The observer record the the change,then the useEffect is rerendered-----
    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth,async(currentUser)=>{
            console.log('Current User:',currentUser)
            //! =====Making JWT token by Atik======
            if (currentUser?.email) {
                setUser(currentUser);
                const userInfo={
                    email: currentUser?.email
                }
                await axiosPublic.post(`/jwt`,userInfo,{ withCredentials: true })
                setLoading(false);
                } else {
                setUser(currentUser)
                await axiosPublic.get(`/logout`, {withCredentials: true})
                setLoading(false);
                }
            setLoading(false);
        })
        //! ===if this website is changed/unmount,the observer is inactive by the following statement because parameter is null======
        return ()=>{
            return unsubscribe();
        }
    },[])

    const authInfo={
        imon,
        user,
        setUser,
        loading,
        setLoading,
        updateUserProfile,
        handleRegister,
        handleLogin,
        handleLogout,
        handleGoogleLogin,
    }

        return (
            <div>
                <AuthContext.Provider value={authInfo}>
                    {
                        // eslint-disable-next-line react/prop-types
                        props.children
                    }
                </AuthContext.Provider>
            </div>
        );
};

export default AuthProvider;