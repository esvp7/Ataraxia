import React, { useState, useContext } from 'react';
import AddButton from './AddButton';
import useTransactions from './useTransactions';
import Paginate from "../Pagination";
import { FaCheckCircle } from 'react-icons/fa';
import { ExpenseTrackerContext } from "./context/context";
import { Chart as ChartJS, ArcElement } from 'chart.js';
import { Pie, Bar, Doughnut } from 'react-chartjs-2';
ChartJS.register(ArcElement);

const Income = ({ setShowForm }) => {
  const { incomeData, incomeTransactions, totalIncome } = useTransactions();
  const { setSelectedTransaction } = useContext(ExpenseTrackerContext);
  const [chartType, setChartType] = useState("pie");
  const [currentPage, setCurrentPage] = useState(1);
  const [incomePerPage] = useState(3);
  const indexOfLastIncome = currentPage * incomePerPage;
  const indexOfFirstIncome = indexOfLastIncome - incomePerPage;
  const  currentIncome = incomeTransactions?.slice(indexOfFirstIncome, indexOfLastIncome);
  const paginate = pageNumber => setCurrentPage(pageNumber);
  const handleChange = (e) => {
    setChartType(e.target.value)
  };
  
  return (
    <div className="box-around blue">
      <div className="transaction-heading">
      <h1 className="transaction-title dark-blue">Income: ${totalIncome}</h1>
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
    {currentIncome &&
    currentIncome.map((incomeTransaction) => (
      <li
        key={incomeTransaction.id}
        data-doc-id={incomeTransaction.id}
        className="sidebar__project"
        onClick={() => setSelectedTransaction(incomeTransaction)}
      >
        <span className="sidebar__dot checks"><FaCheckCircle /></span>
        <span className="sidebar__project-name done-tasks"
        onClick={() => setShowForm(true)}>
        {incomeTransaction.title}
        ${incomeTransaction.amount}</span>
      </li>
    ))}
        {incomeTransactions.length > incomePerPage &&
            <Paginate
             tasksPerPage={incomePerPage}
             totalTasks={incomeTransactions.length}
             paginate={paginate}
            />
            }
    {incomeTransactions.length === 0 && <span className="sidebar__project-name">
      You have no current income
    </span>}
    <div className='graphs-contain'>
    {chartType === "pie" && (<Pie data={incomeData} />)}
    {chartType === "doughnut" && (<Doughnut data={incomeData} />)}
    {chartType === "bar" && (<Bar data={incomeData} />)}
  </div>
  </div>
    </div>
  )
}

export default Income