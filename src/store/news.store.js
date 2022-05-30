import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../api";
import { PAGE_SIZE } from "../constants";
import { sliceIntoChunks } from "../utils";

const initialState = {
  topStories: [],
  article: {},
  selectedCategory: "world",
  comments: [],
  searchResults: [],
  isLoading: false,
  error: null,
};

export const listTopStories = createAsyncThunk(
  "top-stories/list",
  async (category, thunkAPI) => {
    try {
      const response = await api.news.listTopStories(category);

      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const listComments = createAsyncThunk(
  "comments/list",
  async (url, thunkAPI) => {
    try {
      const response = await api.news.listComments(url);

      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const searchResults = createAsyncThunk(
  "search",
  async (keyword, thunkAPI) => {
    try {
      const response = await api.news.searchResults(keyword);

      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const newsSlice = createSlice({
  name: "news",
  initialState,

  reducers: {
    clearError: (state) => {
      state.error = undefined;
    },
    setArticle: (state, action) => {
      state.article = action?.payload;
    },
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action?.payload;
    },
    clearSearchReasults: (state) => {
      state.searchResults = [];
    },
    clearTopStories: (state) => {
        state.topStories = [];
      },
  },

  extraReducers: {
    [listTopStories.pending.toString()]: (state, action) => {
      state.isLoading = true;
    },
    [listTopStories.rejected.toString()]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload?.response?.data?.message;
    },
    [listTopStories.fulfilled.toString()]: (state, action) => {
      // set the token at the headers)
      state.isLoading = false;
      state.topStories = action.payload?.data?.results;
    },

    [listComments.pending.toString()]: (state, action) => {
      state.isLoading = true;
    },
    [listComments.rejected.toString()]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload?.response?.data?.message;
    },
    [listComments.fulfilled.toString()]: (state, action) => {
      // set the token at the headers)
      state.isLoading = false;
      state.comments = action.payload?.data?.results;
    },

    [searchResults.pending.toString()]: (state, action) => {
      state.isLoading = true;
    },
    [searchResults.rejected.toString()]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload?.response?.data?.message;
    },
    [searchResults.fulfilled.toString()]: (state, action) => {
      // set the token at the headers)
      state.isLoading = false;
      const tempSearchResults = action.payload?.data?.response?.docs?.length > PAGE_SIZE
        ? sliceIntoChunks(action.payload?.data?.response?.docs, PAGE_SIZE) : action.payload?.data?.response?.docs
      state.searchResults = tempSearchResults;
    },
  },
});

export const {
  clearError,
  setArticle,
  setSelectedCategory,
  clearSearchReasults,
  clearTopStories
} = newsSlice.actions;

export default newsSlice.reducer;
