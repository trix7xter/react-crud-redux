import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import createBookWithId from '../../utils/createBookWithId';
import { setErrorMessage } from './errorSlice';

const initialState = {
  books: [],
  isLoadingViaApi: false,
};

export const fetchBook = createAsyncThunk(
  'books/fetchBook',
  async (url, thunkAPI) => {
    try {
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      thunkAPI.dispatch(setErrorMessage(error.message));
      throw thunkAPI.rejectWithValue(error);
      // option 2
      // throw new Error(error);
    }
  }
);

const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    addBook: (state, action) => {
      state.books.push(action.payload);
    },
    deleteBook: (state, action) => {
      return {
        ...state,
        books: state.books.filter((book) => book.id !== action.payload),
      };
    },
    toggleFavorite: (state, action) => {
      state.books.forEach((book) => {
        if (book.id === action.payload) {
          book.isFavorite = !book.isFavorite;
        }
      });
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchBook.fulfilled, (state, action) => {
      state.isLoadingViaApi = false;
      if (action.payload.title && action.payload.author) {
        state.books.push(createBookWithId(action.payload, 'API'));
      }
    });

    builder.addCase(fetchBook.pending, (state) => {
      state.isLoadingViaApi = true;
    });

    builder.addCase(fetchBook.rejected, (state) => {
      state.isLoadingViaApi = false;
    });
  },
});

export const { addBook, deleteBook, toggleFavorite } = booksSlice.actions;

export const selectBooks = (state) => state.books.books;

export const selectIsLoadingViaApi = (state) => state.books.isLoadingViaApi;

export default booksSlice.reducer;
