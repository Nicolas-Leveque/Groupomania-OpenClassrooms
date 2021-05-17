import './Post.css'


const Post = (props) => {
    return (
        <div className="post-container">
            <div className="utilisateur-info">
                <div className="photo-profil">
                    <img src={props.avatar} alt="profil" />
                </div>
                <div className="info-partage">
                    <p className="nom-utilsateur">{props.lastName } {props.firstName}</p>
                    <p className="heure-post">Date - Heure</p>
                </div>
            </div>
            <div className="post-info">
                <p className="titre-post">{props.titre}</p>
                {/* <img src={props.img} alt="" className="photo-post" /> */}
                <p className="corps-post">{props.contenu}</p>
            </div>
        </div>
    )
}
export default Post

