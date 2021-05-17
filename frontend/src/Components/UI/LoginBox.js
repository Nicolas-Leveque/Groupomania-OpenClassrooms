import React from 'react'
import './LoginRegister.css'

class LoginBox extends React.Component {

    constructor(props) {
        super(props)
        this.state = {email: '', password: ''}
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
            .then((response) => response.json())
            .then(json => {
                localStorage.setItem('token', json.token)
                console.log(json.token)
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
                        type="text"
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
                    <button
                        type="submit"
                        value="Submit"
                        className="login-btn"
                        >Login</button>
                </form>
            </div>
        )
    }
}

export default LoginBox