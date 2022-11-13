import React, { useState, useContext } from 'react';
import AddButton from './AddButton';
import useTransactions from './useTransactions';
import Paginate from "../Pagination";
import { FaCheckCircle } from 'react-icons/fa';
import { ExpenseTrackerContext } from "./context/context";
import { Chart as ChartJS, ArcElement } from 'chart.js';
import { Pie, Bar, Doughnut } from 'react-chartjs-2';
ChartJS.register(ArcElement);

const Expense = ({ setShowForm }) => {
  const { expenseData, expenseTransactions, totalExpense} = useTransactions();
  const { setSelectedTransaction } = useContext(ExpenseTrackerContext);
  const [chartType, setChartType] = useState("pie");
  const [currentPage, setCurrentPage] = useState(1);
  const [expensePerPage] = useState(3);
  const indexOfLastExpense = currentPage * expensePerPage;
  const indexOfFirstExpense = indexOfLastExpense - expensePerPage;
  const  currentExpense = expenseTransactions?.slice(indexOfFirstExpense, indexOfLastExpense);
  const paginate = pageNumber => setCurrentPage(pageNumber);
  const handleChange = (e) => {
    setChartType(e.target.value)
  };
  
  return (
    <div className="box-around pink">
      <div className="transaction-heading">
      <h1 className="transaction-title red">Expenses: ${totalExpense}</h1>
      <div className="createBtn-cont">
      <AddButton setShowForm={setShowForm} />
      </div>
      <select value={chartType} onChange={handleChange} className="graphs-dropdown border-radius">
      <option value="pie">Pie Chart</option>
      <option value="doughnut">Doughnut Chart</option>
      <option value="bar">Bar Chart</option>
    </select>
    </div>
    <div className="data-container">
    {currentExpense &&
    currentExpense.map((expenseTransaction) => (
      <li
        key={expenseTransaction}
        className="sidebar__project"
        onClick={() => setSelectedTransaction(expenseTransaction)}
      >
        <span className="sidebar__dot checks"><FaCheckCircle /></span>
        <span className="sidebar__project-name done-tasks"
        onClick={() => setShowForm(true)}>
        {expenseTransaction.title}
        ${expenseTransaction.amount}</span>
      </li>
    ))}
        {expenseTransactions.length > expensePerPage &&
            <Paginate
             tasksPerPage={expensePerPage}
             totalTasks={expenseTransactions.length}
             paginate={paginate}
            />
            }
    {expenseTransactions.length === 0 && <span className="sidebar__project-name">
      You have no current expenses
    </span>}
    <div className='graphs-contain'>
    {chartType === "pie" && (<Pie data={expenseData} />)}
    {chartType === "doughnut" && (<Doughnut data={expenseData} />)}
    {chartType === "bar" && (<Bar data={expenseData} />)}
  </div>
  </div>
    </div>
  )
}

export default Expense;