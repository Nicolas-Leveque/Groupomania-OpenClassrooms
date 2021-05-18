import React, { useState, useEffect } from 'react'
import "./FrontPage.css"

import ShareForm from '../FrontPage/ShareForm'
import Post from '../FrontPage/Post'

const FrontPage = (props) => {
    const [data, setData] = useState([])
    
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
                    />
                ) )}
        </div>
    )
}

export default FrontPage;