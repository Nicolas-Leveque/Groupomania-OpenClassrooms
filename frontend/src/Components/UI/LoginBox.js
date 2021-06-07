import React from 'react'
import { AuthContext } from '../../Contexts/AuthContext'
import './LoginRegister.css'

class LoginBox extends React.Component {
    static contextType = AuthContext
    constructor(props) {
        super(props)
        this.state = {email: '', password: '', isLoginOk: true}
        this.submitLogin = this.submitLogin.bind(this)
    }
    
    submitLogin(e) {
        e.preventDefault()
        const loginRequest = {email: this.state.email, password: this.state.password}
        const myHeaders = new Headers({
            'Content-Type': 'application/json'
        })
        fetch('http://localhost:3000/login', {
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
                this.context.setToken( json.token )
                this.context.setUserId( json.user.id )
                this.context.setIsAdmin( json.user.admin )
                console.log(json)
            }).catch(e => {
                console.log(e)
                this.setState({isLoginOk: false})
            })
    }
    render() {
        return (
            <div className="inner-container">
                <div className="header">Login</div>
                <form className="box" onSubmit={this.submitLogin}>
                    <div className="input-group">
                        <label htmlFor="email">Email</label>
                        <input 
                            type="email"
                            onChange={(e) => this.setState({ email: e.target.value })}
                            name="email"
                            className="login-input"
                            placeholder="Email"/>
                    </div>
                    <div className="input-group">
                        <label htmlFor="password">Password</label>
                        <input 
                            type="password"
                            onChange={(e) => this.setState({ password: e.target.value })}
                            name="password"
                            className="login-input"
                            placeholder="Password"/>
                    </div>
                    {!this.state.isLoginOk && <p>Erreur de connexion, veuiller vérifier vos identifiants </p>}
                    <button
                        type="submit"
                        value="Submit"
                        className="login-btn">Login</button>
                </form>
            </div>
        )
    }
}

export default LoginBox