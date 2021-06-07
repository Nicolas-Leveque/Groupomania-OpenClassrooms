import LoginRegister from './LoginRegister'
import FrontPage from '../FrontPage/FrontPage'
import './Content.css';

const Content = () => {
    return (  
        <div className="content" >
            {!localStorage.getItem('token')
                ? <LoginRegister /> 
                : <FrontPage />}
        </div>
    );
}

export default Content;