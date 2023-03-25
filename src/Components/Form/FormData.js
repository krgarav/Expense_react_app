import React from "react";

const FormData = (props) => {
    const [totalValue, setTotalValue] = useState(valueSum);
    const data = localStorage;
    const arrData = [];
    var valueSum = 0;
    for (let [, j] of Object.entries(data)) {
      valueSum += Number(JSON.parse(j).sellingPrice);
      arrData.unshift(JSON.parse(j));
    }
    const onSubmit=()=>{
      setTotalValue(valueSum)
    }
  return (
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
  );
};
export default FormData;
