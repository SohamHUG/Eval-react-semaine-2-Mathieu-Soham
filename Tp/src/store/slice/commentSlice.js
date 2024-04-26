import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { v4 as uuidv4 } from 'uuid';

export const fetchComments = createAsyncThunk(
  'fetchComments',
  async (postId) => {
    const res = await axios.get(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`);
    return res.data;
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

const commentSlice = createSlice({
  name: 'comments',
  initialState: {
    comments: [],
    loading: 'idle'
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchComments.pending, (state, action) => {
      state.loading = 'loading';
    });
    builder.addCase(fetchComments.fulfilled, (state, action) => {
      state.comments = action.payload;
      state.loading = 'idle';
    });
    builder.addCase(fetchComments.rejected, (state, action) => {
      state.loading = 'error';
    });
    builder.addCase(addComment.fulfilled, (state, action) => {
      state.comments.push(action.payload);
    });
  }
});

export const selectCommentsByPostId = (postId) => (state) =>
  state.comments.comments.filter((comment) => comment.postId === postId);

export default commentSlice.reducer;