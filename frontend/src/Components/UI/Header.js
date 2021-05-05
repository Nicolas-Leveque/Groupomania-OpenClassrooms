import './Header.css'
import logo from '../../logos/icon-left-font-monochrome-white.svg'
const Header = () => {
    return (
        <header>
            <img className="logo" src={logo} alt='groupomania logo' />
            <a href="#profil" >Profil</a>

        </header>
    )
}

export default Header