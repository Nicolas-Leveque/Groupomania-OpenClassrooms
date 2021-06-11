import React, { useState, useContext } from 'react';
import { AuthContext } from '../../Contexts/AuthContext'
import './CommentModForm.css'

const CommentModForm = (props) => {
    const [ commentData, setCommentData ] = useState(props.contenu)
    const { setReload } = useContext( AuthContext )
    const myHeaders = new Headers({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token')
    })
    const handleModifyComment = (e) => {
        e.preventDefault()
        
        fetch(`http://localhost:3000/comment/${props.id}`, {
            method: 'put',
            headers: myHeaders,
            body: JSON.stringify({ contenu: commentData })
        })
        .then(res => console.log(res))
        .then(setReload( true ))
        .then(props.switch(e))
    }
    return ( 
        <form className="comment-input" onSubmit={handleModifyComment }>
                <input  type="text" onChange={e => setCommentData(e.target.value)}value={commentData}/>
                <div className="comment-control">
                    <button type="submit">Envoyer</button>
                </div>
            </form>
    );
}

export default CommentModForm