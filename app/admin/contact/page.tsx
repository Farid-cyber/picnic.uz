"use client";
import { db } from "@/app/firebase/firebase.con";
import { Contact } from "@/app/types";
import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import ContactF from "./contact";

const Products = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);

  const fetchProducts = async () => {
    const querySnapshot = await getDocs(collection(db, "contact"));
    const arr = querySnapshot.docs.map((c) => ({
      id: c.id,
      ...c.data(),
    })) as Contact[];
    setContacts(arr);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  console.log(contacts);

  return (
    <div className="p-4 flex flex-wrap gap-[15px]">
      {contacts.map((c) => (
        <ContactF contact={c} />
      ))}
    </div>
  );
};

export default Products;
