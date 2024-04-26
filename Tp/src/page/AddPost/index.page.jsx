// path : toolkit/src/page/AddTask/index.page.jsx

import { useState } from "react";
import { useDispatch } from "react-redux";
import { addPost } from "../../store/slice/postSlice.js";

const AddPostPage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const dispatch = useDispatch();

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const handleAuthorChange = (e) => {
    setAuthor(e.target.value);
  };

  const handleSubmit = () => {
    dispatch(addPost({ title, body: content, userId: 1, author }));
    setTitle("");
    setContent("");
    setAuthor("");
  };

  return (
    <div className={"page"}>
      <h2>Add New Post</h2>
      <div>
        <label>Title:</label>
        <input type="text" value={title} onChange={handleTitleChange} />
      </div>
      <div>
        <label>Content:</label>
        <textarea value={content} onChange={handleContentChange} />
      </div>
      <div>
        <label>Author:</label>
        <input type="text" value={author} onChange={handleAuthorChange} />
      </div>
      <button onClick={handleSubmit}>Add Post</button>
    </div>
  );
};

export default AddPostPage;