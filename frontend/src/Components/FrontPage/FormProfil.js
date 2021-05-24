import {  useContext } from 'react'
import { AuthContext } from '../../Contexts/AuthContext'
import './FormProfil.css'

const FormProfil = (props) => {
    const { setReload } = useContext( AuthContext )
    const handleDeleteProfil = () => {
        const id = localStorage.getItem('id')
        const myHeaders = new Headers({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        })
        function deleteProfil(e) {
            e.preventDefault()
            fetch(`http://localhost:3000/${id}`, {
                method:'delete',
                headers: myHeaders,
            })
            localStorage.clear()
            setReload (true )
        }
        deleteProfil()
    }
    const handleModifyProfil = (e) => {
        e.preventDefault()
        
    }
    return (
        <form className='form-profil'>
                    <label htmlFor="nom">Nom</label>
                    <input className="profil-input" type="text" id="nom" placeholder={props.data.lastName} />
                    <label htmlFor="prenom">Prenom</label>
                    <input className="profil-input" type="text" id="prenom" placeholder={props.data.firstName} />
                    <label htmlFor="email">Email</label>
                    <input className="profil-input" type="email" id="email" placeholder={props.data.email} />
                    <label htmlFor="password">Mot de passe</label>
                    <input className="profil-input" type="password" id="password" />
                    <div className="form-control">
                        <button onClick={handleModifyProfil}>Modifier le profil</button>
                        <button onClick={handleDeleteProfil}>Supprimer le profil</button>
                    </div>
                </form>
    );
}

export default FormProfil;