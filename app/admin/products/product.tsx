import { Product } from "@/app/types";

type InitialProps = {
  handleDelete: (id: string) => void;
  handleEdit: (product: Product) => void;
  product: Product;
};

const AdminProduct = ({ product, handleEdit, handleDelete }: InitialProps) => {
  return (
    <div className="product">
      <div className="image-product">
        <img
          src={
            product.images && product.images.length > 0
              ? product.images[0]
              : "/placeholder.png"
          }
          width={200}
          height={200}
          alt=""
        />
      </div>
      <h1 className="line-clamp-1">{product.title}</h1>
      <div className="flex star-wrapper gap-2 items-center">
        <div className="flex gap-1"></div>
        <p>{product.rating}/5</p>
      </div>
      <div className="bottom flex gap-4 items-center justify-between">
        <div className="flex gap-2 items-center">
          <p>${product.price}</p>
          {product.discount !== "" ? (
            <>
              <span className="line-through">${product.discount}</span>
              {/* <button className="percent-button">-{calculate()}%</button> */}
            </>
          ) : (
            ""
          )}
        </div>
        <button onClick={() => handleDelete(product.id!)} className="buttonsss">
          Delete
        </button>
        <button onClick={() => handleEdit(product)} className="buttonsss2">
          Edit
        </button>
      </div>
    </div>
  );
};

export default AdminProduct;
