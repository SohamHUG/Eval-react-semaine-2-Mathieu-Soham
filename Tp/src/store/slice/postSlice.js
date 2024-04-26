import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { fetchComments } from "./commentSlice.js";
import { v4 as uuidv4 } from 'uuid';

export const fetchPosts = createAsyncThunk(
  'fetchPosts',
  async () => {
    const res = await axios.get('https://jsonplaceholder.typicode.com/posts');
    const posts = res.data.map(post => ({ ...post, comments: [] }));
    return posts;
  }
);

export const addPost = createAsyncThunk(
  'addPost',
  async ({ title, body, userId, author }) => {
    const res = await axios.post('https://jsonplaceholder.typicode.com/posts', {
      title,
      body,
      userId
    });
    return { ...res.data, author };
  }
);

export const addComment = createAsyncThunk(
  'addComment',
  async ({ postId, body }) => {
    const res = await axios.post(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`, {
      body
    });
    return res.data;
  }
);

export const updateCommentsLocally = (postId, comment) => (dispatch, getState) => {
  const existingPost = getState().posts.posts.find(post => post.id === postId);
  if (existingPost) {
    dispatch(addCommentLocally({ postId, comment }));
  }
};

const addCommentLocally = (state, action) => {
  const { postId, comment } = action.payload;
  const post = state.posts.find(post => post.id === postId);
  if (post) {
    post.comments.push(comment);
  }
};

const postSlice = createSlice({
  name: 'posts',
  initialState: {
    posts: [],
    loading: 'idle'
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPosts.pending, (state, action) => {
      state.loading = 'loading';
    });
    builder.addCase(fetchPosts.fulfilled, (state, action) => {
      state.posts = action.payload;
      state.loading = 'idle';
    });
    builder.addCase(fetchPosts.rejected, (state, action) => {
      state.loading = "error";
    });
    builder.addCase(addPost.fulfilled, (state, action) => {
      state.posts.push(action.payload);
    });
    builder.addCase(addComment.fulfilled, (state, action) => {
      const { postId, body } = action.payload;
      const post = state.posts.find((post) => post.id === postId);
      if (post) {
        post.comments.push({ body });
      }
    });
  }
});

export const selectPosts = state => state.posts.posts;
export const selectLoadingState = state => state.posts.loading;
export const selectPost = (postId) => (state) =>
  state.posts.posts.find((post) => post.id === parseInt(postId));

export default postSlice.reducer;