import React, { useState} from 'react';
import useTransactions from './useTransactions';
import { Chart as ChartJS, ArcElement } from 'chart.js';
import { Pie, Bar, Doughnut } from 'react-chartjs-2';
ChartJS.register(ArcElement);

const Income = () => {
  const { balanceData, balance, income, expenses } = useTransactions();
  const [chartType, setChartType] = useState("pie");
  const handleChange = (e) => {
    setChartType(e.target.value)
  };
  
  return (
    <div className="box-around purple">
      <div className="transaction-heading balance-heading">
      <h1 className="transaction-title dark-purple">Balance: ${balance}</h1>
      <select value={chartType} onChange={handleChange} className="graphs-dropdown border-radius">
      <option value="pie">Pie Chart</option>
      <option value="doughnut">Doughnut Chart</option>
      <option value="bar">Bar Chart</option>
    </select>
    </div>
    <div className="data-container">
    {income === 0 && expenses === 0 && <span className="sidebar__project-name">
      Your balance is empty
    </span>}
    <div className='graphs-contain balance-graph'>
    {chartType === "pie" && (<Pie data={balanceData} />)}
    {chartType === "doughnut" && (<Doughnut data={balanceData} />)}
    {chartType === "bar" && (<Bar data={balanceData} />)}
  </div>
  </div>
    </div>
  )
}

export default Income