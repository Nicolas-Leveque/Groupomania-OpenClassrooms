import './App.css'
import Header from './Components/UI/Header'
import Footer from './Components/UI/Footer'
import Content from './Components/UI/Content'
import ShareForm from './Components/FrontPage/ShareForm'
import Post from './Components/FrontPage/Post'

const App = () => {
    return (
        <div className='App'>
            <Header />
            <Content> 
                <ShareForm />
            </Content>
            <Content>
                <Post />
            </Content>
            <Footer />
        </div>
    )
}

export default App