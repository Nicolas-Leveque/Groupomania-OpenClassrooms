import { Link } from 'react-router-dom'
import './Header.css'
import logo from '../../logos/icon-left-font-monochrome-white.svg'
const Header = () => {
    return (
        <header>
            <Link to='/' exact={true}>
                <img className="logo" src={logo} alt='groupomania logo' />
            </Link>
            <Link to='/profil' >Profil</Link>

        </header>
    )
}

export default Header