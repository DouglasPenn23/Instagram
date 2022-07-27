// This component will control how the posts look
import React from 'react'
import './Post.css';
import Avatar from '@mui/material/Avatar';
 
function Post({ username, caption, imageUrl }) {
 return (
    <div className="post">
        <div className="post__header">
            <Avatar
                classname="post__avatar"
                alt="DouglasPenn23"
                src="/static/images/avatar/1.jpg"
            />
            <h3>{username}</h3>
        </div>
        
       {/* Header -> avatar + username */}
 
       {/* Image */}
        <img className='post__image' src= {imageUrl} alt="instagram Post"/>
 
       {/* username + caption */}
       <h4 className='post__text'><strong>{username}</strong> {caption} </h4>
    </div>
 )
}
 
export default Post
