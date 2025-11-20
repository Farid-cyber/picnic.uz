"use client";
import Link from "next/link";
import "./sidebar.scss";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase.auth/firbase.cons.auth";
import { useRouter } from "next/router";

type InitialProps = {
  sidebar: boolean;
};

export default function Sidebar({ sidebar }: InitialProps) {
  // const [selected, setSelected] = useState("/");
  const path = usePathname();
  // const router = useRouter();
  const [user, setUser] = useState(false);

  const check = () => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        console.log(uid);
        setUser(true);
        if (user.uid! == "" || user) {
        }
      }else {
        setUser(false)
      }
    });
  };

  useEffect(() => {
    check();
  }, [path, user]);

  const signOu = () => {
    // console.log(auth);
    signOut(auth)
      .then(() => {
        console.log("// Sign-out successful.");
        setUser(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  // useEffect(() => {
  //   if (window.location.pathname === "/") {
  //     setSelected("/");
  //   } else if (window.location.pathname === "/mahsulotlar") {
  //     setSelected("/mahsulotlar");
  //   } else if (window.location.pathname === "/aloqa") {
  //     setSelected("/aloqa");
  //   } else if (window.location.pathname === "/blog") {
  //     setSelected("/blog");
  //   }
  // }, [selected]);

  return (
    <div className={`cursor-pointer ${sidebar ? "sidebar h-full" : "sidebar2"}`}>
      <Link
        // onClick={() => setSelected("/")}
        href={"/"}
        className="text-decoration-none"
      >
        <button className={`cursor-pointer ${path === "/" ? "button2" : ""}`}>
          Bosh Sahifa
        </button>
      </Link>
      <Link
        // onClick={() => setSelected("/mahsulotlar")}
        href={"/mahsulotlar"}
        className="text-decoration-none "
      >
        <button className={`cursor-pointer ${path === "/mahsulotlar" ? "button2" : ""}`}>
          Mahsulotlar
        </button>
      </Link>
      <Link
        // onClick={() => setSelected("/aloqa")}
        href={"/aloqa"}
        className="text-decoration-none "
      >
        <button className={`cursor-pointer ${path === "/aloqa" ? "button2" : ""}`}>
          Aloqa
        </button>
      </Link>
      <Link
        // onClick={() => setSelected("/blog")}
        href={"/blog"}
        className="text-decoration-none "
      >
        <button className={`cursor-pointer ${path === "/blog"  ? "button2" : ""}`}>Blog</button>
      </Link>
      {user ? (
        <>
          <Link
            // onClick={() => setSelected("/registration")}
            onClick={signOu}
            href={"/registration"}
            className="text-decoration-none "
          >
            <button className="cursor-pointer">Logout</button>
          </Link>
        </>
      ) : (
        <>
          <Link
            // onClick={() => setSelected("/registration")}
            href={"/registration"}
            className="text-decoration-none "
          >
            <button className={`cursor-pointer ${path === "/registration" ? "button2" : ""}`}>
              Registration
            </button>
          </Link>
        </>
      )}
    </div>
  );
}
