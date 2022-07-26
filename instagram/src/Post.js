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
       <img className='post__image' src="https://th.bing.com/th/id/R.681c821a5852beef6040d5d44523b509?rik=Lk4BpeAkSyG%2ftg&riu=http%3a%2f%2fwww.pixelstalk.net%2fwp-content%2fuploads%2f2016%2f11%2fBeautiful-Cow-1920x1080.jpg&ehk=mLQ4vr%2fD0eotkUKnrJ4qmXInS8jWj2jLxFcJ6pjqbvg%3d&risl=&pid=ImgRaw&r=0" />
 
       {/* username + caption */}
       <h4 className='post__text'><strong>{username}</strong>{caption} </h4>
    </div>
 )
}
 
export default Post
