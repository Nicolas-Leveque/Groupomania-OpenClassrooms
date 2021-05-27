import { Link } from 'react-router-dom'
import './Post.css'


const Post = (props) => {
    return (
        <div className="post-container">
            <div className="utilisateur-info">
                <div className="photo-profil">
                    <img src={`data:${props.typeImage};base64,${props.avatar}`} alt="profil" />
                </div>
                <div className="info-partage">
                    <p className="nom-utilsateur">{props.firstName} {props.lastName}</p>
                    <p className="heure-post">{props.createdAt}</p>
                </div>
            </div>
                <div className="post-info">
                <Link to={`/post/${props.id}`} data={props.id}>
                    <h3 className="titre-post">{props.titre}</h3>
                    <p className="corps-post">{props.contenu}</p>
                </Link>
                    <p className="nbre-comments">{props.nbrComment} Commentaires</p>
                
                </div>
            
        </div>
    )
}
export default Post

