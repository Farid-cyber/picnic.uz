import { db } from "@/app/firebase/firebase.con";
import { PreOrder, Product } from "@/app/types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";

export type State = {
  products: Product[];
  isLoading: boolean;
  error: null | string;
  isEditingId: null | Product;
  categoryId: string;
  protitle: string;
  preorders: PreOrder[];
};
const initialState: State = {
  products: [],
  isLoading: true,
  error: null,
  isEditingId: null,
  categoryId: "",
  protitle: "",
  preorders: [],
};

const useReducer = createSlice({
  name: "products",
  initialState,
  reducers: {
    setEditingProduct: (state, action) => {
      state.isEditingId = action.payload;
    },
    setCategoryId: (state, action) => {
      state.categoryId = action.payload;
    },
    setProtitle: (state, action) => {
      state.protitle = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state) => {
        state.isLoading = false;
        state.error = "Failed";
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.products.push(action.payload);
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.products = state.products.filter((c) => c.id !== action.payload);
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.isEditingId = null;
        const index = state.products.findIndex(
          (c) => c.id === action.payload.id
        );
        if (index !== -1) {
          state.products[index] = action.payload;
        }
      })
      .addCase(getProductByCategoryId.fulfilled, (state, action) => {
        state.products = action.payload;
      })
      .addCase(getProductByTitle.fulfilled, (state, action) => {
        state.products = action.payload;
      })
      .addCase(orderProduct.fulfilled, (state, action) => {
        state.preorders.push(action.payload);
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.preorders = action.payload;
      })
      .addCase(fetchProductsAll.fulfilled, (state, action) => {
        state.products = action.payload;
      });
  },
});

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const snapshot = await getDocs(collection(db, "products"));
    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Product[];
    return data.slice(0, 8);
  }
);

export const fetchProductsAll = createAsyncThunk(
  "products/fetchProductsAll",
  async () => {
    const snapshot = await getDocs(collection(db, "products"));
    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Product[];
    return data;
  }
);

export const addProduct = createAsyncThunk(
  "products/addProduct",
  async (catObject: Omit<Product, "id">) => {
    try {
      await addDoc(collection(db, "products"), catObject);
      // Optionally re-fetch products or return newly added one
      return catObject;
    } catch (e) {
      console.error("Error adding document: ", e);
      throw e;
    }
  }
);

export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async (id: string) => {
    try {
      await deleteDoc(doc(db, "products", id));
      return id;
    } catch (e) {
      console.error("Error deleting document: ", e);
      throw e;
    }
  }
);

export const updateProduct = createAsyncThunk(
  "products/updateProduct",
  async ({ id, userObj }: { id: string; userObj: Omit<Product, "id"> }) => {
    try {
      const docRef = doc(db, "products", id);
      await updateDoc(docRef, userObj);
      return { id, ...userObj };
    } catch (e) {
      console.error("Error updating document: ", e);
      throw e;
    }
  }
);

export const getProductByCategoryId = createAsyncThunk(
  "products/getProductByCategoryId",
  async (categoryId: string) => {
    try {
      let q;

      if (categoryId === "") {
        // If no category is selected → get all products
        q = collection(db, "products");
      } else {
        // Get only products that match the categoryId
        q = query(
          collection(db, "products"),
          where("category", "==", categoryId)
        );
      }

      const snapshot = await getDocs(q);
      const products = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Product[];

      return products;
    } catch (e) {
      console.error("Error fetching products by category ID: ", e);
      throw e;
    }
  }
);

export const getProductByTitle = createAsyncThunk(
  "products/getProductByTitle",
  async (protitle: string) => {
    try {
      const snapshot = await getDocs(collection(db, "products"));
      const allProducts = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Product[];

      if (protitle.trim() === "") return allProducts;

      const filtered = allProducts.filter((p) =>
        p.title.toUpperCase().includes(protitle.toUpperCase())
      );

      return filtered;
    } catch (e) {
      console.error("Error fetching products by title:", e);
      throw e;
    }
  }
);

export const fetchOrders = createAsyncThunk(
  "products/fetchOrders",
  async () => {
    const preorders = JSON.parse(localStorage.getItem("orders") || "[]");
    return preorders;
  }
);

export const orderProduct = createAsyncThunk(
  "products/orderProduct",
  async (id: string) => {
    try {
      const snapshot = await getDocs(collection(db, "products"));
      const allProducts = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Product[];
      const filtered = allProducts.find((p) => p.id === id);
      if (!filtered) throw new Error("Product not found");
      const storedOrders = localStorage.getItem("orders");
      const orders = storedOrders ? JSON.parse(storedOrders) : [];
      const existingIndex = orders.findIndex((o: any) => o.id === id);
      if (existingIndex !== -1) {
        orders[existingIndex].quantity += 1;
      } else {
        orders.push({ ...filtered, quantity: 1 });
      }
      localStorage.setItem("orders", JSON.stringify(orders));
      return orders;
    } catch (e) {
      console.error("Error fetching products by title:", e);
      throw e;
    }
  }
);

export default useReducer.reducer;

export const { setEditingProduct, setCategoryId, setProtitle } =
  useReducer.actions;
