"use client";

import { useEffect, useState } from "react";
import Categories from "./categories";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebase.con";
import Product from "./products";
import { useAppDispatch, useAppSelector } from "../redux/hook";
import {
  fetchProducts,
  fetchProductsAll,
  orderProduct,
} from "../redux/slices/products";
import "./all.scss";
import { PreOrder } from "../types";

// type product = {
//   id?: string;
//   title: string;
//   description: string;
//   price: string;
//   discount: string;
//   rating?: number;
//   category: string;
//   images?: [];
// };
const All = () => {
  const [preorders, setPreorders] = useState<PreOrder[]>([]);
  // const [products, setProducts] = useState<product[]>([]);
  const [category, setCategoryId] = useState("all");
  const { products } = useAppSelector((state) => state.products);
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);
  // const dispatch = useAppDispatch();

  const showAllpros = (value: string) => {
    if (value === "all") {
      setOpen(true);
      dispatch(fetchProductsAll());
    } else {
      dispatch(fetchProducts());
      setOpen(false);
    }
  };

  // const fetchProducts = async () => {
  //   if (category === "all") {
  //     const querySnapshot = await getDocs(collection(db, "products"));
  //     const arr = querySnapshot.docs.map((c) => ({
  //       id: c.id,
  //       ...c.data(),
  //     })) as product[];
  //     setProducts(arr);
  //   } else {
  //     const querySnapshot = await getDocs(collection(db, "products", category));
  //     const arr = querySnapshot.docs.map((c) => ({
  //       id: c.id,
  //       ...c.data(),
  //     })) as product[];
  //     setProducts(arr);
  //   }
  // };

  const setOrders = (product: Product) => {
    dispatch(orderProduct(product.id!));
  };
  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  return (
    <div className="w-full pb-[40px]">
      <Categories category={category} setCategory={setCategoryId} />
      <div className="products-wrapper mt-3 flex flex-wrap justify-center mx-auto products-wrapper">
        {products.map((c) => (
          <Product setPreorder={setOrders} key={c.id} product={c} />
        ))}
      </div>
      {open ? (
        <button className="button-quan cursor-pointer" onClick={() => showAllpros("less")}>show less</button>
      ) : (
        <button className="button-quan cursor-pointer" onClick={() => showAllpros("all")}>show all</button>
      )}
    </div>
  );
};

export default All;
