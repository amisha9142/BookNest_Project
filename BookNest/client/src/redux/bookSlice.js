import { createSlice , createAsyncThunk } from "@reduxjs/toolkit";
import {
  createBook,
  getBooks,
  updateBook as updateBookApi,
  deleteBook as deleteBookApi,
} from "./api/bookApi"; 

// Thunk for fetching stocks
// export const fetchBooksThunk = createAsyncThunk(
//   "books/fetchBooks",
//   async (sortBy, { rejectWithValue }) => {
//     try {
//       const response = await getBooks(sortBy);
//       return response.data; 
//     } catch (error) {
//       return rejectWithValue(error.response.data); 
//     }
//   }
// );

export const fetchBooksThunk = createAsyncThunk(
  "books/fetchBooks",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getBooks();
      console.log("Fetched Books:", response); // Check the format of the response
      return response; 
    } catch (error) {
      console.error("Error fetching books:", error); // Debugging error
      return rejectWithValue(error.response.data);
    }
  }
);


// Thunk for adding a stock
export const addBookThunk = createAsyncThunk(
  "books/addBook",
  async (bookData, { rejectWithValue }) => {
    try {
      const response = await createBook(bookData);
      return response.data; 
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateBookThunk = createAsyncThunk(
  "books/updateBook",
  async ({ bookId, bookData }, { rejectWithValue }) => {
    try {
      const response = await updateBookApi(bookId, bookData);
      return { bookId, updatedBook: response.data };
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Thunk for deleting a stock
export const deleteBookThunk = createAsyncThunk(
  "books/deleteBook",
  async (bookId, { rejectWithValue }) => {
    try {
      await deleteBookApi(bookId);
      return bookId; 
    } catch (error) {
      return rejectWithValue(error.response.data); 
    }
  }
);
const bookSlice = createSlice({
  name: "books",
  initialState: {
    books: [],
    status: "idle",
    error: null,
  },
  reducers: {
    resetBooks: (state) => {
      state.books = []; 
      state.error = null; 
    },
  },
  extraReducers: (builder) => {
    builder
    .addCase(fetchBooksThunk.pending, (state) => {
      state.status = "loading";
      state.error = null;
    })
    // .addCase(fetchBooksThunk.fulfilled, (state, action) => {
    //   state.status = "succeeded";
    //   state.books = action.payload; 
    // })
    .addCase(fetchBooksThunk.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.books = action.payload.data; // This should match the response structure
    })
    
    .addCase(fetchBooksThunk.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    })
  
      .addCase(addBookThunk.pending, (state) => {
        state.status = "loading"; 
        state.error = null; 
      })
      // .addCase(addBookThunk.fulfilled, (state, action) => {
      //   state.books.push(action.payload); 
      // })

      .addCase(addBookThunk.fulfilled, (state, action) => {
        if (Array.isArray(state.books)) {
          state.books.push(action.payload);
        } else {
          console.error("Expected state.books to be an array but found:", state.books);
          state.books = [action.payload]; // Ensure books is always an array
        }
      })
      .addCase(addBookThunk.rejected, (state, action) => {
        state.error = action.payload.error; 
      })
      .addCase(updateBookThunk.pending, (state) => {
        state.status = "loading"; 
        state.error = null; 
      })
      .addCase(updateBookThunk.fulfilled, (state, action) => {
        const { bookId, updatedBook } = action.payload;
        const bookIndex = state.books.findIndex((book) => book._id === bookId); 
        if (bookIndex !== -1) {
          state.books[bookIndex] = {
            ...state.books[bookIndex],
            ...updatedBook,
          }; 
        }
      })
      .addCase(updateBookThunk.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(deleteBookThunk.pending, (state) => {
        state.status = "loading"; 
        state.error = null; 
      })
      .addCase(deleteBookThunk.fulfilled, (state, action) => {
        const bookId = action.payload;
        state.books = state.books.filter((book) => book._id !== bookId);
      })
      .addCase(deleteBookThunk.rejected, (state, action) => {
        state.error = action.payload; 
      });
  },
});

export const { resetBooks } = bookSlice.actions;

export default bookSlice.reducer;
