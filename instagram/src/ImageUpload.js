import React, { useState } from 'react'
import Button from '@mui/material/Button';
import { storage, db } from "./firebase";
// import firebase from "firebase";
import firebase from 'firebase/compat/app';
import './ImageUpload.css';

function ImageUpload({username}) {
    const [image, setImage] = useState(null);
    // const [url, setUrl] = useState('')
    const [progress, setProgress] = useState(0);
    const [caption, setCaption] = useState('');

    const handleChange = (e) => {
        if (e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    };

    const handleUpload = () => {
        const uploadTask = storage.ref(`images/${image.name}`).put(image);
        uploadTask.on(
            "state_changed",
            (snapshot) => {
                // Progress function
                // Provides the visuals
                const progress = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
                setProgress(progress);
            },
            (error) => {
                // Error Function
                console.log(error);
                alert(error.message);
            },
            () => {
                // Completes the function
                storage
                    .ref("images")
                    .child(image.name)
                    .getDownloadURL()
                    .then(url => {
                        // Post image inside db
                        db.collection("posts").add({
                            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                            caption: caption,
                            imageUrl: url,
                            username: username
                        });

                        setProgress(0);
                        setCaption("");
                        setImage(null);
                    });
            }

        )
    }

  return (
    <div className='imageUpload'> 
    <progress
    className='imageUpload' 
    value={progress} 
    max="100" 
    />

    <input type= "text" 
    placeholder= 'Enter a caption.'
    onChange= {event => setCaption(event.target.value)} 
    value= {caption}
    />

    <input 
    type="file" 
    onChange={handleChange} 
    />
    
    <Button 
    onClick={handleUpload}
    >
    Upload
    </Button>
    </div>
  )
}

export default ImageUpload
