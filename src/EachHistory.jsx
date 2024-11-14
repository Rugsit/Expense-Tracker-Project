import { useContext, useState } from "react"
import { context } from "./App"

export default function EachHistory({id, task, value}) {
  let {data, setData} = useContext(context);

  const deleteTask = async () => {
    let response = await fetch(`  https://672e0068fd89797156449c94.mockapi.io/expense/${id}`, {
      method: "DELETE",
    })
    setData(data.filter((item) => {
      if (item.id != id) return item;
    }))
  }
  return (
  <div>
    <div className={`items-center relative flex justify-between my-1 shadow-md px-5 py-3 ${value > 0 ? "border-r-4 border-lime-500" : "border-r-4 border-red-500"}`}>
      <p>{task}</p>
      <p>{value}</p>
      <div className="absolute -left-10 p-2 bg-gray-300 text-white rounded-lg cursor-pointer hover:bg-red-500 transition-all hover:scale-110" onClick={deleteTask}>
        <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fill="none" d="M0 0h24v24H0V0z"></path><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"></path></svg>
      </div>
    </div>
  </div>
  )
}
