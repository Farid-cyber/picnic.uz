import { db } from "@/app/firebase/firebase.con";
import { Category } from "@/app/types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
// const BASE_API_URL = "http://localhost:8000/categories";

// import { type Category } from "../types";

export type State = {
  categories: Category[];
  isLoading: boolean;
  error: null | string;
  isEditingId: null | Category;
};
const initialState: State = {
  categories: [],
  isLoading: true,
  error: null,
  isEditingId: null,
};

const useReducer = createSlice({
  name: "categories",
  initialState,
  reducers: {
    setEditingCat: (state, action) => {
      state.isEditingId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.isLoading = false;
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state) => {
        state.isLoading = false;
        state.error = "Failed";
      })
      .addCase(addCategory.fulfilled, (state, action) => {
        state.categories.push(action.payload);
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.categories = state.categories.filter(
          (c) => c.id !== action.payload
        );
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        state.isEditingId = null;
        const index = state.categories.findIndex(
          (c) => c.id === action.payload.id
        );
        if (index !== -1) {
          state.categories[index] = action.payload;
        }
      });
  },
});

export const fetchCategories = createAsyncThunk(
  "categories/fetchCategories",
  async () => {
    const snapshot = await getDocs(collection(db, "categories"));
    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Category[];
    return data;
  }
);

export const addCategory = createAsyncThunk(
  "categories/addCategory",
  async (catObject: Omit<Category, "id">) => {
    try {
      await addDoc(collection(db, "categories"), catObject);
      // Optionally re-fetch categories or return newly added one
      return catObject;
    } catch (e) {
      console.error("Error adding document: ", e);
      throw e;
    }
  }
);

export const deleteCategory = createAsyncThunk(
  "categories/deleteCategory",
  async (id: string) => {
    try {
      await deleteDoc(doc(db, "categories", id));
      return id;
    } catch (e) {
      console.error("Error deleting document: ", e);
      throw e;
    }
  }
);

export const updateCategory = createAsyncThunk(
  "categories/updateCategory",
  async ({ id, userObj }: { id: string; userObj: Omit<Category, "id"> }) => {
    try {
      const docRef = doc(db, "categories", id);
      await updateDoc(docRef, userObj);
      return { id, ...userObj };
    } catch (e) {
      console.error("Error updating document: ", e);
      throw e;
    }
  }
);

export default useReducer.reducer;

export const { setEditingCat } = useReducer.actions;
