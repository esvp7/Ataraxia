import { useContext } from 'react';
import { resetCategories, incomeCategories, expenseCategories } from './categories';
import { ExpenseTrackerContext } from './context/context';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title } from 'chart.js';

ChartJS.register(
  ArcElement, 
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip, 
  Legend);

const useTransactions = () => {
  resetCategories();
  const { state } = useContext(ExpenseTrackerContext);
  const incomeTransactions = state.filter((t) => t.type === 'Income');
  const expenseTransactions = state.filter((t) => t.type === 'Expense');
  const totalIncome = incomeTransactions.reduce((acc, currVal) => acc += currVal.amount, 0);
  const totalExpense = expenseTransactions.reduce((acc, currVal) => acc += currVal.amount, 0);
  const balance = totalIncome - totalExpense;
  const income = incomeTransactions.length;
  const expenses = expenseTransactions.length; 

  incomeTransactions.forEach((t) => {
    const category = incomeCategories.find((c) => c.type === t.category);
    if (category) category.amount += t.amount;
  });
  const filteredIncomeCategories = incomeCategories.filter((sc) => sc.amount > 0);
  const incomeData = {
    datasets: [
      {
        data: filteredIncomeCategories.map((c) => c.amount),
        backgroundColor: filteredIncomeCategories.map((c) => c.color),
      }
    ],
    labels: filteredIncomeCategories.map((c) => c.type),
    tooltips: {
      callbacks: {
      label: function(tooltipItem, data) {
        var index = tooltipItem.index;
        return incomeData.labels[index];
      }
    }
  }
  };

  expenseTransactions.forEach((t) => {
    const category = expenseCategories.find((c) => c.type === t.category);
    if (category) category.amount += t.amount;
  });
  const filteredExpenseCategories = expenseCategories.filter((sc) => sc.amount > 0);
  const expenseData = {
    datasets: [
      {
        data: filteredExpenseCategories.map((c) => c.amount),
        backgroundColor: filteredExpenseCategories.map((c) => c.color),
      }
    ],
    labels: filteredExpenseCategories.map((c) => c.type),
    tooltips: {
      callbacks: {
      label: function(tooltipItem, data) {
        var index = tooltipItem.index;
        return incomeData.labels[index];
      }
    }
  }
  };

  const balanceData = {
    datasets: [
      {
        data: [totalIncome, totalExpense],
        backgroundColor: [
          'rgb(173, 216, 230)',
          'rgb(245, 198, 191)',
        ],
      }
    ],
    labels: ['Income', 'Expenses'],
    tooltips: {
      callbacks: {
      label: function(tooltipItem, data) {
        var index = tooltipItem.index;
        return balanceData.labels[index];
      }
    }
  }
  };
  
  return { 
    incomeTransactions,
    expenseTransactions,
    totalIncome,
    totalExpense,
    balance,
    incomeData,
    expenseData,
    income, 
    expenses,
    balanceData,
   };
};

export default useTransactions;