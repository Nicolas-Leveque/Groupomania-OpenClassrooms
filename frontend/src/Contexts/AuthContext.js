import React, { useState, createContext} from 'react';

export const AuthContext = createContext();

const AuthContextProvider = (props) => {
    const [isAuthenticated, setisAuthenticated] = useState()
    const [token, setToken ] = useState('')
    const [userId, setUserId ] = useState('')
    
    return (
        <AuthContext.Provider value={{ token, setToken, userId, setUserId, isAuthenticated, setisAuthenticated }}>
            {props.children}
        </AuthContext.Provider>
    );
}

export default AuthContextProvider;