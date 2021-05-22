import React, { useContext } from 'react'
import LoginRegister from './LoginRegister'
import FrontPage from '../FrontPage/FrontPage'
import { AuthContext } from '../../Contexts/AuthContext'
import './Content.css';

const Content = () => {
const { reload } = useContext(AuthContext)
    return (  
        <div className="content" >
            {console.log(reload)}
            {!localStorage.getItem('token')
                ? <LoginRegister /> 
                : <FrontPage />}
        </div>
    );
}


export default Content;