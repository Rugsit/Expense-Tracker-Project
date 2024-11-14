import { useContext, useEffect, useState } from "react";
import { context } from "./App";

function Balance() {
  let {data, setData} = useContext(context);
  let [balance, setBalance] = useState(0);
  let [income, setIncome] = useState(0);
  let [expense, setExpense] = useState(0);

  const fetchData = async () => {
    const response = await fetch("https://672e0068fd89797156449c94.mockapi.io/expense"); 
    const rawData = await response.json();
    const valueList = rawData.map( item => item.value);
    let totalBalance;
    if (valueList.length == 0) {totalBalance = 0;}
    else totalBalance = valueList.reduce( (acc, cur) => {
      return acc + cur;
    });

    const incomeList = valueList
    .filter( (item) => {
      return item > 0;
    });
    let totalIncome;
    if (incomeList.length == 0) {totalIncome = 0;}
    else totalIncome = incomeList.reduce( (acc, cur) => {
      return acc + cur;
    });

    const expenseList = valueList
    .filter( (item) => {
      return item < 0;
    });
    let totalExpense;
    if (expenseList.length == 0) {totalExpense = 0;}
    else totalExpense = expenseList.reduce( (acc, cur) => {
      return acc + cur;
    });
    setExpense(totalExpense);
    setIncome(totalIncome);
    setBalance(totalBalance);
  }

  useEffect( () => {
    fetchData();
    console.log("balance test");
  }, [data]);
  return (
    <div className="my-10 w-full">
      <p className="font-bold text-2xl">YOUR BALANCE</p>
      <p className="font-bold text-4xl">{ balance.toFixed(2) >= 0 ? "" : "-" }${ balance.toFixed(2) > 0 ? balance.toFixed(2) : balance.toFixed(2) * -1}</p>
      <div className="flex text-center px-5 py-7 mt-5 shadow-lg w-full">
        <div className="w-1/2 border border-l-0 border-t-0 border-b-0 border-r-2">
          <p className="font-bold">INCOME</p>
          <p className="text-lime-500 font-bold">+${income.toFixed(2)}</p>
        </div>
        <div className="w-1/2">
          <p className="font-bold">EXPENSE</p>
          <p className="font-bold text-rose-500">-${-1 * expense.toFixed(2)}</p>
        </div>
      </div>
    </div>
  )
}

export default Balance;
