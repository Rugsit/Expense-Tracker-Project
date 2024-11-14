import { useContext, useRef, useState } from "react";
import {context} from "./App"

function AddTransaction() {
  let [error, setError] = useState("");
  const text = useRef(null);
  const value = useRef(null);

  let {data, setData} = useContext(context);

  const addTrans = async () => {
    try {
      if (text.current.value.trim() == "" || value.current.value.trim() == "") {
        throw new Error("Input must not be empty.");
      }
      if (!parseInt(value.current.value.trim())) {
        throw new Error("Amount must be numeric.")
      }

      let newObject = {
        "text" : text.current.value, 
        "value" : parseInt(value.current.value.trim())
      };

      let response = await fetch("https://672e0068fd89797156449c94.mockapi.io/expense", {
        method: "POST",
        headers: {
          "Content-Type": 'application/json',
        },
        body: JSON.stringify(newObject),
      });
      let newData = await response.json();
      text.current.value = "";
      value.current.value = "";
      setData([...data, newData]);
      setError("");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="mt-8">
      <p className="font-bold text-2xl">
        Add new transaction
      </p>
      <div className="border-t-2 mt-3 pt-3">
        <p className="font-bold text-1xl mb-3">Text</p>
        <input ref={text} className="border-2 rounded-md h-10 w-full mb-3 px-3"/>
        <p className="font-bold text-1xl mb-1">Amount</p>
        <p className="mb-3">(negative - expense, positive - income)</p>
        <input ref={value} className="border-2 rounded-md h-10 w-full mb-5 px-3"/>
        <p className="text-red-500 mb-3">{error}</p>
        <button onClick={addTrans} className="text-center w-full h-10 mb-20 text-white bg-indigo-500 rounded-md active:bg-indigo-400 transition-colors">Add transaction</button>
      </div>
    </div>
  );
}

export default AddTransaction;
