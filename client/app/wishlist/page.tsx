import { getProducts, getWishlistId } from "@/service/api";
import Image from "next/image";

type Product = {
  id: number;
};

const Wishlist = async () => {
  const wishlistId = await getWishlistId();
  const products: Product[] = await getProducts();

  const findProduct = wishlistId.map((id) =>
    products.find((product) => product.id === id.product_id)
  );

  //   console.log(findProduct);

  return (
    <article className="pt-15 p-4">
      {findProduct.length !== 0 ? (
        findProduct.map((wishlistId) => (
          <div key={wishlistId.id}>
            <Image
              src={wishlistId.image}
              width={100}
              height={100}
              alt="product image"
            />
          </div>
        ))
      ) : (
        <h1>hello world</h1>
      )}
    </article>
  );
};

export default Wishlist;
