import PropTypes from "prop-types";
import AuthContext from "./AuthContext";
import { useEffect, useState } from "react";
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import { auth } from "../firebase/firebase.config";

const googleProvider = new GoogleAuthProvider();

export const AuthProvider = ({ children }) => {

    const [currentUser, setCurrentUser] = useState(null);

    const [loading, setLoading] = useState(true);

    // register a User
    const registerUser = async (email, password) => {
        return await createUserWithEmailAndPassword(auth, email, password);
    }

    // login the User
    const loginUser = async (email, password) => {
        return await signInWithEmailAndPassword(auth, email, password);
    }

    // signin with Google
    const signinWithGoogle = async () => {
        return await signInWithPopup(auth, googleProvider)
    }

    // logout the User
    const logout = () => {
        return signOut(auth)
    }

    // manage User
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
            setLoading(false);

            if (user) {
                const {email, displayName, photoURL} = user;
                const userData = {
                    email, 
                    username: displayName,
                    photo: photoURL
                }
            }
        })

        return () => unsubscribe();
    })

    const value = {
        // Add context values here
        loading,
        currentUser,
        registerUser,
        loginUser,
        signinWithGoogle,
        logout
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
};
