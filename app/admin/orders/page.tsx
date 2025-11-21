"use client";
import { db } from "@/app/firebase/firebase.con";
import { Ordered, PreOrder } from "@/app/types";
import { collection, doc, getDocs, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import "./page.scss";
import Rodal from "rodal";
import "rodal/lib/rodal.css";

const Products = () => {
  const [orders, setOrders] = useState<Ordered[]>([]);
  const [preorders, setProorders] = useState<PreOrder[]>([]);
  const [open, setOpen] = useState(false);
  const fetchProducts = async () => {
    const querySnapshot = await getDocs(collection(db, "orders"));
    const arr = querySnapshot.docs.map((c) => ({
      id: c.id,
      ...c.data(),
    })) as Ordered[];
    setOrders(arr);
  };

  const handleShowOrders = (orders: PreOrder[]) => {
    console.log(orders);
    setProorders([...orders]);
    setOpen(true);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const changeStatus = async (id: string) => {
    try {
      const docRef = doc(db, "orders", id);
      await updateDoc(docRef, { status: true });
      // return { id, ...userObj };
    } catch (e) {
      console.error("Error updating document: ", e);
      throw e;
    }

    fetchProducts();
  };
  return (
    <div>
      <div className="overflow-x-auto bg-neutral-primary-soft shadow-xs rounded m-4 border border-default">
        <table className="w-full text-sm text-left rtl:text-right text-body">
          <thead className="text-sm text-body bg-neutral-secondary-soft border-b rounded-base border-default">
            <tr>
              <th scope="col" className="px-6 py-3 font-medium">
                Customer fullname
              </th>
              <th scope="col" className="px-6 py-3 font-medium">
                Message
              </th>
              <th scope="col" className="px-6 py-3 font-medium">
                Pnonenumber
              </th>
              <th scope="col" className="px-6 py-3 font-medium">
                Location
              </th>
              <th scope="col" className="px-6 py-3 font-medium">
                All price
              </th>
              <th scope="col" className="px-6 py-3 font-medium">
                Orders
              </th>
              <th scope="col" className="px-6 py-3 font-medium">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {orders.map((c) => (
              <tr className="bg-neutral-primary border-b border-default">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-heading whitespace-nowrap"
                >
                  {c.fullname}
                </th>
                <td className="px-6 py-4">{c.message}</td>
                <td className="px-6 py-4">{c.number}</td>
                <td className="px-6 py-4">{c.location}</td>
                <td className="px-6 py-4">${c.allprice}</td>
                <td className="px-6 py-4">
                  {" "}
                  <div
                    onClick={() => handleShowOrders(c.orders)}
                    className="border cursor-pointer rounded p-2 bg-blue-600 text-white flex items-center justify-center"
                  >
                    Show orders
                  </div>
                </td>
                <td className="px-6 py-4">
                  {c.status === false ? (
                    <div
                      onClick={() => changeStatus(c.id!)}
                      className=" cursor-pointer border rounded p-2 bg-red-600 text-white flex items-center justify-center"
                    >
                      New order
                    </div>
                  ) : (
                    <div className="cursor-pointer border rounded p-2 bg-green-600 text-white flex items-center justify-center">
                      Delivered
                    </div>
                  )}
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
        customStyles={{ height: "max-content", width: "350px" }}
      >
        <div className="mt-4">
          <p>Buyurtma haqida to'liq malumot</p>
          <table className="w-[320px] text-body rounded mx-auto">
            <thead className="text-sm text-body bg-neutral-secondary-soft border-b rounded-base border-default">
              <tr>
                <th scope="col" className="px-2 py-3 font-medium">
                  Mahsulot nomi
                </th>
                <th scope="col" className="px-2 py-3 font-medium">
                  Miqdori
                </th>
                <th scope="col" className="px-2 py-3 font-medium">
                  Narxi
                </th>
              </tr>
            </thead>
            <tbody>
              {preorders.map((c) => (
                <tr className="bg-neutral-primary border-b border-default">
                  <th
                    scope="row"
                    className="px-2 py-4 font-medium text-heading whitespace-nowrap"
                  >
                    {c.title.slice(0, 20)}...
                  </th>
                  <td className="px-2 py-4">{c.quantity}X</td>
                  <td className="px-2 py-4">${c.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
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
