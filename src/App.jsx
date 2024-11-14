import History from './History'
import Balance from './Balance'
import AddTransaction from './AddTransaction'
import { createContext, useState } from 'react'

export const context = createContext(null);
export default function App() {
  let [data, setData] = useState([]);
  return (
    <context.Provider value={{
      data, 
      setData,
    }} >
      <div className="w-fit mx-auto mt-16">
        <p className="font-bold text-4xl bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% text-transparent bg-clip-text h-12">
          Expense Tracker by Rugsit
        </p>
        <Balance />
        <History />
        <AddTransaction />
      </div>
    </context.Provider>
  )
}
