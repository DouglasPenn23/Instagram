import React , { useState, useEffect }from 'react';
import './App.css';
import Post from './Post';
import { auth, db } from  './firebase';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Input from '@mui/material/Input';
import Modal from '@mui/material/Modal';
import ImageUpload from './ImageUpload';
import InstagramEmbed from 'react-instagram-embed';


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
  const [openSignIn, setOpenSignIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        // user has logged in. 
        console.log(authUser);
        setUser(authUser);

      } else {
        // User has logged out
        setUser(null);
      }
    })

    return () => {
      // Perform some cleanup actions
      unsubscribe();
    }
  }, [user, username]);

  useEffect(() => {
    // Where the code actually runs
    // Conditions will go into []
    // onSnapshot is listener
    db.collection('posts').orderBy('timestamp', 'desc').onSnapshot(snapshot => {
      // Everytime a post is made this code will fire
      setPosts(snapshot.docs.map(doc => ({
        id: doc.id,
        post: doc.data()
      })));
    })
  }, []);
  
  const signUp = (event) => {
    event.preventDefault();
    auth
    .createUserWithEmailAndPassword(email, password)
    .then((authUser) => {
      return authUser.user.updateProfile({
        displayName: username
      })
    })
    .catch((error) => alert(error.message));

    setOpen(false);
  }

  const signIn = (event) => {
    event.preventDefault();
    
    auth
        .signInWithEmailAndPassword(email, password)
        // Always good practice to add a catch
        .catch((error) => alert(error.message))

    setOpenSignIn(false);
  }

  return (
   <div className="app">
    {/* Begins modal box */}
    <Modal
        open={open}
        // Everytime you click off the modal it will set it to false
        onClose={() => setOpen(false)}
      >
      <Box sx={style}>
        <form className='app__signup'>
          {/* Instagram logo */}
          <center>
              <img
                classname="app__headerImage"
                src="https://instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
                alt="Instagram logo"
              />
          </center>
          {/* Input Fields for Form */}
              <Input 
                placeholder="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <Input 
                placeholder="email"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Input 
                placeholder="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button type="submit" onClick={signUp}>Sign Up</Button>
        
          </form>
      </Box>
    </Modal>
    

    {/* Second Modal */}
    <Modal
        open={openSignIn}
        // Everytime you click off the modal it will set it to false
        onClose={() => setOpenSignIn(false)}
      >
      <Box sx={style}>
        <form className='app__signup'>
          {/* Instagram logo */}
          <center>
              <img
                classname="app__headerImage"
                src="https://instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
                alt="Instagram logo"
              />
          </center>
          {/* Input Fields for Form */}
              <Input 
                placeholder="email"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Input 
                placeholder="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button type="submit" onClick={signIn}>Sign In</Button>
        
          </form>
      </Box>
    </Modal>


      {/* Begins header */}
     <div className='app__header'>
       <img
       className="app__headerImage"
       src="https://instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
       alt="Instagram logo"
       />
      {user ? (
        <Button onClick={() => auth.signOut()}>Logout</Button>
    ): (
      <div className='app__loginContainer'>
        <Button onClick={() => setOpenSignIn(true)}>Sign In</Button>
        <Button onClick={() => setOpen(true)}>Sign Up</Button>
      </div>
    )}
     </div>

     <div className="app__posts">
      {
        posts.map(({id, post}) => (
          <Post key={id} username={post.username} caption={post.caption} imageUrl={post.imageUrl}/>
      ))
     }

     </div>

    
    

     <h1>Hello party people lets make Instagram with React</h1>

     
  {user?.displayName ? (
    <ImageUpload username= {user.displayName} />
  ):(
    <h3>Sorry you need to login to upload</h3>
  )} 
  
   </div>
 );
}
 
export default App;

