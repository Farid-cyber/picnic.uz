"use client";

import { useEffect, useRef, useState } from "react";
import Header from "./components/header";
import "./globals.scss";
import Sidebar from "./components/sidebar";
import { Provider } from "react-redux";
import store from "./redux/store";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase.auth/firbase.cons.auth";
import Footer from "./components/footer";

export default function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [skidka, setSkidka] = useState(true);
  const [sidebar, setSidebar] = useState(false);
  useEffect(() => {}, [sidebar]);
  const router = useRouter();
  const [checker, setChecker] = useState(true);
  const sidebarRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(e.target as Node)
      ) {
        setSidebar(false);
      }
    };

    if (sidebar) {
      document.addEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [sidebar]);

  const setSide = (value: boolean) => {
    if (sidebar === true) {
      setSidebar(false);
    } else {
      setSidebar(true);
    }
  };

  const check = () => {
    onAuthStateChanged(auth, (user) => {
      console.log(user);
      if (user !== null) {
        setSkidka(false);
      } else if (checker === false) {
        setSkidka(false);
      } else {
        setSkidka(true);
      }
      if (user && location.pathname.startsWith("/admin")) {
        const uid = user.uid;
        console.log(uid);

        if (user.email !== "farid@gmail.com") {
          router.push("/registration");
        }
      } else if (location.pathname.startsWith("/admin")) {
        router.push("/registration");
      }
    });
  };

  useEffect(() => {
    check();
  }, [skidka, checker]);

  const setAside = (val: boolean) => {
    if (sidebar === true) {
      setSidebar(false);
    }
  };
  // console.log(skidka);

  return (
    <div onClick={() => setAside(false)}>
      <Provider store={store}>
        <div className={`${skidka ? "bonus" : "bonus-2"} cursor-pointer`}>
          <div className="wrapper-pisi">
            <p className="pisi cursor-pointer">
              Sign up and get 20% off to your first order.{" "}
              <span
                onClick={() => router.push("registration")}
                className="sign-up"
              >
                Sign Up Now
              </span>
            </p>
          </div>
          <div className="x-wrapper" onClick={() => setChecker(false)}>
            <p className="child-x-wrapper">X</p>
          </div>
        </div>
        <Header sidebar={sidebar} setSide={setSide} />
        <div className="flex w-full relative">
          <div className="">
            <Sidebar sidebar={sidebar} />
          </div>
          <div className="w-full">
            <html lang="en">
              <body>{children}</body>
            </html>
          </div>
        </div>
        <Footer />
      </Provider>
    </div>
  );
}
