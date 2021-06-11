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
        fetch('http://localhost:3000/post', {
                    method:'get',
                    headers: myHeaders,
                }).then(response => response.json())
                .then(json => {
                    setData( json )
                })
        setReload( false )
        // eslint-disable-next-line
    }, [ reload, setReload ])
    return (
        <div className="frontpage" >
                <ShareForm />
                {data.map((data) => (
                    <Post
                        userId={data.userId}
                        admin={data.admin}
                        firstName={data.firstName}
                        lastName={data.lastName}
                        titre={data.titre}
                        createdAt={data.creation}
                        contenu={data.contenu}
                        avatar={data.imageData}
                        typeAvatar={data.imageType}
                        typeImgPost={data.postImgType}
                        postPicture={data.postImgData}
                        key={data.id}
                        id={data.id}
                        nbrComment={data.nbr_comments}
                    />
                ) )}
        </div>
    )
}

export default FrontPage;