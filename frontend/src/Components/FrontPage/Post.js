import './Post.css'

const Post = (props) => {
    return (
        <div className="post-container">
            <div className="utilisateur-info">
                <p>Photo-profil</p>
                <div className="info-partage">
                    <p className="nom-utilsateur">Nom Prénom</p>
                    <p className="heure-post">Date - Heure</p>
                </div>
            </div>
            <div className="post-info">
                <p className="titre-post">Titre de post</p>
                <p className="photo-post">Une éventuelle photo</p>
                <p className="corps-post">Le texte du post</p>
            </div>
        </div>
    )
}
export default Post

