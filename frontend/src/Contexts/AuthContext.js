import React, { useState, createContext} from 'react';

export const AuthContext = createContext();

const AuthContextProvider = (props) => {
    const [reload, setReload] = useState(false)
    const [token, setToken ] = useState('')
    const [userId, setUserId ] = useState('')
    const [isAdmin, setIsAdmin ] = useState()
    
    return (
        <AuthContext.Provider value={{ token, setToken, userId, setUserId, reload, setReload, isAdmin, setIsAdmin }}>
            {props.children}
        </AuthContext.Provider>
    );
}

export default AuthContextProvider;