import React, { useState } from 'react'
import LoginBox from "./LoginBox"
import RegisterBox from "./RegisterBox"
import "./LoginRegister.css"

const LoginRegister = () => {
    const [ isLoginOpen, setIsLoginOpen] = useState(true)
    const [ isRegisterOpen, setIsRegisterOpen] = useState(false)

    const showLoginBox = () => {
        setIsLoginOpen(true)
        setIsRegisterOpen(false)
    }
    const showRegisterBox = () => {
        setIsLoginOpen(false)
        setIsRegisterOpen(true)
    }
    return (
        <div className="root-container">
                <div className="box-controller">
                    <div 
                        className={"controller " + (isLoginOpen ? "selected-controller" : "")}
                        onClick={showLoginBox}>
                        Login
                    </div>
                    <div 
                        className={"controller " + (isRegisterOpen ? "selected-controller" : "")}
                        onClick={showRegisterBox}>
                        Register
                    </div>
                </div>

                <div className="box-container">
                    {isLoginOpen && <LoginBox />}
                    {isRegisterOpen && <RegisterBox />}
                </div>
            </div>
    );
}
export default LoginRegister;