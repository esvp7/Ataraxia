import React, {useEffect, useState} from 'react';
import { Provider } from './context/context';
import Income from "./Income";
import IncomeForm from "./IncomeForm";
import ExpenseForm from "./ExpenseForm";
import Expense from "./Expense";
import Balance from "./Balance";

const FinanceManager = () => {
  const [activeCategory, setActiveCategory] = useState("");
  const [showForm, setShowForm] = useState(false);
  useEffect(() => {
    document.title = `Finance Assistant: Ataraxia`;
  });

  return (
    <Provider>
    <div className="budget-tracker-container">
      <div onClick={() => setActiveCategory("income")}>
        <Income activeCategory={activeCategory} setShowForm={setShowForm}/>
      </div>
      {showForm && activeCategory === "income" && <IncomeForm setShowForm={setShowForm} />}
      <div onClick={() => setActiveCategory("expense")}>
        <Expense activeCategory={activeCategory} setShowForm={setShowForm}/>
      </div>
      {showForm && activeCategory === "expense" && <ExpenseForm setShowForm={setShowForm} />}
      <div onClick={() => setActiveCategory("balance")}>
        <Balance />
      </div>
    </div>
    </Provider>
  )
}

export default FinanceManager;