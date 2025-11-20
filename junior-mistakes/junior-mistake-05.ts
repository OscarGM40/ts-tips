//! Error: not using built-in utility types (like Partial, Record<K,V>, Omit<T,K>, Exclude<T,U>,etc)

interface IProduct {
  id: number;
  title: string;
  description: string;
  thumbnail: string;
  price: number;
  rating: number;
}

// it doesn't make sense to create this kind of types

/* interface IUpdateProduct {
  title?: string;
  description?: string;
  thumbnail?: string;
  price?: number;
  rating?: number;
} */

function updateProduct(
  productId: IProduct["id"],
  updatedProduct: Partial<Omit<IProduct, keyof Pick<IProduct, "id">>>,
) {
  // logic to update the product
  return void 0;
}

//
type Properties = "red" | "green" | "blue";
// this is a labeled tuple [name:type, name: type] I can use an unlabeled tuple [number,number,number] (a tuple fixes the length and types, so it makes sense in things like representing a RGB, for example, very intuitive) Labeled co
type RGB = [red: number, green: number, blue: number];
const color: Record<Properties, RGB> = {
  red: [255, 0, 0],
  green: [0, 255, 0],
  blue: [0, 0, 255],
};

const redValue = color.red[0]