import React from 'react'
import './LoginRegister.css'

class RegisterBox extends React.Component {
    
    constructor(props) {
        super(props)
        this.state = {}
    }

    submitRegister(e) {}

    render() {
        return(
            <div className="inner-container">
                <div className="header">Register</div>
                <div className="box">
                    <div className="input-group">
                        <label htmlFor="email">Email</label>
                        <input 
                            type="text"
                            name="email"
                            className="login-input"
                            placeholder="Email"
                            />
                    </div>
                    <div className="input-group">
                        <label htmlFor="firstname">Prénom</label>
                        <input 
                            type="text"
                            name="firstname"
                            className="login-input"
                            placeholder="Prénom"
                            />
                    </div>
                    <div className="input-group">
                        <label htmlFor="lastname">Nom</label>
                        <input 
                            type="text"
                            name="lastname"
                            className="login-input"
                            placeholder="Nom"
                            />
                    </div>
                    <div className="input-group">
                        <label htmlFor="password">Mot de passe</label>
                        <input 
                            type="text"
                            name="password"
                            className="login-input"
                            placeholder="Password"
                            />
                    </div>
                    <button
                        type="button"
                        className="login-btn"
                        onClick={this
                        .submitRegister
                        .bind(this)}>Register
                    </button>
                </div>
            </div>
        )
    }
}

export default RegisterBox