"use client";

// import { Product } from "./all";
import Image from "next/image";
import "./products.scss";
import { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import Link from "next/link";
import toast, { Toaster } from "react-hot-toast";
// import { log } from "console";
type Product = {
  id?: string;
  title: string;
  description: string;
  price: string;
  discount: string;
  rating?: number;
  category: string;
  images?: string[];
};

interface initialProps {
  product: Product;
  setPreorder: (product: Product) => void;
}

const Product = ({ product, setPreorder }: initialProps) => {
  // console.log(product);
  const [stars, setStars] = useState<string[]>([]);
  const life = product.rating as unknown as number;
  // console.log(life);
  const Life = () => {
    const starCount = Math.floor(life);
    const newStars = Array(starCount).fill("");
    setStars(newStars);
  };

  useEffect(() => {
    Life();
  }, []);

  const calculate = () => {
    const life = (Number(product.price) * 100) / Number(product.discount);
    return 100 - Number(life.toString().slice(0, 2));
  };

  
  return (
    <div className="product">
      <div>
        <Toaster position="top-right" reverseOrder={false} />
      </div>
      <Link href={`/products/${product.id}`}>
        <div className="image-product">
          <img src={`${product.images![0]}`} width={200} height={200} alt="" />
        </div>
      </Link>
      <h1>{product.title}</h1>
      <div className="flex star-wrapper gap-2 items-center">
        <div className="flex gap-1">
          {stars.map((c, i) => (
            <FaStar key={i} />
          ))}
        </div>
        <p>{product.rating}/5</p>
      </div>
      <div className="bottom flex gap-2 items-center justify-between">
        <div className="flex gap-2 items-center">
          <p>${product.price}</p>
          {product.discount !== "" ? (
            <>
              <span className="line-through">${product.discount}</span>
              <button className="percent-button">-{calculate()}%</button>
            </>
          ) : (
            ""
          )}
        </div>
        <Image
          onClick={() => {setPreorder(product), toast.success("Siz mashsulotni muvaffaqiyatli qo'shdingiz")}}
          alt=""
          src={"/shopping-cart-add-02.svg"}
          width={25}
          height={100}
          className="cursor-pointer"
        />
      </div>
    </div>
  );
};

export default Product;
