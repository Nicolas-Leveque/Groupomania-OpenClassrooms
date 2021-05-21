import React from 'react'
import { AuthContext } from '../../Contexts/AuthContext'
import './LoginRegister.css'

class RegisterBox extends React.Component {
    static contextType = AuthContext
    constructor(props) {
        super(props)
        this.state = { email:'', firstName:'', lastName:'', password:''}
        this.submitRegister = this.submitRegister.bind(this)
    }

    submitRegister(e) {
        e.preventDefault()
        const registerRequest = { 
            email: this.state.email,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            password: this.state.password
        }
        const myHeaders = new Headers({
            'Content-Type': 'application/json'
        })
        fetch('http://localhost:3000/signup', {
            method:'post',
            headers: myHeaders,
            body: JSON.stringify(registerRequest)
        })
            .then((response) => response.json())
            .then(json => {
                localStorage.setItem('token', json.token)
                this.context.setToken( json.token )
                this.context.setUserId( json.user.id )
                this.context.setisAuthenticated( true )
                console.log(this.context)
            })
    }
    
    render() {
        return(
            <div className="inner-container">
                <div className="header">Register</div>
                <form className="box" onSubmit={this.submitRegister}>
                    <div className="input-group">
                        <label htmlFor="email">Email</label>
                        <input 
                            type="text"
                            name="email"
                            className="login-input"
                            placeholder="Email"
                            onChange={(e) => this.setState({ email: e.target.value })}
                            />
                    </div>
                    <div className="input-group">
                        <label htmlFor="firstname">Prénom</label>
                        <input 
                            type="text"
                            name="firstname"
                            className="login-input"
                            placeholder="Prénom"
                            onChange={(e) => this.setState({ firstName: e.target.value })}
                            />
                    </div>
                    <div className="input-group">
                        <label htmlFor="lastname">Nom</label>
                        <input 
                            type="text"
                            name="lastname"
                            className="login-input"
                            placeholder="Nom"
                            onChange={(e) => this.setState({ lastName: e.target.value })}
                            />
                    </div>
                    <div className="input-group">
                        <label htmlFor="password">Mot de passe</label>
                        <input 
                            type="password"
                            name="password"
                            className="login-input"
                            placeholder="Password"
                            onChange={(e) => this.setState({ password: e.target.value })}
                            />
                    </div>
                    <button
                        type="submit"
                        className="login-btn"
                    >Register
                    </button>
                </form>
            </div>
        )
    }
}

export default RegisterBox