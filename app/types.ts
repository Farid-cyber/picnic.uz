export type Category = {
  id?: string;
  name: string;
};

export type Product = {
  id?: string;
  title: string;
  description: string;
  price: string;
  discount: string;
  rating?: number;
  category: string;
  images?:string [];
};

export type PreOrder = {
  id?: string;
  title: string;
  description: string;
  price: string;
  discount: string;
  rating?: number;
  category: string;
  images?: string[];
  quantity: number;
  // status:boolean
};

export type Post = {
  title: string;
  description: string;
  createdAt: string;
  id: string;
  author: string;
  image: string;
};

export type Contact = {
  id?: string;
  firstname: string;
  lastname: string;
  email: string;
  phonenumber: string;
  message: string;
};

export type Ordered = {
  id?: string;
  fullname: string;
  location: string;
  number: string;
  message: string;
  orders: PreOrder[];
  allprice: string;
  status: boolean;
};
