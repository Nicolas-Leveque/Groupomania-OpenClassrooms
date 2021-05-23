import React, { useState, useEffect } from 'react'
import './UserProfil.css'

const UserProfil = () => {
    const [data, setData] = useState([])
    useEffect( () => {
        const myHeaders = new Headers({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        })
        function fetchData() {
            fetch('http://localhost:3000/user/me', {
                    method:'get',
                    headers: myHeaders,
                }).then(response => response.json())
                .then(json => {
                    const tempDate = new Date(json.createdAt)
                    json.createdAt = tempDate.toDateString()
                    setData( json )
                })
        }
        fetchData()
        // eslint-disable-next-line
    }, [])
    return (
        <div className='user-profil'>
            <h2>{data.fullName}</h2>
            <p>Inscrit depuis {data.createdAt}</p>
            <div className='user-container'>
                <div className='profil-photo'>
                    <img src={`data:${data.imageType};base64,${data.imageData}`} alt="profil" />
                    <button>Choisir une photo</button>
                </div>
                <form className='form-profil' disabled>
                    <label htmlFor="nom">Nom</label>
                    <input type="text" id="nom" />
                    <label htmlFor="prenom">Prenom</label>
                    <input type="text" id="pernom" />
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" />
                    <label htmlFor="password">Mot de passe</label>
                    <input type="password" id="password" />
                </form>
                {/* {console.log(data)} */}
            </div>
        </div>
    );
}

export default UserProfil
