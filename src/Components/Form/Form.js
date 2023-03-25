import React, { useState } from "react";
import Input from "../Inputs/Input";

const Form = (props) => {
  const arrData = [];
  var valueSum = 0;
  // for (let [, j] of Object.entries(localStorage)) {
  //   valueSum += Number(JSON.parse(j).sellingPrice);
  //   console.log(JSON.parse(j).productName)
  //   arrData.push(JSON.parse(j));
  // }
  //   console.log(localStorage)
  // console.log((localStorage.key(0)))
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    const newkey = JSON.parse(localStorage[key]).productId;
    const value = JSON.parse(localStorage.getItem(newkey));
    valueSum += Number(value.sellingPrice);

    arrData.unshift(value);
  }
  console.log(arrData);

  const [productId, setProductId] = useState("");
  const [sellingPrice, setSellingPrice] = useState("");
  const [productName, setProductName] = useState("");
  const [totalValue, setTotalValue] = useState(valueSum);

  const productIdHandler = (event) => {
    setProductId(event.target.value);
  };
  const sellingPriceHandler = (event) => {
    setSellingPrice(event.target.value);
  };

  const productNameHandler = (event) => {
    setProductName(event.target.value);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    const serialisedObj = JSON.stringify({
      productId: productId,
      sellingPrice: sellingPrice,
      productName: productName,
    });

    localStorage.setItem(productId, serialisedObj);

    const newValue = +sellingPrice;
    setTotalValue(valueSum + newValue);
    setProductId("");
    setSellingPrice("");
    setProductName("");
  };

  //

  const deleteHandler = (event) => {
    const deleteSellingPrice =
      event.target.parentElement.innerText.split("-")[0];
    const deleteProductName =
      event.target.parentElement.innerText.split("-")[1];
    let valueToRemove = 0;
    let key = "";
    for (let i of arrData) {
      if (
        i.sellingPrice === deleteSellingPrice &&
        i.productName === deleteProductName
      ) {
        key = i.productId;
        valueToRemove = i.sellingPrice;
      }
    }
    localStorage.removeItem(key);
    setTotalValue(() => {
      return valueSum - Number(valueToRemove);
    });
  };

  return (
    <React.Fragment>
      <form onSubmit={submitHandler}>
        <Input
          label="Product Id"
          onChange={productIdHandler}
          value={productId}
        ></Input>
        <Input
          type="number"
          label="Selling Price"
          onChange={sellingPriceHandler}
          value={sellingPrice}
        ></Input>
        <Input
          label="Product name"
          onChange={productNameHandler}
          value={productName}
        ></Input>
        <button type="submit">Add Product</button>
      </form>
      <div>
        <h2>Products</h2>
        <ul>
          {arrData.map((data) => {
            return (
              <li key={Math.random().toString()}>
                {data.sellingPrice}-{data.productName}
                <input
                  type="button"
                  onClick={deleteHandler}
                  value="Delete Item"
                />
              </li>
            );
          })}
        </ul>
        <h4>Total Value worth of Products : Rs{totalValue}/-</h4>
      </div>
    </React.Fragment>
  );
};
export default Form;
