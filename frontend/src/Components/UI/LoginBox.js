import React, { useState, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { AuthContext } from '../../Contexts/AuthContext'
import './LoginRegister.css'

const LoginBox = () => {
    const [ email, setEmail ] = useState()
    const [ password, setPassword ] = useState()
    const [ isLoginOk, setIsLoginOk ] = useState(true)
    const { setToken, setUserId, setIsAdmin } = useContext( AuthContext )
    let history = useHistory()

    const submitLogin = (e) => {
        e.preventDefault()
        const loginRequest = {email: email, password: password}
        const myHeaders = new Headers({
            'Content-Type': 'application/json'
        })
        fetch('http://localhost:3001/login', {
            method:'post',
            headers: myHeaders,
            body: JSON.stringify(loginRequest)
        })
            .then((response) => {
                    if(!response.ok) {
                        throw new Error('Erreur de connexion')
                    }
                    return response.json()
            })
            .then(json => {
                localStorage.setItem('token', json.token)
                localStorage.setItem('id', json.user.id)
                localStorage.setItem('admin', json.user.admin)
                setToken( json.token )
                setUserId( json.user.id )
                setIsAdmin( json.user.admin )
                history.push('/home')
            }).catch(e => {
                setIsLoginOk(false)
            })
    }
    return (
        <div className="inner-container">
                <div className="header">Login</div>
                <form className="box" onSubmit={submitLogin}>
                    <div className="input-group">
                        <label htmlFor="email">Email</label>
                        <input 
                            type="email"
                            onChange={(e) => setEmail(e.target.value)}
                            name="email"
                            className="login-input"
                            placeholder="Email"/>
                    </div>
                    <div className="input-group">
                        <label htmlFor="password">Password</label>
                        <input 
                            type="password"
                            onChange={(e) => setPassword(e.target.value)}
                            name="password"
                            className="login-input"
                            placeholder="Password"/>
                    </div>
                    {!isLoginOk && <p>Erreur de connexion, veuiller vérifier vos identifiants </p>}
                    <button
                        type="submit"
                        value="Submit"
                        className="login-btn">Login</button>
                </form>
            </div>
    );
}

export default LoginBox;