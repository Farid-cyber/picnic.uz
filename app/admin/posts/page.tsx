"use client";

import { useEffect, useState } from "react";
import "./page.scss";
import Rodal from "rodal";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { db } from "@/app/firebase/firebase.con";
import "rodal/lib/rodal.css";
import { Post } from "@/app/types";
import Link from "next/link";

const Posts = () => {
  const [open, setOpen] = useState(false);
  const [posts, setPosts] = useState<Post[]>([]);
  const [postForm, setPostForm] = useState({
    author: "",
    description: "",
    image: "",
    title: "",
  });
  const [editingId, setEditingid] = useState<undefined | string>(undefined);

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

  const handleSubmit = async () => {
    const postObj = {
      ...postForm,
      createdAt: new Date().toLocaleDateString("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }),
    };

    if (editingId === undefined) {
      try {
        await addDoc(collection(db, "posts"), postObj);
        setPostForm({
          author: "",
          description: "",
          image: "",
          title: "",
        });
        setOpen(false);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    } else {
      try {
        // console.log(productObject);
        await updateDoc(doc(db, "posts", editingId), postObj);
        fetchPosts();
        setPostForm({
          title: "",
          description: "",
          author: "",
          image: "",
        });
        setEditingid(undefined);
        setOpen(false);
        // clearForm();
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    }
  };

  const handleDelete = async (id: string) => {
    await deleteDoc(doc(db, `posts`, id));
    fetchPosts();
  };

  const handleEdit = (c: Post) => {
    console.log(c);

    setPostForm(c);
    setOpen(true);
    setEditingid(c.id);
  };

  return (
    <div className="w-full px-10 py-5">
      <div className="w-full flex justify-end">
        <button onClick={() => setOpen(true)} className="button">
          Add post
        </button>
      </div>
      <div className="w-full">
        <div className="posts-blog">
          {posts.map((c, i) => (
            <div className="post" key={i}>
              {/* <Link href={`/blogs/${c.id}`}> */}
              <img src={`${c.image}`} alt="" />
              {/* </Link> */}
              <div className="father">
                <div className="post-child1">
                  <h2>{c.title}</h2>
                  <p className="mt-2">{c.description}</p>
                </div>
                <div className="post-child">
                  <div>
                    <h4>{c.author}</h4>
                    <button>{c.createdAt}</button>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleDelete(c.id)}
                      className="delete-button"
                    >
                      X
                    </button>
                    <button
                      onClick={() => handleEdit(c)}
                      className="edit-button"
                    >
                      ✏
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Rodal
        className="rodal"
        visible={open}
        onClose={() => setOpen(false)}
        customStyles={{ width: "340px", height: "max-content" }}
      >
        <div className="mt-4">
          <p>Post ma'lumotlarini Kiriting</p>
          <div className="rodal-inside">
            <label htmlFor="name">Post title</label>
            <input
              value={postForm.title}
              onChange={(e) =>
                setPostForm({ ...postForm, title: e.target.value })
              }
              id="name"
              type="text"
              placeholder="title..."
            />
          </div>
          <div className="rodal-inside">
            <label htmlFor="desc">Post description</label>
            <input
              value={postForm.description}
              onChange={(e) =>
                setPostForm({ ...postForm, description: e.target.value })
              }
              id="desc"
              type="text"
              placeholder="description..."
            />
          </div>
          <div className="rodal-inside">
            <label htmlFor="image">Post Image</label>
            <input
              value={postForm.image}
              onChange={(e) =>
                setPostForm({ ...postForm, image: e.target.value })
              }
              id="image"
              type="text"
              placeholder="image url..."
            />
          </div>
          <div className="rodal-inside">
            <label htmlFor="author">Post Author</label>
            <input
              value={postForm.author}
              onChange={(e) =>
                setPostForm({ ...postForm, author: e.target.value })
              }
              id="author"
              type="text"
              placeholder="author..."
            />
          </div>
          <div onClick={handleSubmit} className="submit-button cursor-pointer">
            Yuborish
          </div>
        </div>
      </Rodal>
    </div>
  );
};

export default Posts;
