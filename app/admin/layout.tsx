"use client";
// import "bootstrap/dist/css/bootstrap.min.css";
import "./layout.scss";

import { useState } from "react";
import HeaderAdmin from "./adminHeader";
import Sidebar2 from "./sidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebar, setSidebar] = useState(false);
  return (
    <div className="min-h-screen flex flex-col h-full">
      <HeaderAdmin sidebar={sidebar} setSidebar={setSidebar} />
      <div className="flex w-full relative h-full">
        <div className="">
          <Sidebar2 sidebar={sidebar} />
        </div>
        <main className="w-full h-full">{children}</main>
      </div>
    </div>
  );
}
