import React , { useState, useEffect }from 'react';
import './App.css';
import Post from './Post';
import { db } from  './firebase';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { ClassNames } from '@emotion/react';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

function App() {
  // This is an example of a hook
  const [posts, setPosts] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // Where the code actually runs
    // Conditions will go into []
    // onSnapshot is listener
    db.collection('posts').onSnapshot(snapshot => {
      // Everytime a post is made this code will fire
      setPosts(snapshot.docs.map(doc => ({
        id: doc.id,
        post: doc.data()
      })));
    })
  }, []);
 

  return (
   <div className="app">
    {/* Begins modal box */}
    <Modal
        open={open}
        // Everytime you click off the modal it will set it to false
        onClose={() => setOpen(false)}
      >
      <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Text in a modal
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography>
      </Box>
    </Modal>
 
    
      {/* Begins header */}
     <div className='app__header'>
       <img
       className="app__headerImage"
       src="https://instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
       alt="Instagram logo"
       >
       </img>
     </div>
      <Button onClick={() => setOpen(true)}>Sign Up</Button>

     <h1>Hello party people lets make Instagram with React</h1>

     {
      posts.map(({id, post}) => (
        <Post key={id} username={post.username} caption={post.caption} imageUrl={post.imageUrl}/>
      ))
     }
  
   </div>
 );
}
 
export default App;

