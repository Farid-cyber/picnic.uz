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
      <div className="bloggg ttt">
        <div className="left-side-blog">
          {/* <Image quality={100} height={100} width={100} src={fullImage} alt="" />
           */}
           <img src={blogs?.image} alt="" />
        </div>
        <div className="right-side-blog">
          <div className="first-right-side-blog">
            <h1>
              {" "}
              Sarlavha: <span>{blogs?.title}</span>
            </h1>
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
      </div>
    </div>
  );
};

export default Blog;
