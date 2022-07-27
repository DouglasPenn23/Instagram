import React , { useState, useEffect }from 'react';
import './App.css';
import Post from './Post';
import { db } from  './firebase';
function App() {
  // This is an example of a hook
  const [posts, setPosts] = useState([
    // {
    //   username: "NatGeo",
    //   caption: "Wow this is so cool!",
    //   imageUrl: "https://th.bing.com/th/id/R.681c821a5852beef6040d5d44523b509?rik=Lk4BpeAkSyG%2ftg&riu=http%3a%2f%2fwww.pixelstalk.net%2fwp-content%2fuploads%2f2016%2f11%2fBeautiful-Cow-1920x1080.jpg&ehk=mLQ4vr%2fD0eotkUKnrJ4qmXInS8jWj2jLxFcJ6pjqbvg%3d&risl=&pid=ImgRaw&r=0",
    // },
    // {
    //   username: "SahirahB",
    //   caption: "Wow, Doug is such a good programmer!",
    //   imageUrl: "https://cdn.wallpapersafari.com/89/83/bHCVpt.jpg",
    // },
    // {
    //   username: "GarrettC",
    //   caption: "Wow, I can't believe I'm really on Instagram!",
    //   imageUrl: "https://th.bing.com/th/id/R.510ac3a6ab3593e25d43b42d7e479759?rik=3Qb0%2bcHCzm6eTQ&riu=http%3a%2f%2fwallsdesk.com%2fwp-content%2fuploads%2f2017%2f01%2fCow-Wallpapers-HD.jpg&ehk=WtX%2bLYYi5Dixd30C0OoOpd2vxU3cNFNzfNJYE2e8%2fTc%3d&risl=&pid=ImgRaw&r=0",
    // }
  ]);

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
   <div className="App">
    
 
     {/* Header */}
 
     <div className='app__header'>
       <img
       className="app__headerImage"
       src="https://instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
       alt="Instagram logo"
       >
       </img>
     </div>
 
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

