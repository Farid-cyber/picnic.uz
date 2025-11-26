"use client";

import "./givingorder.scss";
import "rodal/lib/rodal.css";
import { useEffect, useState } from "react";
import { PreOrder } from "../types";
import { FiMinus, FiPlus } from "react-icons/fi";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase.auth/firbase.cons.auth";
import { FaArrowRightLong, FaArrowRightToBracket } from "react-icons/fa6";
import Rodal from "rodal";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase/firebase.con";
import toast, { Toaster } from "react-hot-toast";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "../redux/hook";
import { fetchOrders } from "../redux/slices/products";

const Page = () => {
  const [orders, setOrders] = useState<PreOrder[]>([]);
  const [user, setUser] = useState(false);
  const [open, setOpen] = useState(false);
  const [commenting, setCommenting] = useState(false);
  const [userform, setUserform] = useState({
    fullname: "",
    number: "",
    location: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  // const { preorders } = useAppSelector((state) => state.products);

  // const us

  const [commentator, setCommentator] = useState({
    commentatorname: "",
    commentatorIdea: "",
  });
  const fetch = () => {
    const change = JSON.parse(localStorage.getItem("orders")!);
    setOrders(change);
  };

  useEffect(() => {
    fetch();
  }, []);

  const handleQuantity = (value: string, id: string | undefined) => {
    if (value === "minus") {
      const order = orders.findIndex((c) => c.title === id);
      if (orders[order].quantity > 1) {
        orders[order].quantity--;
        toast.success("Siz mahsulot miqdorini muvaffaqiyatli kamaytirdingiz");
      } else {
        return;
      }
    } else if (value === "plus") {
      const order = orders.findIndex((c) => c.title === id);
      orders[order].quantity++;
      toast.success("Siz mahsulot miqdorini muvaffaqiyatli oshirdingiz");
    }
    localStorage.setItem("orders", JSON.stringify(orders));
    fetch();
  };

  const handleDelete = (title: string) => {
    const orderss = orders.filter((c) => c.title !== title);
    toast.success("Siz mahsulotni muvaffaqiyatli o'chirdingiz");
    localStorage.setItem("orders", JSON.stringify(orderss));
    fetch();
  };

  const calculateAll = () => {
    let life = 0;
    for (let index = 0; index < orders?.length; index++) {
      life += Number(orders[index].price) * orders[index].quantity;
    }
    return life;
  };

  const check = () => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(true);
      } else {
        setUser(false);
      }
    });
  };

  useEffect(() => {
    check();
  }, [user]);

  const dispatch = useAppDispatch();

  const calculateDiscount = () => {
    let f = 0;
    let l = (calculateAll() * 80) / 100;
    f = calculateAll() - l;
    return Number(f.toString().slice(0, 3));
  };

  const handleSubmit = async () => {
    const orderObj = {
      fullname: userform.fullname,
      location: userform.location,
      number: userform.number,
      message: userform.message,
      orders: orders,
      allprice: user ? calculateAll() - calculateDiscount() : calculateAll(),
      status: false,
    };

    if (
      userform.fullname === "" ||
      userform.location === "" ||
      userform.message === "" ||
      userform.number === ""
    ) {
      toast.error("Formani to'liq to'ldiring");
      return;
    }
    try {
      await addDoc(collection(db, "orders"), orderObj);
      setUserform({
        fullname: "",
        number: "",
        location: "",
        message: "",
      });
      toast.success("Buyurtmangiz muvaffaqiyatli yuborildi ✔");
      // preorders = [];
      dispatch(fetchOrders());
      setOpen(false);
      setCommenting(true);
      localStorage.removeItem("orders");
      fetch();
    } catch (e) {
      console.error("Error adding document: ", e);
      toast.error(`${e}`);
    }
  };

  const handleSubmitMessage = async () => {
    const commentObj = {
      fullname: commentator.commentatorname,
      idea: commentator.commentatorIdea,
    };
    try {
      await addDoc(collection(db, "comments"), commentObj);
      toast.success("Fikringiz muvaffaqiyatli yuborildi ✔");
      setLoading(true);
      setUserform({
        fullname: "",
        number: "",
        location: "",
        message: "",
      });
      setCommenting(false);
      // localStorage.removeItem("orders");
      fetch();
    } catch (e) {
      console.error("Error adding document: ", e);
      toast.error(`${e}`);
    }
    setOpen(false);
    setLoading(false);
  };

  // console.log(user);

  return (
    <div className="givingorder">
      <div className="cursor-pointer">
        <Toaster position="top-right" reverseOrder={false} />
      </div>
      {orders?.length == 0 || orders === null ? (
        <>
          <div className="flex gap-2 items-center flex-wrap">
            <h1>Iltimos mahsulot qo'shing </h1>
            <Link href={"/"}>
              <FaArrowRightToBracket size={30} className="mt-3" />
            </Link>
          </div>
        </>
      ) : (
        <>
          <h1>Sizning savatingiz</h1>
          <div className="second-givingorder">
            <div className="left-side-second-givingorder">
              {orders?.map((c) => (
                <div className="child-left-side-second-givingorder">
                  <img width={100} src={`${c.images?.slice(0, 1)}`} alt="" />
                  <div className="rightchild-left-side-second-givingorder">
                    <div className="left-rightchild-left-side-second-givingorder">
                      <h1 className="line-clamp-1">{c.title}</h1>
                      <h2>${c.price}</h2>
                    </div>
                    <div className="cursor-pointer right-rightchild-left-side-second-givingorder">
                      <img
                        onClick={() => handleDelete(c.title)}
                        src="/Frame.svg"
                        alt=""
                      />
                      <div className="cursor-pointer buttom-right-rightchild-left-side-second-givingorder">
                        <FiMinus
                          onClick={() => handleQuantity("minus", c.title)}
                        />
                        <p>{c.quantity}</p>
                        <FiPlus
                          onClick={() => handleQuantity("plus", c.title)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="w-[350px]">
              <div className="right-side-second-givingorder">
                <h2>Buyurtma xulosasi</h2>
                <div className="second-child-right-side-second-givingorder">
                  <h3>Oraliq jami</h3>
                  <p>${calculateAll()}</p>
                </div>
                <div
                  className={`${
                    user === false
                      ? "line-through third-child-right-side-second-givingorder"
                      : "third-child-right-side-second-givingorder"
                  }`}
                >
                  <h3>Chegirma (-20%)</h3>
                  <h5>-${calculateDiscount()}</h5>
                </div>
                <hr />
                <div className="fifth-child-right-side-second-givingorder">
                  <h3>Oraliq jami</h3>
                  <p>
                    $
                    {user === false
                      ? calculateAll()
                      : calculateAll() - calculateDiscount()}
                  </p>
                </div>
                <button
                  onClick={() => setOpen(true)}
                  className="six-child-right-side-second-givingorder cursor-pointer"
                >
                  Buyurtma berish{""}
                  <FaArrowRightLong size={20} className="mt-1 ml-3" />
                </button>
              </div>
            </div>
          </div>
        </>
      )}
      <div>
        <Rodal
          className="rodal"
          visible={open}
          onClose={() => setOpen(false)}
          customStyles={{ width: "340px", height: "max-content" }}
        >
          <div className="mt-4">
            <p>Buyurtma Berish Ma'lumotlarini Kiriting</p>
            <div className="rodal-inside">
              <label htmlFor="name">Isim va Familiya</label>
              <input
                value={userform.fullname}
                onChange={(e) =>
                  setUserform({ ...userform, fullname: e.target.value })
                }
                id="name"
                type="text"
                placeholder="To‘liq ism va familiyangizni kiriting"
              />
            </div>
            <div className="rodal-inside">
              <label htmlFor="number">Telefon raqam</label>
              <input
                value={userform.number}
                onChange={(e) =>
                  setUserform({ ...userform, number: e.target.value })
                }
                id="number"
                type="text"
                placeholder="Telefon raqamingizni kiriting"
              />
            </div>
            <div className="rodal-inside">
              <label htmlFor="loc">Manzil</label>
              <input
                value={userform.location}
                onChange={(e) =>
                  setUserform({ ...userform, location: e.target.value })
                }
                id="loc"
                type="text"
                placeholder="Manzilingizni kiriting"
              />
            </div>
            <div className="rodal-inside">
              <label htmlFor="comment">Xabar</label>
              <textarea
                value={userform.message}
                onChange={(e) =>
                  setUserform({ ...userform, message: e.target.value })
                }
                name=""
                id="comment"
                placeholder="Qo‘shimcha ma’lumot yoki talablaringizni yozing"
              ></textarea>
            </div>
            <button
              onClick={handleSubmit}
              className="submit-button cursor-pointer"
            >
              Yuborish
            </button>
          </div>
        </Rodal>
        <Rodal
          className="rodal"
          visible={commenting}
          onClose={() => setCommenting(false)}
          customStyles={{ width: "340px", height: "max-content" }}
        >
          <div className="mt-4">
            {loading === false ? (
              <>
                <p>Buyurtma haqida fikr qoldiring</p>
                <div className="rodal-inside">
                  <label htmlFor="name">Isim va Familiya</label>
                  <input
                    value={commentator.commentatorname}
                    onChange={(e) =>
                      setCommentator({
                        ...commentator,
                        commentatorname: e.target.value,
                      })
                    }
                    id="name"
                    type="text"
                    placeholder="To‘liq ism va familiyangizni kiriting"
                  />
                </div>
                <div className="rodal-inside">
                  <label htmlFor="comment">Xabar</label>
                  <textarea
                    value={commentator.commentatorIdea}
                    onChange={(e) =>
                      setCommentator({
                        ...commentator,
                        commentatorIdea: e.target.value,
                      })
                    }
                    name=""
                    id="comment"
                    placeholder="Qo‘shimcha ma’lumot yoki talablaringizni yozing"
                  ></textarea>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setCommenting(false), setOpen(false);
                    }}
                    className="comment-button cursor-pointer"
                  >
                    Yo'q fikr qoldirmayman
                  </button>
                  <button
                    onClick={handleSubmitMessage}
                    className="submit-button cursor-pointer"
                  >
                    Xabarni yuborish
                  </button>
                </div>
              </>
            ) : (
              <>
                <p>Your comment is being sent!</p>
              </>
            )}
          </div>
        </Rodal>
      </div>
    </div>
  );
};

export default Page;
