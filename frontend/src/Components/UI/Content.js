import React, { useContext } from 'react'
import LoginRegister from './LoginRegister'
import FrontPage from '../FrontPage/FrontPage'
import { AuthContext } from '../../Contexts/AuthContext'
import './Content.css';

const Content = (props) => {
const { isAuthenticated } = useContext(AuthContext)
    return (  
        <div className="content" >
            {props.children}
            {!localStorage.getItem('token')
                ? <LoginRegister /> 
                : <FrontPage />}
        </div>
    );
}


export default Content;