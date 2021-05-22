import React, { useState, useEffect, useContext } from 'react'
import "./FrontPage.css"
import { AuthContext } from '../../Contexts/AuthContext'
import ShareForm from '../FrontPage/ShareForm'
import Post from '../FrontPage/Post'

const FrontPage = () => {
    const [data, setData] = useState([])
    const { setReload } = useContext( AuthContext )
    useEffect( () => {
        const myHeaders = new Headers({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        })
        function fetchData() {
            fetch('http://localhost:3000/post', {
                    method:'get',
                    headers: myHeaders,
                }).then(response => response.json())
                .then(json => {
                    setData( json )
                    setReload( true )

                })
        }
        fetchData()
        // eslint-disable-next-line
    }, [])
    return (
        <div className="frontpage" >
                <ShareForm />
                
                {data.map((data) => (
                    <Post 
                        firstName={data.firstName}
                        lastName={data.lastName}
                        titre={data.titre}
                        createdAt={data.creation}
                        contenu={data.contenu}
                        avatar={data.imageData}
                        key={data.id}
                        nbrComment={data.nbr_comments}
                    />
                ) )}
        </div>
    )
}

export default FrontPage;