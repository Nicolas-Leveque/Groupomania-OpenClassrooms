import { useEffect, useState, useContext } from 'react'
import { useParams } from 'react-router-dom'
import { AuthContext } from '../../Contexts/AuthContext'
import Comment from './Comment'
import CommentForm from './CommentForm'
import Post from './Post'
import './Detailpost.css'

const DetailPost = () => {
    const { postId } = useParams()
    const [ postData, setPostData ] = useState({})
    const [ commentData, setCommentData ] = useState([])
    const [ showCommentForm, setShowCommentForm ] = useState(false)
    const { reload, setReload } = useContext(AuthContext)
    useEffect( () => {
        const myHeaders = new Headers({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        })
        function fetchPostData() {
            fetch(`http://localhost:3000/post/${postId}`, {
                    method:'get',
                    headers: myHeaders,
            }).then(response => response.json())
                .then(json => {
                    setPostData( json[0] )
                })
        }
        
        function fetchCommentData() {
            fetch(`http://localhost:3000/comment/post/${postId}`, {
                method: 'get',
                headers: myHeaders,
            }).then(response => response.json())
                .then(json => {
                    setCommentData( json )
                })
        }
        fetchPostData()
        fetchCommentData()
        setReload( false )
        // eslint-disable-next-line
    }, [ reload ])
    const handleCommentForm = () => {
        setShowCommentForm(true)
    }
    const hideCommentForm = () => {
        setShowCommentForm(false)
    }
    return (  
        <div className="detail-post">
            <Post 
                firstName={postData.firstName}
                lastName={postData.lastName}
                titre={postData.titre}
                createdAt={postData.creation}
                contenu={postData.contenu}
                avatar={postData.imageData}
                typeImage={postData.imageType}
                key={postData.id}
                id={postData.id}
                nbrComment={postData.nbr_comments}
            />
            {!showCommentForm && <button className="trigger-comment-form" onClick={handleCommentForm} >Laisser un commentaire</button>}
            {showCommentForm && <CommentForm onCancel={hideCommentForm} post={postId}/>}
            {commentData.map((data) => (
                <Comment
                    key={data.id}
                    typeImage={data.imageType}
                    avatar={data.imageData}
                    name={`${data.firstName } ${data.lastName}`}
                    contenu={data.contenu}
                />
            ) )}
        </div>
    );
}

export default DetailPost;