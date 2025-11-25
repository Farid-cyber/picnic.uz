"use client";
import "./page.scss";
// import Swal from 'sweetalert2/dist/sweetalert2.js'

import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useEffect, useState } from "react";
//   import { useNavigate } from "react-router-dom";
//   import { auth } from "../../firebase.auth/firebase.con.auth";
//   import { ToastContainer, toast } from "react-toastify";
// import "./signup.scss";
import { auth } from "../firebase.auth/firbase.cons.auth";

import { useRouter } from "next/navigation";
// import { toast, ToastContainer } from "react-toastify";
import toast, { Toaster } from "react-hot-toast";

const SignUp = () => {
  const router = useRouter();
  const [emailadress, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [name2, setEmail2] = useState("");

  const [login, setLogin] = useState(false);

  const handleSave = () => {
    if (emailadress === "" || password === "") {
      toast.error("Formani to'liq to'ldiring.");
      return;
    }

    if (password.length < 8) {
      toast.error("Parol 8 ta harf yoki raqamdan katta bo'lishi kerak!");
      return;
    }
    createUserWithEmailAndPassword(auth, emailadress, password)
      .then((userCredential) => {
        toast.success("Siz muvaffaqiyatli ro'yxatdan o'tdingiz");
        const user = userCredential.user;
        console.log(user.displayName);
        setLogin(false);
      })
      .catch((error) => {
        console.log(error);
        toast.error(`${error}`);
      });
  };

  const handleEnter = () => {
    if (emailadress === "" || password === "") {
      toast.error("Formani to'liq to'ldiring.");
      return;
    }

    if (password.length < 8) {
      toast.error("Parol 8 ta harf yoki raqamdan katta bo'lishi kerak!");
      return;
    }
    signInWithEmailAndPassword(auth, emailadress, password)
      .then((userCredential) => {
        const user = userCredential.user;
        if (user.uid === "") {
          toast.error("Siz ro'yxatdan o'tmagansiz.");
          return;
        } else {
          toast.success("Siz muvaffaqiyatli kirdingiz");
          if (user.email === "farid@gmail.com") {
            router.push("/admin/products");
          } else {
            router.push("/");
          }
        }
      })
      .catch((error) => {
        toast.error(`${error}`);
      });
  };

  const check = () => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // const uid = user.uid;
        // console.log(uid);
        if (!user.uid || user.uid === "") {
          router.push("/registration");
        }
      }
    });
  };

  useEffect(() => {
    check();
  }, []);

  return (
    <div className="w-75 mx-auto pb-5">
      <div>
        <Toaster position="top-right" reverseOrder={false} />
      </div>
      <button onClick={() => router.push("/")} className="cursor-pointer life111 ">
        Return Home
      </button>
      {login !== true ? (
        <div className="card1 ">
          <div className="card-header text-dark text-center text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
            Sign In
          </div>
          <div className="card-body">
            <input
              type="text"
              className="form-control mb-3 bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="emailadress..."
              value={emailadress}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="text"
              className="form-control mb-3 bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="password..."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              onClick={() => setLogin(true)}
              className="cursor-pointer life111 mt-2 font-medium text-primary-600 hover:underline dark:text-primary-500"
            >
              Dont have an account? Sign Up
            </button>
          </div>
          <div className="card-footer">
            <button
              onClick={handleEnter}
              className="cursor-pointer btn btn-primary w-100 w-full bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            >
              Save
            </button>
          </div>
        </div>
      ) : (
        <div className="card1 ">
          <div className="card-header text-dark text-center text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
            Sign Up
          </div>
          <div className="card-body">
            <input
              type="text"
              className="form-control mb-3 bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="emailadress..."
              value={emailadress}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="text"
              className="form-control mb-3 bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="password..."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              onClick={() => setLogin(false)}
              className="life cursor-pointer mt-2 font-medium text-primary-600 hover:underline dark:text-primary-500"
            >
              Return to sign in
            </button>
          </div>
          <div className="card-footer">
            <button
              onClick={handleSave}
              className="btn cursor-pointer btn-primary w-100 w-full bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            >
              Save
            </button>
          </div>
        </div>
      )}
      <>{/* <ToastContainer /> */}</>

      <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
      {/* <link rel="stylesheet" href="sweetalert2.min.css"> */}
    </div>
  );
};
export default SignUp;
