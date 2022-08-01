// This component will control how the posts look
import React, { useEffect, useState } from 'react'
import './Post.css';
import Avatar from '@mui/material/Avatar';
// import Button from '@mui/material/Button';
import { db } from './firebase';
import firebase from 'firebase/compat/app';

 
function Post({ postId, username, caption, imageUrl }) {

    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState('');

    useEffect(() => {
        let unsubscribe;
        // If a postId was passed through
        if (postId) {
            unsubscribe = db
                // Access the posts collection
                .collection("posts")
                // Going to the post ID Document
                .doc(postId)
                // Going inside to the collection of comments
                .collection("comments")
                .orderBy('timestamp', 'desc')
                // Taking a snapshot of the doc
                // This is a nested listener
                .onSnapshot((snapshot) => {
                    setComments(snapshot.docs.map((doc) => doc.data()))
                });
        }

        // return () => {
        //     // Perform some cleanup actions
        //     unsubscribe();
        // };
    }, [postId]);


    const postComment = (event) => {
        event.preventDefault();
        
        db.collection("posts").doc(postId).collection("commens").add({
            text: comment,
            username: username.displayName,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });
        setComment("");
    }

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

       <div className='post__comments'>
            {comments.map((comment) => (
                <p>
                    <b>{comment.username}</b> {comment.text}
                </p>
            ))}
       </div>

       <form className='post__commentBox'>
        <input
            className='post__input'
            type="text"
            placeholder='Add a comment...'
            value={comment}
            onchange={(e) => setComment(e.target.value)}
        
        />
        <button 
            disabled={!comment}
            className="post__button"
            type="submit"
            onClick={postComment}
        >
            Post
        </button>
       </form>
    </div>
 )
}
 
export default Post
