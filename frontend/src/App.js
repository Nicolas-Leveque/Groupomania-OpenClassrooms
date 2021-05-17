import './App.css'
import React from 'react'
import Header from './Components/UI/Header'
import Footer from './Components/UI/Footer'
import Content from './Components/UI/Content'
import LoginRegister from './Components/UI/LoginRegister'
import FrontPage from './Components/FrontPage/FrontPage'

const App = () => {
    
    return (
        <div className='App'>
            <Header />
                <Content>
                {!localStorage.getItem('token') 
                ? <LoginRegister /> 
                : <FrontPage />}
                </Content>
            <Footer />
        </div>
        )
}


export default App