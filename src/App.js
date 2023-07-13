import { useState,useEffect } from 'react';
import { Routes, Route,useNavigate } from 'react-router-dom'
import Header from './Header';
import Nav from './Nav';
import Home from './Home';
import Footer from './Footer';
import NewPost from './NewPost';
import PostPage from './PostPage';
import About from './About';
import Missing from './Missing';
import {format} from 'date-fns'
function App() {
  const [posts, setPosts] = useState([
    {
      id: 1,
      title: "My First Post",
      datetime: "July 01, 2021 11:17:36 AM",
      body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis consequatur expedita, assumenda similique non optio! Modi nesciunt excepturi corrupti atque blanditiis quo nobis, non optio quae possimus illum exercitationem ipsa!"
    },
    {
      id: 2,
      title: "My 2nd Post",
      datetime: "July 01, 2021 11:17:36 AM",
      body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis consequatur expedita, assumenda similique non optio! Modi nesciunt excepturi corrupti atque blanditiis quo nobis, non optio quae possimus illum exercitationem ipsa!"
    },
    {
      id: 3,
      title: "My 3rd Post",
      datetime: "July 01, 2021 11:17:36 AM",
      body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis consequatur expedita, assumenda similique non optio! Modi nesciunt excepturi corrupti atque blanditiis quo nobis, non optio quae possimus illum exercitationem ipsa!"
    },
    {
      id: 4,
      title: "My Fourth Post",
      datetime: "July 01, 2021 11:17:36 AM",
      body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis consequatur expedita, assumenda similique non optio! Modi nesciunt excepturi corrupti atque blanditiis quo nobis, non optio quae possimus illum exercitationem ipsa!"
    }
  ])
  const navigate =useNavigate();
  const [search, setSearch] = useState('');
  const [postTitle,setPostTitle]=useState('');
  const [postBody,setPostBody]=useState('');
  const [searchResults,setSearchResults]=useState([]);
  useEffect(()=>{
const filteredResults=posts.filter(post=>(
  ((post.body).toLowerCase()).includes(search.toLocaleLowerCase())
  || ((post.title).toLowerCase()).includes(search.toLocaleLowerCase())
));
setSearchResults(filteredResults.reverse());
  },[posts,search])
  const handleSubmit=(e)=>{
    e.preventDefault()
    const id=posts.length ? posts[posts.length-1].d +1 :1;
    const datetime=format(new Date (), 'MMMM dd,yyyy pp');
    const newPost={id,title:postTitle,datetime,body:postBody};
    const allPosts=[...posts,newPost];
    setPosts(allPosts);
    setPostTitle('');
    setPostBody('');
    navigate('/');
      }
  const handleDelete=(id)=>{
    const postsList=posts.filter(post=>post.id!==id);
  setPosts(postsList);
  navigate('/');
   }
  return (
    <div className="App">
    <Header title="React JS Blog"/>
    <Nav search={search} setSearch={setSearch}/>
    <Routes>
      <Route exact  path="/" element={<Home posts={searchResults} />}/>
      <Route exact path='/post' element={<NewPost postTitle={postTitle} setPostTitle={setPostTitle} handleSubmit={handleSubmit}  postBody={postBody} setPostBody={setPostBody}/>}></Route>
        <Route path="/post/:id" element={<PostPage posts={posts} handleDelete={handleDelete}/>}></Route>
        <Route path="/about" element={<About/>}/>
        <Route path="*" element={<Missing/> } />
    </Routes>
    <Footer/>
    </div>
  );
}

export default App;
