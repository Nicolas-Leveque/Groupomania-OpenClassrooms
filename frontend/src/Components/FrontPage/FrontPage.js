import React, { useState, useEffect, useContext } from 'react'
import "./FrontPage.css"
import ShareForm from '../FrontPage/ShareForm'
import { AuthContext } from '../../Contexts/AuthContext'
import Post from '../FrontPage/Post'

const FrontPage = () => {
    const [data, setData] = useState([])
    const { reload, setReload } = useContext(AuthContext)
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
                })
        }
        fetchData()
        setReload( false )
        // eslint-disable-next-line
    }, [ reload ])
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
                        typeImage={data.imageType}
                        key={data.id}
                        id={data.id}
                        nbrComment={data.nbr_comments}
                    />
                ) )}
        </div>
    )
}

export default FrontPage;