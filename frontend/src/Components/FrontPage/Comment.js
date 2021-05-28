import './Comment.css'

const Comment = (props) => {
    return (  
        <div className="comment">
            <div className="comment-profil">
                <img id="photo-profil" src={`data:${props.typeImage};base64,${props.avatar}`} alt="" />
                <h5>{props.name}</h5>
            </div>
            <p className="comment-contenu">{props.contenu}</p>
        </div>
    );
}

export default Comment;