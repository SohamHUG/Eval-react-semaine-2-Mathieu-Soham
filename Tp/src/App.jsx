import './App.css';
import { Route, Routes } from "react-router-dom";
import MainTemplate from "./component/template/MainTemplate/index.jsx";
import HomePage from "./page/Home/index.page.jsx";
import AddPostPage from "./page/AddPost/index.page.jsx"; // Correction du nom du composant
import PostDetailPage from "./page/PostDetail/index.page.jsx";
import { useEffect } from "react";
import { fetchPosts } from "./store/slice/postSlice.js";
import { useDispatch } from "react-redux";

function App() {
  // const dispatch = useDispatch();
  
  // useEffect(() => {
  //   dispatch(fetchPosts());
  // }, [dispatch]);
  
  return (
    <Routes>
      <Route element={<MainTemplate />}>
        <Route path={'/'} element={<HomePage />} />
        <Route path={'/addPost'} element={<AddPostPage />} /> {/* Correction du nom du composant */}
        <Route path={'/post/:postId'} element={<PostDetailPage />} />
        
        <Route path={'*'} element={<div>Oups, you seem lost</div>} />
      </Route>
    </Routes>
  );
}

export default App;