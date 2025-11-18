"use client";
import "./page.scss";
import { db } from "@/app/firebase/firebase.con";
import { Post } from "@/app/types";
import { doc, getDoc } from "firebase/firestore";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";

const Blog = () => {
  const [blogs, setBlogs] = useState<Post>();
  const { id } = useParams();
  const router = useRouter();

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;
      const docRef = doc(db, "posts", id as string);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        setBlogs(docSnap.data() as Post);
      }
    };
    fetchProduct();
  }, [id]);

  console.log(id);
  console.log(blogs);

  // const fullImage = blogs?.image?.startsWith("http")
  // ? blogs.image
  // : `https://your-backend.com${blogs!.image!}`;

  return (
    <div className="blog-wrapper">
      <FaArrowLeftLong size={35} onClick={() => router.back()} />
      {/* <div className="bloggg ttt">
        <div className="left-side-blog">
          {/* <Image quality={100} height={100} width={100} src={fullImage} alt="" />
           */}
      {/* <img src={blogs?.image} alt="" />
        </div>
        <div className="right-side-blog">
          <div className="first-right-side-blog">
            <h1>{blogs?.title}</h1>
            <p>
              Tavsif: <span>{blogs?.description}</span>
            </p>
          </div>
          <div className="second-right-side-blog">
            <div className="second-second-right-side-blog">
              <h3>
                Muaalif: <span>{blogs?.author}</span>
              </h3>
              <button>{blogs?.createdAt}</button>
            </div>
          </div>
        </div>
      </div> */}
      <div className="max-w-sm rounded overflow-hidden shadow-lg mx-auto">
        <img
          className="w-full"
          src={`${blogs?.image}`}
          alt="Sunset in the mountains"
        />
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">{blogs?.title}</div>
          <p className="text-gray-700 text-base">
            {blogs?.description}
          </p>
        </div>
        <div className="px-6 pt-4 pb-2">
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
            {blogs?.createdAt}
          </span>
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
            {blogs?.author}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Blog;
