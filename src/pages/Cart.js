import { useState } from "react";
import Data from "../Data";
import styled from "styled-components";

function Cart() {
  const [product, setProduct] = useState(Data);

  const ProductHistory = styled.div`
    margin: 10px 0;
    padding: 10px;
    border-style: solid;
    border-width: 1px;
  `;
  return (
    <div>
      {product.map((a, i) => (
        <div>
          <ProductHistory>
            <span>{product[i].id + 1}.</span>
            <span>{product[i].title}</span>
            <span>{product[i].content}</span>
            <div>{product[i].info}</div>
          </ProductHistory>
        </div>
      ))}
      ;
    </div>
  );
}

export default Cart;
