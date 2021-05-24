import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../Contexts/AuthContext'
import './Header.css'
import logo from '../../logos/icon-left-font-monochrome-white.svg'
const Header = () => {
    const { setReload } = useContext( AuthContext )
    const handleLogout = () => {
        localStorage.clear()
        setReload( true )
    }
    return (
        <header>
            
            <Link to='/' exact={true}>
                <img className="logo" src={logo} alt='groupomania logo' />
            </Link>
            <div className="header-right">
                <Link to='/profil' >Profil</Link>
                <button onClick={handleLogout}>Logout</button>
            </div>
        </header>
    )
}

export default Header