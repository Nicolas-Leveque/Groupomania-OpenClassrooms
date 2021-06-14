import {  useState, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { AuthContext } from '../../Contexts/AuthContext'

const FormProfil = (props) => {
    const [ lastName, setLastName ] = useState(props.data.lastName) 
    const [ firstName, setFirstName ] = useState(props.data.firstName) 
    const [ email , setEmail ] = useState(props.data.email)
    const [ password, setPassword] = useState(props.data.password)
    const [ passwordCheck, setPasswordCheck ] = useState()
    const { setReload, reload } = useContext( AuthContext )
    let history = useHistory()

    const id = localStorage.getItem('id')
    const myHeaders = new Headers({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token')
    })
    const handleDeleteProfil = (e) => {
        e.preventDefault()
        fetch(`http://localhost:3001/${id}`, {
                method:'delete',
                headers: myHeaders,
            })
        localStorage.clear()
        setReload(true)
        history.push('/home')
    }
    const handleModifyProfil = (e) => {
        e.preventDefault()
        const newProfil = {
            firstName: firstName,
            lastName: lastName,
            email: email
        }
        fetch(`http://localhost:3001/user/${id}`, {
                method: 'put',
                headers: myHeaders,
                body: JSON.stringify(newProfil)
            }).then(res => console.log(res))
        setReload(true)
        console.log('from-profil',reload)
    }
    const handleModifyPassword = (e) => {
        e.preventDefault()
        if ( password === passwordCheck ){
            const newProfil = {
                password: password
            }
            fetch(`http://localhost:3001/user/${id}`, {
                    method: 'put',
                    headers: myHeaders,
                    body: JSON.stringify(newProfil)
                }).then(res => console.log(res))
            console.log( "Password modifié")
            setReload(true)
        } else {console.log('erreur')}
        setReload(true)
        console.log(reload)
        
    }
    return (
        <form className='form-profil'>
                    <label htmlFor="nom">Nom</label>
                    <input className="profil-input" type="text" name="nom" id="nom" placeholder={props.data.lastName} onChange={(e) => setLastName(e.target.value)}/>
                    <label htmlFor="prenom">Prenom</label>
                    <input className="profil-input" type="text" name="prenom" id="prenom" placeholder={props.data.firstName} onChange={(e) => setFirstName(e.target.value)}/>
                    <label htmlFor="email">Email</label>
                    <input className="profil-input" type="email" name="email" id="email" placeholder={props.data.email} onChange={(e) => setEmail(e.target.value)}/>
                    < div className="form-control">    
                        <button onClick={handleModifyProfil}>Modifier le profil</button>
                        <button className="delete-button" onClick={handleDeleteProfil}>Supprimer le profil</button>
                    </div>
                    <label htmlFor="password">Nouveau mot de passe</label>
                    <input type="password" id="password" name="password" onChange={(e)=>{setPassword(e.target.value)} }/>
                    <label htmlFor="password-confirm">Confirmer le mot de passe</label>
                    <input type="password" id="password-confirm" name="password-confirm" onChange={(e)=>{setPasswordCheck(e.target.value)} }/>
                    < div className="form-control">    
                        <button onClick={handleModifyPassword}>Modifier le mot de passe</button>
                    </div>
                </form> 
    );
}

export default FormProfil;