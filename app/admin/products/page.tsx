"use client";
import { db } from "@/app/firebase/firebase.con";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  // doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import Image from "next/image";
import { FormEvent, useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import Rodal from "rodal";
import "rodal/lib/rodal.css";
import "./page.scss";
type Product = {
  id?: string;
  title: string;
  description: string;
  price: string;
  discount: string;
  rating?: number;
  category: string;
  images?: string[];
};

type Category = {
  id?: string;
  name: string;
};

const Categories = () => {
  const [open, setOpen] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [editingId, setEditingId] = useState<string | undefined>(undefined);

  const [productForm, setProductForm] = useState<Product>({
    title: "",
    description: "",
    price: "",
    discount: "",
    // rating: 0,
    category: "0",
    // images: [],
  });

  const fetchProducts = async () => {
    const querySnapshot = await getDocs(collection(db, "products"));
    const arr = querySnapshot.docs.map((c) => ({
      id: c.id,
      ...c.data(),
    })) as Product[];
    setProducts(arr);
  };

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

  useEffect(() => {
    fetchProducts();
  }, []);

  function andomRating(length: number = 1): number {
    const chars = `12345`;
    let id = 0;
    for (let index = 0; index < length; index++) {
      id += Number(chars.charAt(Math.floor(Math.random() * chars.length)));
    }
    return id;
  }

  const [images, setImages] = useState<string[] | undefined>(["", ""]);

  const handleImage = (value: string, index: number) => {
    images![index] = value;
    setImages([...images!]);
  };

  const removeImage = (index: number) => {
    if (images!.length <= 2) {
      return;
    }
    images!.splice(index, 1);
    setImages([...images!]);
  };

  const addImage = () => {
    images!.push("");
    setImages([...images!]);
  };

  const handleSave = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // const randomRating = (length: number = 5) => {};

    const productObject = {
      title: productForm.title,
      description: productForm.description,
      discount: productForm.discount,
      price: productForm.price,
      category: productForm.category,
      rating: andomRating(),
      images: images,
    };
    if (editingId === undefined) {
      try {
        await addDoc(collection(db, "products"), productObject);
        fetchProducts();
        setProductForm({
          title: "",
          description: "",
          price: "",
          discount: "",
          category: "0",
        });
        setImages(["", ""]);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
      setOpen(false);
    } else {
      try {
        console.log(productObject);
        await updateDoc(doc(db, "products", editingId), productObject);
        fetchProducts();
        setProductForm({
          title: "",
          description: "",
          price: "",
          discount: "",
          category: "0",
        });
        setImages(["", ""]);
        setEditingId(undefined);
        setOpen(false);
        // clearForm();
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    }
  };

  const handleDelete = async (id: string) => {
    await deleteDoc(doc(db, `products`, id));
    fetchProducts();
  };

  const handleEdit = (e: Product) => {
    console.log(e);
    setEditingId(e.id);
    // setProductForm({ ...productForm, discount: e.discount });
    setImages(e.images);
    setOpen(true);
    setProductForm(e);
  };

  console.log(products);

  return (
    <div className="w-full p-5">
      <div className="w-full flex justify-end">
        <button onClick={() => setOpen(true)} className="buttoncha">
          + Products
        </button>
      </div>
      <div className="life w-full flex flex-wrap gap-[30px]! mt-[20px]! mb-[70px]">
        {products.map((c) => (
          <div key={c.id} className="product">
            <div className="image-product">
              <img
                src={`${c.images![0]}`}
                width={200}
                height={200}
                alt=""
              />
            </div>
            <h1 className="line-clamp-1">{c.title}</h1>
            <div className="flex star-wrapper gap-2 items-center">
              <div className="flex gap-1"></div>
              <p>{c.rating}/5</p>
            </div>
            <div className="bottom flex gap-4 items-center justify-between">
              <div className="flex gap-2 items-center">
                <p>${c.price}</p>
                {c.discount !== "" ? (
                  <>
                    <span className="line-through">${c.discount}</span>
                    {/* <button className="percent-button">-{calculate()}%</button> */}
                  </>
                ) : (
                  ""
                )}
              </div>
              <button onClick={() => handleDelete(c.id!)} className="buttonsss">
                Delete
              </button>
              <button onClick={() => handleEdit(c)} className="buttonsss2">
                Edit
              </button>
            </div>
          </div>
        ))}
      </div>
      {/* <Rodal
        visible={open}
        onClose={() => setOpen(false)}
        customStyles={{ height: "max-content" }}
      >
        <div className="mt-5">
          <form onSubmit={(e) => handleSave(e)}>
            {images.map((image, index) => (
              <div className="d-flex gap-2" key={index}>
                <input
                  value={image}
                  onChange={(e) => handleImage(e.target.value, index)}
                  type="string"
                  className="form-control mt-2"
                  placeholder="image url..."
                />
                <div
                  onClick={() => removeImage(index)}
                  className="btn btn-close"
                ></div>
              </div>
            ))}
            <div onClick={addImage} className="btn btn-success w-100 mt-2">
              Add Image
            </div>
            <div className="mt-2">
              <label htmlFor="title">Title</label>
              <input
                className="form-control mt-2"
                type="text"
                name="title..."
                id="title"
                placeholder="title..."
                value={productForm.title}
                onChange={(e) =>
                  setProductForm({ ...productForm, title: e.target.value })
                }
              />
            </div>
            <div className="mt-2">
              <label htmlFor="description">Title</label>
              <input
                className="form-control mt-2"
                type="text"
                name="description..."
                id="description"
                placeholder="description..."
                value={productForm.description}
                onChange={(e) =>
                  setProductForm({
                    ...productForm,
                    description: e.target.value,
                  })
                }
              />
            </div>
            <div className="mt-2">
              <label htmlFor="discount">Discount</label>
              <input
                className="form-control mt-2"
                type="number"
                name="discount..."
                id="discount"
                placeholder="discount..."
                value={productForm.discount}
                onChange={(e) =>
                  setProductForm({ ...productForm, discount: e.target.value })
                }
              />
            </div>
            <div className="mt-2">
              <label htmlFor="price">Current price</label>
              <input
                className="form-control mt-2"
                type="text"
                name="price..."
                id="price"
                placeholder="price..."
                value={productForm.price}
                onChange={(e) =>
                  setProductForm({ ...productForm, price: e.target.value })
                }
              />
            </div>
            <div className="mt-2">
              <label htmlFor="title">Category</label>
              <select
                onChange={(e) =>
                  setProductForm({ ...productForm, category: e.target.value })
                }
                value={productForm.category}
                className="form-select mt-2"
              >
                <option defaultValue={"0"} value="0" disabled>
                  Select the category
                </option>
                {categories.map((c, i) => (
                  <option key={i} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
            <button className="btn btn-primary w-100 mt-3">Save</button>
          </form>
        </div>
      </Rodal> */}
      <Rodal
        className="rodal"
        visible={open}
        onClose={() => {
          setOpen(false),
            setProductForm({
              title: "",
              description: "",
              price: "",
              discount: "",
              category: "0",
            });
        }}
        customStyles={{ width: "340px", height: "max-content" }}
      >
        <div className="mt-4">
          <p>Mahsulot kiriting</p>
          <form onSubmit={(e) => handleSave(e)}>
            <div className="rodal-inside">
              {images!.map((image, index) => (
                <div className="flex items-center gap-2" key={index}>
                  <input
                    value={image}
                    onChange={(e) => handleImage(e.target.value, index)}
                    type="string"
                    className="form-control mt-2"
                    placeholder="image url..."
                  />
                  <div
                    onClick={() => removeImage(index)}
                    className="btn button-del"
                  >
                    X
                  </div>
                </div>
              ))}
              <div onClick={addImage} className="btn adding-image w-100 mt-2">
                Add Image
              </div>
            </div>
            <div className="mt-2 rodal-inside">
              <label htmlFor="title">Title</label>
              <input
                className="form-control mt-2"
                type="text"
                name="title..."
                id="title"
                placeholder="title..."
                value={productForm.title}
                onChange={(e) =>
                  setProductForm({ ...productForm, title: e.target.value })
                }
              />
            </div>
            <div className="mt-2 rodal-inside">
              <label htmlFor="description">Title</label>
              <input
                className="form-control mt-2"
                type="text"
                name="description..."
                id="description"
                placeholder="description..."
                value={productForm.description}
                onChange={(e) =>
                  setProductForm({
                    ...productForm,
                    description: e.target.value,
                  })
                }
              />
            </div>
            <div className="mt-2 flex gap-2">
              <div className="flex flex-col gap-2 rodal-inside">
                <label htmlFor="discount">Discount</label>
                <input
                  className="form-control mt-2"
                  type="number"
                  name="discount..."
                  id="discount"
                  placeholder="discount..."
                  value={productForm.discount}
                  onChange={(e) =>
                    setProductForm({ ...productForm, discount: e.target.value })
                  }
                />
              </div>
              <div className="flex flex-col gap-2 rodal-inside">
                <label htmlFor="price">Current price</label>
                <input
                  className="form-control mt-2"
                  type="text"
                  name="price..."
                  id="price"
                  placeholder="price..."
                  value={productForm.price}
                  onChange={(e) =>
                    setProductForm({ ...productForm, price: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="mt-2 rodal-inside">
              <label htmlFor="title">Category</label>
              <select
                onChange={(e) =>
                  setProductForm({ ...productForm, category: e.target.value })
                }
                value={productForm.category}
                className="form-select mt-2"
              >
                <option defaultValue={"0"} value="0" disabled>
                  Select the category
                </option>
                {categories.map((c, i) => (
                  <option key={i} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
            <button className="btn btn-primary w-100 mt-3">Save</button>
          </form>
        </div>
      </Rodal>
    </div>
  );
};

export default Categories;
