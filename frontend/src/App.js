import './App.css'
import React from 'react'
import Header from './Components/UI/Header'
import Footer from './Components/UI/Footer'
import Content from './Components/UI/Content'
import ShareForm from './Components/FrontPage/ShareForm'
import Post from './Components/FrontPage/Post'
import LoginRegister from './Components/UI/LoginRegister'
import fakeData from './examples/dummyDatas'

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoginOpen: true,
            isRegisterOpen: false
        }
    }

    render() {
        return (
        <div className='App'>
            <Header />
            <LoginRegister />
            <Content> 
                <ShareForm />
            </Content>
            <Content>
                <Post user={fakeData.userOne} post={fakeData.postOne} img={"https://i.imgur.com/iT8zBtl.jpeg"}/>
                <Post user={fakeData.userTwo} post={fakeData.postThree}/>
            </Content>
            <Footer />
        </div>
        )
    }
}


export default App