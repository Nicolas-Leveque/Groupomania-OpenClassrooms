import './App.css'
import React from 'react'
import Header from './Components/UI/Header'
import Footer from './Components/UI/Footer'
import Content from './Components/UI/Content'
import AuthContextProvider from './Contexts/AuthContext'

const App = () => {
    
    return (
        <div className='App'>
            <AuthContextProvider>
                <Header />
                    <Content />
                <Footer />
            </AuthContextProvider>
        </div>
        )
}


export default App