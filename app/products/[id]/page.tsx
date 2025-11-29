"use client";
import Categories from "@/app/homecomponents/categories";
import "./page.scss";
import { db } from "@/app/firebase/firebase.con";
import Product from "@/app/homecomponents/products";
import { useAppDispatch, useAppSelector } from "@/app/redux/hook";
import { fetchCategories } from "@/app/redux/slices/categories";
import {
  fetchOrders,
  fetchProducts,
  getProductByCategoryId,
  setCategoryId,
} from "@/app/redux/slices/products";
import { PreOrder } from "@/app/types";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { FaStar } from "react-icons/fa";
import { FiMinus, FiPlus } from "react-icons/fi";

const Page = () => {
  const { id } = useParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [product, setProduct] = useState<Product | undefined>(undefined);
  const [imageUrl, setImageurl] = useState<string>("");
  // const [orderss, setOrders] = useState<PreOrder[]>([]);
  const router = useRouter();
  const [stars, setStars] = useState<string[]>([]);
  const [quantity, setQuantity] = useState(1);
  const { categories } = useAppSelector((state) => state.categories);
  const { categoryId } = useAppSelector((state) => state.products);

  const fetchProduct = async () => {
    const querySnapshot = await getDocs(collection(db, "products"));
    const arr = querySnapshot.docs.map((c) => ({
      id: c.id,
      ...c.data(),
    })) as Product[];
    setProducts(arr);
    const life = products.find((c) => c.id === id);
    console.log(products);
    setProduct(life);
  };

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);
  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;
      const docRef = doc(db, "products", id as string);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        setProduct(docSnap.data() as Product);
        if (data.images && data.images.length > 0) {
          setImageurl(data.images[0]);
        }
        const rating = Math.floor(data.rating || 0);
        setStars(Array(rating).fill(0));
      }
    };
    fetchProduct();
  }, [id]);

  const handleOrder = (title: string) => {
    const filtered = products.find((c) => c.title === title);
    const storedOrders = localStorage.getItem("orders");
    const orders = storedOrders ? JSON.parse(storedOrders) : [];
    const existingIndex = orders.findIndex((o: any) => o.title === title);

    if (existingIndex !== -1) {
      if (quantity === 1) {
        orders[existingIndex].quantity = +1;
      } else {
        orders[existingIndex].quantity += quantity;
      }
    } else {
      if (quantity === 1) {
        orders.push({ ...product, quantity: 1 });
      } else {
        orders.push({ ...product, quantity: quantity });
      }
    }
    localStorage.setItem("orders", JSON.stringify(orders));
    dispatch(fetchOrders());
  };

  if (!product) {
    <p>Xatolik</p>;
    return;
  }
  // const [category, setCategoryId] = useState("all");


  const imagearray = product.images as unknown as string[];
  const calculate = () => {
    const life = (Number(product.price) * 100) / Number(product.discount);
    return 100 - Number(life.toString().slice(0, 2));
  };

  const handleminus = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const handleplus = () => {
    setQuantity((prev) => prev + 1);
  };

  const setCategoryId1 = (id: string) => {
    if (categoryId === id || id === "") {
      dispatch(setCategoryId(""));
      dispatch(fetchProducts());
    } else {
      dispatch(setCategoryId(id));
      dispatch(getProductByCategoryId(id));
    }
  };
  return (
    <div>
      <div className="life">
        <div>
          <Toaster position="top-right" reverseOrder={false} />
        </div>
        <div className="buttons overflow-x-auto gap-2">
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
              {c.name}
            </button>
          ))}
        </div>
        <div className="diivv">
          <img
            onClick={() => router.back()}
            className="image1"
            src="/arrow-left-02.svg"
            alt=""
          />
        </div>
        <div className="one-product">
          <div className="left-side">
            <div className="left-left-side">
              {imagearray.map((c, i) => (
                <div
                  key={i}
                  onClick={() => setImageurl(c)}
                  className={`${
                    imageUrl === c ? "image-wrapper line" : "image-wrapper"
                  }`}
                >
                  <img src={`${c}`} alt="" />
                </div>
              ))}
            </div>
            <div className="right-left-side">
              <img className="" src={`${imageUrl}`} alt="" />
            </div>
          </div>
          <div className="right-side">
            <div className="div">
              <h1>{product.title}</h1>
              <div className="second-child-right-side">
                <div className="flex gap-2 inside">
                  {stars.map((c, i) => (
                    <FaStar size={24} key={i} />
                  ))}
                </div>
                <p>{product.rating}/5</p>
              </div>
              <div className="third-child-right-side">
                <h3>${product.price}</h3>
                <span className="line-through">${product.discount}</span>
                <button>-{calculate()}%</button>
              </div>
              <h5>
                Tavsifnoma: <span>{product.description}</span>
              </h5>
            </div>
            <div className="fourth-child-right-side">
              <div className="left-fourth-child-right-side cursor-pointer">
                <div onClick={handleminus}>
                  <FiMinus size={25} />
                </div>
                <div>{quantity}</div>
                <div onClick={handleplus}>
                  <FiPlus size={25} />
                </div>
              </div>
              <button
                onClick={() => {
                  handleOrder(product.title),
                    toast.success("Siz mahsulotni muvaffaqiyatli qo'shdingiz");
                }}
                className="right-fourth-child-right-side cursor-pointer"
              >
                Add to cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
