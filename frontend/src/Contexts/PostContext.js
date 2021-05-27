import React, { useState, createContext } from 'react'

export const PostContext = createContext()

const PostContextProvider = (props) => {
    const [ postData, setPostData ] = useState([])
    const [ commentData, setCommentData ] = useState([])

    return(
        <PostContext.Provider value={{ postData, setPostData, commentData, setCommentData }}>
            {props.children}
        </PostContext.Provider>
    )
}

export default PostContextProvider