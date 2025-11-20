"use client";
// import Link from "next/link";
// import "./sidebar.scss";
import { useEffect, useState } from "react";
import Header from "../components/header";
import Sidebar from "../components/sidebar";
import "./page.scss";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase/firebase.con";
import toast, { Toaster } from "react-hot-toast";

export default function Aloqa() {
  const [skidka, setSkidka] = useState(true);
  const [sidebar, setSidebar] = useState(false);
  useEffect(() => {}, [sidebar]);

  const setSide = (value: boolean) => {
    if (sidebar === true) {
      setSidebar(false);
    } else {
      setSidebar(true);
    }
  };

  const [contacterForm, setContacterForm] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phonenumber: "",
    message: "",
  });

  const handleSubmit = async () => {
    if (
      contacterForm.email === "" ||
      contacterForm.firstname === "" ||
      contacterForm.lastname === "" ||
      contacterForm.message === "" ||
      contacterForm.phonenumber === ""
    ) {
      toast.error("Formani to'liq to'ldiring!");
      return;
    }
    try {
      await addDoc(collection(db, "contact"), contacterForm);
      // setLoading(true);
      toast.success("Xabaringiz muvaffaqiyatli yuborildi");
      setContacterForm({
        firstname: "",
        lastname: "",
        email: "",
        phonenumber: "",
        message: "",
      });
    } catch (e) {
      console.error("Error adding document: ", e);
      toast.error(`${e}`);
    }
  };

  return (
    <div className="h-100vh wrapper pb-[40px]">
      <div>
        <Toaster position="top-right" reverseOrder={false} />
      </div>
      <div className="child1-aloqa">
        <img className="image1" src="/Group 3894.svg" alt="" />
        <img
          className="image2"
          src="/pexels-xue-guangjian-815005-1687845 1.svg"
          alt=""
        />
      </div>
      <div className="child2-aloqa">
        <div className="left-side-child2-aloqa">
          <h1>Keling, biz bilan gaplashaylik</h1>
          <p>
            Savollar, sharhlar yoki takliflar? Shaklni to'ldiring va biz tez
            orada bog'lanamiz.
          </p>
          <div className="third-left-side-child2-aloqa lll">
            <img src="/Frame 3879.svg" alt="" />
            <h3>1055 Arthur ave Elk Groot, 67. New Palmas South Carolina.</h3>
          </div>
          <div className="third-left-side-child2-aloqa">
            <img src="/noun_Phone_3612570 1.svg" alt="" />
            <h3>+1 234 678 9108 99</h3>
          </div>
          <div className="third-left-side-child2-aloqa">
            <img src="/noun_Email_247564 1.svg" alt="" />
            <h3>Contact@moralizer.com</h3>
          </div>
        </div>
        <div className="right-side-child2-aloqa">
          <div className="firstchild-right-side-child2-aloqa">
            <input
              value={contacterForm.firstname}
              onChange={(e) =>
                setContacterForm({
                  ...contacterForm,
                  firstname: e.target.value,
                })
              }
              type="text"
              placeholder="firtsname..."
            />
            <input
              value={contacterForm.lastname}
              onChange={(e) =>
                setContacterForm({
                  ...contacterForm,
                  lastname: e.target.value,
                })
              }
              type="text"
              placeholder="lastname..."
            />
          </div>
          <div className="second-right-side-child2-aloqa">
            <input
              value={contacterForm.email}
              onChange={(e) =>
                setContacterForm({
                  ...contacterForm,
                  email: e.target.value,
                })
              }
              type="text"
              placeholder="email..."
            />
          </div>
          <div className="second-right-side-child2-aloqa">
            <input
              value={contacterForm.phonenumber}
              onChange={(e) =>
                setContacterForm({
                  ...contacterForm,
                  phonenumber: e.target.value,
                })
              }
              type="text"
              placeholder="phonenumber..."
            />
          </div>
          <div className="second-right-side-child2-aloqa">
            <textarea
              value={contacterForm.message}
              onChange={(e) =>
                setContacterForm({
                  ...contacterForm,
                  message: e.target.value,
                })
              }
              name=""
              id=""
              placeholder="Your message..."
            ></textarea>
          </div>
          <button onClick={handleSubmit} className="last-child cursor-pointer">
            Send Message
          </button>
        </div>
      </div>
    </div>
  );
}
