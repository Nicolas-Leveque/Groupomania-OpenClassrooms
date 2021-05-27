import React, { useState, useContext } from 'react';
import { AuthContext } from '../../Contexts/AuthContext'

const CommentForm = (props) => {
    const [ commentData, setCommentData ] = useState()
    const { setReload } = useContext( AuthContext )

    const createComment = (e) => {
        e.preventDefault()
        const newComment = {
            contenu: commentData,
            userId: localStorage.getItem('id'),
            postId: props.post
        }
        const myHeaders = new Headers({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        })
        fetch('http://localhost:3000/comment', {
            method:'post',
            headers: myHeaders,
            body: JSON.stringify(newComment)
        }).then(response => console.log(response))
        .then(setReload( true ))
        .then(props.onCancel())
    }
    return (  
        <form onSubmit={createComment}>
            <input type="text" onChange={e => setCommentData(e.target.value)}/>
            
            <button>Envoyer</button>
            <button onClick={props.onCancel}>Annuler</button>
        </form>
    );
}

export default CommentForm;