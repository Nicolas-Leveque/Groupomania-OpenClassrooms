import React, { useState } from 'react'

const FormAvatar = () => {
    const [ newProfilPic, setNewProfilPic ] = useState()
    const handleSetProfilPicture = (e) => {
        e.preventDefault();
        
        const myHeaders = new Headers({
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        })
        
        function setProfilPicture() {
            const data = new FormData() 
            data.append('imageData', newProfilPic)
            fetch(`http://localhost:3000/user/avatar`, {
                method: 'post',
                headers: myHeaders,
                body: data
            }).then(res => console.log(res))
        }
        setProfilPicture()
        console.log('state', newProfilPic)
        
    }
    return (  
        <div className="form-avatar">
            <input type="file" id="avatar" name="imageData" accept=".jpg, .jpeg, .png" onChange={(e) => {setNewProfilPic(e.target.files[0])}} />
            <button onClick={handleSetProfilPicture}>Envoyer</button>
        </div>
    );
}

export default FormAvatar;