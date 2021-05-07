import './Post.css'
import photoProfil from '../../examples/Chaton1.jpg'

const Post = (props) => {
    return (
        <div className="post-container">
            <div className="utilisateur-info">
                <div className="photo-profil">
                    <img src={photoProfil} alt="profil" />
                </div>
                <div className="info-partage">
                    <p className="nom-utilsateur">{props.user.lastName } {props.user.firstName}</p>
                    <p className="heure-post">Date - Heure</p>
                </div>
            </div>
            <div className="post-info">
                <p className="titre-post">{props.post.titre}</p>
                <img src={props.img} alt="" className="photo-post" />
                <p className="corps-post">{props.post.contenu}</p>
            </div>
        </div>
    )
}
export default Post

