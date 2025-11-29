import { useEffect, useState } from "react";
import "./categories.scss";
// import { collection, getDocs } from "firebase/firestore";
// import { db } from "../firebase/firebase.con";
import { useAppDispatch, useAppSelector } from "../redux/hook";
import { fetchCategories } from "../redux/slices/categories";
import { fetchProducts, getProductByCategoryId, setCategoryId } from "../redux/slices/products";


type InitialProps = {
  category: string;
  setCategory: (value: string) => void;
};

const Categories = ({ category, setCategory }: InitialProps) => {
  const { categories } = useAppSelector((state) => state.categories);
  const { categoryId } = useAppSelector((state) => state.products);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const setCategoryId1= (id: string) => {
    if (categoryId === id || id === "") {
      dispatch(setCategoryId(""));
      dispatch(fetchProducts());
    } else {
      dispatch(setCategoryId(id));
      dispatch(getProductByCategoryId(id));
    }
  };

  // console.log(categoryId);

  return (
    <div className="categories">
      <h1>Kategoriya va Mahsulotlar</h1>
      <div className="buttons overflow-x-auto flex gap-2">
        <button
          onClick={() => setCategoryId1("")}
          className={`${categoryId === "" ? "button2" : "button"}`}
        >
          All
        </button>
        {categories.map((c) => (
          <button
            onClick={() => setCategoryId1(`${c.id}`)}
            key={c.id}
            className={`${categoryId === c.id ? "button2" : "button"}`}
          >
            {c.name.slice(0, 1).toUpperCase()}{c.name.slice(1)}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Categories;
