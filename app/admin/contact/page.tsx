"use client";
import { db } from "@/app/firebase/firebase.con";
import { Contact } from "@/app/types";
import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
// import ContactF from "./contact";
import Rodal from "rodal";
import "./page.scss";
import "rodal/lib/rodal.css";


const Products = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [contact, setContact] = useState<Contact>();
  const [open, setOpen] = useState(false);

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

  const handleShowContact = (c: Contact) => {
    setOpen(true);
    setContact(c);
  };

  return (
    <div>
      <div className="overflow-x-auto bg-neutral-primary-soft shadow-xs rounded m-4 border border-default">
        <table className="w-full text-sm text-left rtl:text-right text-body">
          <thead className="text-sm text-body bg-neutral-secondary-soft border-b rounded-base border-default">
            <tr>
              <th scope="col" className="px-6 py-3 font-medium">
                Firstname
              </th>
              <th scope="col" className="px-6 py-3 font-medium">
                Lastname
              </th>
              <th scope="col" className="px-6 py-3 font-medium">
                Phonenumber{" "}
              </th>
              <th scope="col" className="px-6 py-3 font-medium">
                Email
              </th>
              <th scope="col" className="px-6 py-3 font-medium">
                Message
              </th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((c) => (
              <tr className="bg-neutral-primary border-b border-default">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-heading whitespace-nowrap"
                >
                  {c.firstname}
                </th>
                <td className="px-6 py-4">{c.lastname}</td>
                <td className="px-6 py-4">{c.phonenumber}</td>
                <td className="px-6 py-4">{c.email}</td>
                <td className="px-6 py-4">
                  <div
                    onClick={() => handleShowContact(c)}
                    className="border cursor-pointer rounded p-2 bg-blue-600 text-white flex items-center justify-center"
                  >
                    Show message
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Rodal
        className="rodal"
        visible={open}
        onClose={() => setOpen(false)}
        customStyles={{ width: "340px", height: "max-content" }}
      >
        <div className="mt-4">
          <p>{contact?.message}</p>
          <div
            onClick={() => setOpen(false)}
            className="submit-button cursor-pointer"
          >
            Yopish
          </div>
        </div>
      </Rodal>
    </div>
  );
};

export default Products;
