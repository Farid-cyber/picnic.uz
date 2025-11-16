"use client";
import "./sidebar2.scss";
import Link from "next/link";
import { usePathname } from "next/navigation";
type InitialProps = {
  sidebar: boolean;
};
export default function Sidebar2({ sidebar }: InitialProps) {
  const pathname = usePathname();

  const links = [
    { href: "/admin/products", label: "Products" },
    { href: "/admin/categories", label: "Categories" },
    { href: "/admin/orders", label: "Orders" },
    { href: "/admin/contact", label: "Contacts" },
    { href: "/admin/posts", label: "Posts" },
    { href: "/", label: "Home" },
  ];

  return (
    <nav
      className={`${
        sidebar === true
          ? "sidebar22 flex flex-col p-4 gap-2"
          : "sidebar222 flex flex-col p-4 gap-2"
      }`}
    >
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={`px-4 py-2 rounded-md font-medium transition 
            ${
              pathname === link.href
                ? "bg-green-700 text-white"
                : "text-gray-700 hover:bg-green-100"
            }`}
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );
}
