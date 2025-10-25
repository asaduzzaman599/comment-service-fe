import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { User } from './auth-slice';
import api from '../lib/axios';
export interface Comment {
    _id: string
    comment: string
    user: User
    likeIds: string[]
    disLikeIds: string[]
}

interface CommentState {
  comments: Comment[];
  loading: boolean;
  error: string | null;
}

const initialState: CommentState = {
 comments: [],
  loading: false,
  error: null,
};
interface FetchCommentsArgs {
  limit?: number;
  page?: number;
}

export const fetchComments = createAsyncThunk(
  'comments/fetchComments',
  async ({limit, page}: FetchCommentsArgs) => {  
    let uri = `/comments`
    if(limit && page) uri = uri +`?page=${page}&limit=${limit}`
    const res = await api.get(uri);
  return res.data.data;
  }
);


const commentSlice = createSlice({
  name: 'comment',
  initialState,
  reducers: {
    addAllCommentsList: (state, action: PayloadAction<Comment[]>) => {
      state.comments = action.payload;
    },
    addComment: (state, action: PayloadAction<Comment>) => {
      state.comments = [...state.comments, action.payload];
    },
    removeComment: (state, action: PayloadAction<string>) => {
      state.comments = [...state.comments.filter(i=>i._id !== action.payload)];
    },
  },
   extraReducers: (builder) => {
    builder
      .addCase(fetchComments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.loading = false;
        state.comments = action.payload;
      })
      .addCase(fetchComments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch comments';
      });
  },
});

export const { addAllCommentsList, addComment, removeComment } = commentSlice.actions;
export default commentSlice.reducer;
