import { useContext, useEffect, useState } from "react";
import { context } from "./App";
import EachHistory from "./EachHistory";

function History() {
  let {data, setData} = useContext(context);
  const fetchData = async () => {
    const response = await fetch("https://672e0068fd89797156449c94.mockapi.io/expense"); 
    const rawData = await response.json();
    setData(rawData);
  }

  useEffect ( () => {
    fetchData();
  }, [])

  return (
    <>
      <p className="font-bold text-2xl">History</p>
      <div className="border-t-2 mt-3 pt-3">
        {
          data.map((item, index) => {
            return (
              <EachHistory id={item.id} task={item.text} value={item.value} key={index}/>
            )
          })
        }
      </div>
    </>
  )
}

export default History;
