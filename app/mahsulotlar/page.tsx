"use client";
// import Link from "next/link";
// import "./sidebar.scss";
import { useEffect, useState } from "react";
import Header from "../components/header";
import Sidebar from "../components/sidebar";
import All from "../homecomponents/all";

export default function Mahsulotlar() {
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
  return (
    <div>
      {/* <hr className="hr" /> */}
      <All />
    </div>
  );
}
