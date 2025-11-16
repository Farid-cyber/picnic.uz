"use client";
// import Link from "next/link";
import "./page.scss";
import { useEffect, useState } from "react";
import Header from "../components/header";
import Sidebar from "../components/sidebar";
import { Post } from "../types";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebase.con";
import Link from "next/link";

export default function Blog() {
  // const [skidka, setSkidka] = useState(true);
  const [sidebar, setSidebar] = useState(false);
  useEffect(() => {}, [sidebar]);
  const [posts, setPosts] = useState<Post[]>([]);

  const fetchPosts = async () => {
    const querySnapshot = await getDocs(collection(db, "posts"));
    const arr = querySnapshot.docs.map((c) => ({
      id: c.id,
      ...c.data(),
    })) as Post[];
    setPosts(arr);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="blog h-100vh">
      <hr className="hr" />
      <div className="top-blog">
        <h1>Sayohat va Lager Blogi</h1>
        <p>
          Sayohatni sevuvchilar uchun qiziqarli hikoyalar, foydali maslahatlar
          va lager hayoti haqida ko‘rsatmalar. Tabiatga yaqin bo‘lish va
          sayohatlaringizni unutilmas qilish uchun o‘z bilimlaringizni boyiting!
        </p>
      </div>
      <div className="posts-blog">
        {posts.map((c, i) => (
          <div className="post" key={i}>
            <Link href={`/blogs/${c.id}`}>
              <img src={`${c.image}`} alt="" />
            </Link>
            <div className="post-child">
              <h2>{c.title}</h2>
              <button>{c.createdAt}</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
