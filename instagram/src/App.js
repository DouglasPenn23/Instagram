import React , { useState, useEffect }from 'react';
import './App.css';
import Post from './Post';
import { auth, db } from  './firebase';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Input from '@mui/material/Input';
import Modal from '@mui/material/Modal';
import ImageUpload from './ImageUpload';



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
      <div classname="app__postsLeft">
          {
            posts.map(({id, post}) => (
              <Post key={id} postId={id} user={user} username={post.username} caption={post.caption} imageUrl={post.imageUrl}/>
          ))
        }
      </div>

      <div className="app__postsRight">
        {/* This area would have the instagram-embed if it was live */}
        <Post 
            username="AnimalFacts"
            caption="Domestic cows are one of the most common farm animals around the world, and the English language has several words 
            to describe these animals at various ages. A baby cow is called a calf. A female calf is sometimes called a heifer calf and 
            a male a bull calf. A heifer is a female that has not had any offspring. The term usually refers to immature females; 
            after giving birth to her first calf, however, a heifer becomes a cow. An adult male is known as a bull. 
            Many male cattle are castrated to reduce their aggressive tendencies and make them more tractable. 
            Young neutered males, which are primarily raised for beef, are called steers or bullocks, 
            whereas adult neutered males, which are usually used for draft purposes, are known as oxen. 
            A group of cows, cattle, or kine (an archaic term for more than one cow) constitutes a herd. 
            English lacks a gender-neutral singular form, and so “cow” is used for both female individuals and all domestic bovines.
            "
            imageUrl="https://th.bing.com/th/id/R.510ac3a6ab3593e25d43b42d7e479759?rik=3Qb0%2bcHCzm6eTQ&riu=http%3a%2f%2fwallsdesk.com%2fwp-content%2fuploads%2f2017%2f01%2fCow-Wallpapers-HD.jpg&ehk=WtX%2bLYYi5Dixd30C0OoOpd2vxU3cNFNzfNJYE2e8%2fTc%3d&risl=&pid=ImgRaw&r=0"

        />
      </div>
      

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

