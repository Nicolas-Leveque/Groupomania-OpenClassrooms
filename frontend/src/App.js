import './App.css'
import React from 'react'
import Header from './Components/UI/Header'
import Footer from './Components/UI/Footer'
import Content from './Components/UI/Content'
import UserProfil from './Components/FrontPage/UserProfil'
import DetailPost from './Components/FrontPage/DetailPost'
import AuthContextProvider from './Contexts/AuthContext'
import PostContextProvider from './Contexts/PostContext'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

const App = () => {
    
    return (
        <div className='App'>
            <Router>
                <AuthContextProvider>
                    <PostContextProvider>
                        <Header />
                            <Switch>
                                <Route path="/home" component={Content} />
                                <Route path="/profil" component={UserProfil} />
                                <Route path="/post/:postId" component={DetailPost} />
                            </Switch>
                        <Footer />
                    </PostContextProvider>
                </AuthContextProvider>
            </Router>
        </div>
        )
}


export default App