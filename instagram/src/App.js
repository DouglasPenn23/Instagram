import './App.css';
import Post from './Post';
 
function App() {
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
     <Post 
     username="NatGeo"
     caption="Wow this is so cool!"
     imageUrl="https://th.bing.com/th/id/R.510ac3a6ab3593e25d43b42d7e479759?rik=3Qb0%2bcHCzm6eTQ&riu=http%3a%2f%2fwallsdesk.com%2fwp-content%2fuploads%2f2017%2f01%2fCow-Wallpapers-HD.jpg&ehk=WtX%2bLYYi5Dixd30C0OoOpd2vxU3cNFNzfNJYE2e8%2fTc%3d&risl=&pid=ImgRaw&r=0"
     
     />
     <Post />
     <Post />
    {/* Posts */}
    {/* Posts */}
     
   </div>
 );
}
 
export default App;

