import React, { useState } from 'react'

const ModifyPassword = (props) => {
    const [newPassword, setNewPassword] = useState('')
    const handleNewPassword = (e) => {
        e.preventDefault()
        const id = localStorage.getItem('id')
        const myHeaders = new Headers({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        })
        const newProfil = {
            password: newPassword
        }
        function modifyPassword() {
            fetch(`http://localhost:3000/user/${id}`, {
                method: 'put',
                headers: myHeaders,
                body: JSON.stringify(newProfil)
            }).then(res => console.log(res))
        }
        modifyPassword()
        console.log(e)
    }
    return (  
        <div className="modify-password">
            <label htmlFor="old-password">
                Ancien mot de passe
                <input type="password" id="old-password"/>
            </label>
            <label htmlFor="password">
                Nouveau mot de passe
                <input type="password" id="password"onChange={(e)=>{setNewPassword(e.target.value)} }/>
            </label>
            <label htmlFor="password-confirm">
                Confirmer le mot de passe
                <input type="password" id="password-confirm" />
            </label>
            <button onClick={handleNewPassword}>Confirmer</button>
            <button onClick={props.onCancel}>Annuler</button>
        </div>
    );
}

export default ModifyPassword