import React, { useState, useContext } from 'react'
import { AuthContext } from '../../Contexts/AuthContext'
import './PostModForm.css'

const PostModForm = (props) => {
    const [ postTitre, setPostTitre ] = useState(props.titre)
    const [ postContent, setPostContent ] = useState(props.contenu)
    const { setReload } = useContext( AuthContext )

    const myHeaders = new Headers({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token')
        })
    const postData = {
        titre: postTitre,
        contenu: postContent
    }
    const handleModifyPost = (e) => {
        e.preventDefault()
        fetch(`http://localhost:3001/post/${props.id}`, {
            method: 'put',
            headers: myHeaders,
            body: JSON.stringify(postData)
        })
        .then(res => console.log(res))
        .then(setReload( true ))
        .then(props.switch(e))
    }
    return (  
        <form className="post-input" onSubmit={handleModifyPost}>
            <label>Titre
                <input type="text" value={postTitre} onChange={e => setPostTitre(e.target.value)} />
            </label>
            {props.contenu && (
                <label>Contenu
                    <textarea type="text" value={postContent} onChange={e => setPostContent(e.target.value)} />
                </label>
                )}
            <div className="post-control">
                <button type="submit">Envoyer</button>
            </div>
        </form>
    )
}

export default PostModForm