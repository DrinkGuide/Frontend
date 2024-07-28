import { useState } from "react";
import Data from "../Data";

function Cart() {
  const [product, setProduct] = useState(Data);

  return (
    <div>
      {product.map((a, i) => (
        <div>
          <div>{product[i].id}</div>
          <div>{product[i].title}</div>
          <div>{product[i].content}</div>
          <div>{product[i].info}</div>
        </div>
      ))}
      ;
    </div>
  );
}

export default Cart;
