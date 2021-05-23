import './App.css'
import React from 'react'
import Header from './Components/UI/Header'
import Footer from './Components/UI/Footer'
import Content from './Components/UI/Content'
import UserProfil from './Components/FrontPage/UserProfil'
import AuthContextProvider from './Contexts/AuthContext'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

const App = () => {
    
    return (
        <div className='App'>
            <Router>
                <AuthContextProvider>
                    <Header />
                        <Switch>
                            <Route path="/" component={Content} exact={true} />
                            <Route path="/profil" component={UserProfil} />
                        </Switch>
                    <Footer />
                </AuthContextProvider>
            </Router>
        </div>
        )
}


export default App