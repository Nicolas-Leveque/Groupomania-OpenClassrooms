import React, { useContext, useState  } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { AuthContext } from '../../Contexts/AuthContext'
import PostModForm from './PostModForm'
import './Post.css'


const Post = (props) => {
    const [ showModifyPost, setShowModifyPost ] = useState(false)
    const { setReload, userId, isAdmin } = useContext( AuthContext )
    let history = useHistory()
    const myHeaders = new Headers({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token')
    })
    const handleDeletePost = (e) => {
        e.preventDefault()
        fetch(`http://localhost:3000/post/${props.id}`, {
            method: 'delete',
            headers: myHeaders
        }).then(res => console.log(res))
        history.push('/home')
        setReload( true )
    }
    const changeModifyPost = (e) => {
        e.preventDefault()
        setShowModifyPost(!showModifyPost)
    }

    return (
        <div className="post-container">
            <div className="utilisateur-info">
                <div className="photo-profil">
                    <img className="profil-pic" src={`data:${props.typeAvatar};base64,${props.avatar}`} alt="profil" />
                </div>
                <div className="info-partage">
                    <p className="nom-utilsateur">{props.firstName} {props.lastName}</p>
                    <p className="heure-post">{props.createdAt}</p>
                </div>
            </div>
            <div className="post-info">
                <Link to={`/post/${props.id}`} data={props.id}>
                    <h3 className="titre-post">{props.titre}</h3>
                    {props.postPicture && <img className="post-pic" src={`data:${props.typeImgPost};base64,${props.postPicture}`} alt={`post n°${props.id}`}/>}
                    <p className="corps-post">{props.contenu}</p>
                </Link>
                <p className="nbre-comments">{props.nbrComment} Commentaires</p>
            </div>
            {showModifyPost && <PostModForm id={props.id} titre={props.titre} contenu={props.contenu} switch={changeModifyPost} /> }
            {(userId === props.userId || isAdmin) && (
                <div className="post-control">
                    <button onClick={changeModifyPost}>Modifier</button>
                    <button onClick={handleDeletePost}>Supprimer</button>
                </div>
                )}
            
            
        </div>
    )
}
export default Post

