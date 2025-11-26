"use client";
import Image from "next/image";
// import "tailwindcss";
import "./header.scss";
import { FiShoppingCart } from "react-icons/fi";
import { IoMdSearch } from "react-icons/io";
import { MdOutlineMenu } from "react-icons/md";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "../redux/hook";
import {
  setProtitle,
  getProductByTitle,
  fetchOrders,
} from "../redux/slices/products";
import { usePathname, useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase.auth/firbase.cons.auth";
import { PreOrder } from "../types";
import { FaStar } from "react-icons/fa";

type InitialProps = {
  sidebar: boolean;
  setSide: (value: boolean) => void;
};

export default function Header({ setSide, sidebar }: InitialProps) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [selected, setSelected] = useState("/");
  const { protitle } = useAppSelector((state) => state.products);
  const path = usePathname();
  const [admin, setAdmin] = useState(false);
  const [orders, setOrders] = useState<PreOrder[]>([]);

  useEffect(() => {
    dispatch(getProductByTitle(protitle));
  }, [protitle, dispatch]);

  const check = () => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        if (user.email == "farid@gmail.com") {
          setAdmin(true);
        }
        if (!user.uid || user.uid === "") {
          router.push("/registration");
          setAdmin(false);
        }
      } else {
        setAdmin(false);
      }
    });
  };

  const fetch = () => {
    const change = JSON.parse(localStorage.getItem("orders") || "[]");
    setOrders(change);
  };

  useEffect(() => {
    fetch();
  }, []);

  useEffect(() => {
    check();
    dispatch(fetchOrders());
  }, [admin]);

  // console.log(preorders);

  return (
    <div className="header">
      <Link href={"/"}>
        <Image src={"/logo.svg"} width={60} height={60} alt="nimadir" />
      </Link>
      <div className="middle-child-header cursor-pointer">
        <div>
          <Link onClick={() => setSelected("/")} href={"/"}>
            <p className={`${path === "/" ? `colorcha` : ""}`}>Bosh sahifa</p>
          </Link>
          <Link
            onClick={() => setSelected("/mahsulotlar")}
            href={"/mahsulotlar"}
          >
            <p className={`${path === "/mahsulotlar" ? "colorcha" : ""}`}>
              Mahsulotlar
            </p>
          </Link>
          <Link onClick={() => setSelected("/aloqa")} href={"/aloqa"}>
            <p className={`${path === "/aloqa" ? "colorcha" : ""}`}>Aloqa</p>
          </Link>
          <Link onClick={() => setSelected("/blog")} href={"/blog"}>
            <p className={`${path === "/blog" ? "colorcha" : ""}`}>Blog</p>
          </Link>
        </div>
      </div>
      <div className="right-child-header">
        <div>
          <IoMdSearch className="search-icon" />
          <input
            value={protitle}
            onChange={(e) => dispatch(setProtitle(e.target.value))}
            type="text"
            placeholder="Search for products..."
          />
        </div>
        {admin ? (
          <Link href={"/admin/products"}>
            <button className="btn button-admin cursor-pointer">admin</button>
          </Link>
        ) : (
          <>
            <Link href={"/givingorder"}>
              <div className="cursor-pointer wrapper-cart">
                <FiShoppingCart className="cart" />
                <div className="btn">
                  <FaStar className="mb-0.4" />
                </div>
              </div>
            </Link>
          </>
        )}
        <MdOutlineMenu
          onClick={() => setSide(true)}
          className="menu cursor-pointer"
        />
      </div>
    </div>
  );
}
