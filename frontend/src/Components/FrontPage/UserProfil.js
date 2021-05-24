import React, { useState, useEffect } from 'react'
import './UserProfil.css'
import FormProfil from './FormProfil'

const UserProfil = () => {
    const [ data, setData ] = useState([])
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
                <FormProfil data={data}/>
            </div>
        </div>
    );
}

export default UserProfil
