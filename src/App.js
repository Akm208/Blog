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
import {format} from 'date-fns';
import api from './api/posts'
import EditPost from './EditPost';
import useWindowSize from './hooks/useWindowSize';
import useAxiosFetch from './hooks/useAxiosFetch';
function App() {
  const [posts, setPosts] = useState([])
  const navigate =useNavigate();
  const [search, setSearch] = useState('');
  const [postTitle,setPostTitle]=useState('');
  const [postBody,setPostBody]=useState('');
  const [editTitle,setEditTitle]=useState('');
  const [editBody,setEditBody]=useState('');
  const [searchResults,setSearchResults]=useState([]);
  const {width}=useWindowSize();
  const { data, fetchError, isLoading } = useAxiosFetch('http://localhost:3500/posts');

  useEffect(() => {
    setPosts(data);
  }, [data])
  // useEffect(()=>{
  //   const fetchPosts=async ()=>{
  //     try {
  //       const response=await  api.get('/posts');
  //       setPosts(response.data)

  //     } catch (err) {
  //       if(err.response){
  //       console.log(err.response.data);
  //       console.log(err.response.status);
  //       console.log(err.response.headers);
  //     }else{
  //       console.log(`Error: ${err.message}`);
  //     }
  //     }
  //   }
  //   fetchPosts();
  // },[])
  useEffect(()=>{
const filteredResults=posts.filter(post=>(
  ((post.body).toLowerCase()).includes(search.toLocaleLowerCase())
  || ((post.title).toLowerCase()).includes(search.toLocaleLowerCase())
));
setSearchResults(filteredResults.reverse());
  },[posts,search])
  const handleSubmit=async (e)=>{
    e.preventDefault()
    const id=posts.length ? posts[posts.length-1].d +1 :1;
    const datetime=format(new Date (), 'MMMM dd,yyyy pp');
    const newPost={id,title:postTitle,datetime,body:postBody};
    try {
      const response=await api.post('/posts',newPost)
      const allPosts=[...posts,response.data];
    setPosts(allPosts);
    setPostTitle('');
    setPostBody('');
    navigate('/');
    } catch (error) {
      console.log(`Error: ${error.message}`);
    }
    
      }
      const handleEdit = async (id) => {
        const datetime = format(new Date(), 'MMMM dd, yyyy pp');
        const updatedPost = { id, title: editTitle, datetime, body: editBody };
        try {
          const response = await api.put(`/posts/${id}`, updatedPost);
          setPosts(posts.map(post => post.id === id ? { ...response.data } : post));
          setEditTitle('');
          setEditBody('');
          navigate('/');
        } catch (err) {
          console.log(`Error: ${err.message}`);
        }
      }
  const handleDelete=async (id)=>{
    try {
      await api.delete(`/posts/${id}`)
      const postsList=posts.filter(post=>post.id!==id);
      setPosts(postsList);
      navigate('/');
    } catch (error) {
      console.log(`Error: ${error.message}`);
    }
   
   }
  return (
    <div className="App">
    <Header title="React JS Blog" width={width}/>
    <Nav search={search} setSearch={setSearch}/>
    <Routes>
      <Route exact  path="/" element={<Home posts={searchResults} fetchError={fetchError} isLoading={isLoading} />}/>
      <Route exact path='/post' element={<NewPost postTitle={postTitle} setPostTitle={setPostTitle} handleSubmit={handleSubmit}  postBody={postBody} setPostBody={setPostBody}/>}></Route>
      <Route path='/edit/:id' element={<EditPost posts={posts} handleEdit={handleEdit} editTitle={editTitle} setEditTitle={setEditTitle} editBody={editBody} setEditBody={setEditBody}/>}/>
        <Route path="/post/:id" element={<PostPage posts={posts} handleDelete={handleDelete}/>}></Route>
        <Route path="/about" element={<About/>}/>
        <Route path="*" element={<Missing/> } />
    </Routes>
    <Footer/>
    </div>
  );
}

export default App;
