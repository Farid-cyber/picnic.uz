"use client";
import { db } from "@/app/firebase/firebase.con";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
} from "firebase/firestore";
import { FormEvent, useEffect, useState } from "react";
import Rodal from "rodal";
import "rodal/lib/rodal.css";
type Category = {
  id?: string;
  name: string;
};
const Categories = () => {
  const [open, setOpen] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [studentForm, setStudentForm] = useState<Category>({
    name: "",
  });

  const fetchCats = async () => {
    const querySnapshot = await getDocs(collection(db, "categories"));
    const arr = querySnapshot.docs.map((c) => ({
      id: c.id,
      ...c.data(),
    })) as Category[];
    setCategories(arr);
  };

  useEffect(() => {
    fetchCats();
  }, []);

  const handleSave = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const catObject = {
      name: studentForm.name,
    };
    // if (editId === null) {
    try {
      await addDoc(collection(db, "categories"), catObject);
      fetchCats();
      setStudentForm({
        name: "",
      });
    } catch (e) {
      console.error("Error adding document: ", e);
    }
    setOpen(false);
    // } else {
    //   try {
    //     console.log(productObject);
    //     await updateDoc(doc(db, "products", editId), productObject);
    //     fetchCats();
    //     clearForm();
    //   } catch (e) {
    //     console.error("Error adding document: ", e);
    //   }
    // }
  };

  const handleDelete = async (id: string) => {
    await deleteDoc(doc(db, `categories`, id));
    fetchCats();
    // clearForm();
  };

  return (
    <div className="w-full p-10">
      <div className="w-full flex justify-end">
        <div onClick={() => setOpen(true)} className="border-1 rounded p-3">
          + Categories
        </div>
      </div>
      <div className="w-full flex flex-wrap">
        {categories.map((c) => (
          <div
            className="p-5 border-1 rounded mx-4 my-4 w-100 bg-white "
            key={c.id}
          >
            <p>{c.name}</p>
            <div className="w-full flex justify-end! gap-2 mt-2 ">
              <div
                onClick={() => handleDelete(c.id!)}
                className="border-1 rounded p-3 bg-yellow-600 cursor-pointer"
              >
                  ✏
              </div>
              <div
                onClick={() => handleDelete(c.id!)}
                className="border-1 rounded p-3 bg-red-600  cursor-pointer"
              >
                ❌
              </div>
            </div>
          </div>
        ))}
      </div>
      <Rodal visible={open} onClose={() => setOpen(false)}>
        <div className="mt-5">
          <form onSubmit={(e) => handleSave(e)}>
            <div>
              <label htmlFor="fullname">Fullname</label>
              <input
                className="form-control mt-2"
                type="text"
                name="name..."
                id="fullname"
                placeholder="fullname..."
                value={studentForm.name}
                onChange={(e) =>
                  setStudentForm({ ...studentForm, name: e.target.value })
                }
              />
            </div>
            <button className="btn btn-primary w-100 mt-3">Save</button>
          </form>
        </div>
      </Rodal>
    </div>
  );
};

export default Categories;
