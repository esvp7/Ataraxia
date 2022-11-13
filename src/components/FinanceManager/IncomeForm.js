import React, { useState, useContext } from "react";
import { incomeCategories } from "./categories";
import { ExpenseTrackerContext } from "./context/context";
import { v4 as uuidv4 } from 'uuid';

const initialState = {
  type: 'Income',
  title: '',
  amount: '',
  category: '',
}

const IncomeForm = ({ setShowForm }) => {
  const { 
    setSelectedTransaction,
    selectedTransaction, 
    addTransaction, 
    updateTransaction, 
    deleteTransaction,
  } = useContext(ExpenseTrackerContext);
  const editState = {
    type: selectedTransaction ? selectedTransaction.type : 'Income',
    title: selectedTransaction ? selectedTransaction.title : '',
    amount: selectedTransaction ? selectedTransaction.amount : '',
    category: selectedTransaction ? selectedTransaction.category : '',
  }
  const [formData, setFormData] = useState(selectedTransaction !== null ? editState : initialState);
  const createTransaction = (e) => {
    e.preventDefault();
    const transaction = { 
      ...formData, 
      amount: Number(formData.amount), 
      id: selectedTransaction !== null ? selectedTransaction.id : uuidv4() 
    }
    if (selectedTransaction !== null) {
      setSelectedTransaction(null);
      updateTransaction(transaction);
      setFormData(initialState);
    } else {
      addTransaction(transaction);
      setFormData(initialState);
    }
    setShowForm(false);
  }

  return (
    <div className="h-screen w-full fixed left-0 top-0 flex justify-center items-center eventModal-cont">
      <form className="bg-white rounded-lg shadow-2xl w-1/4">
        <div className="bg-gray-100 px-4 py-2 flex justify-between items-center">
          <span className="material-icons-outlined text-gray-400">
            drag_handle
          </span>
          <div>
            {selectedTransaction && (
              <span
                onClick={() => { 
                  setSelectedTransaction(null)
                  deleteTransaction(selectedTransaction.id);
                  setShowForm(false);
                }}
                className="material-icons-outlined text-gray-400 cursor-pointer"
              >
                delete
              </span>
            )}
            <button 
            onClick={() => {
              setSelectedTransaction(null)
              setShowForm(false)
              }}>
              <span
              className="material-icons-outlined text-gray-400">
                close
              </span>
            </button>
          </div>
        </div>

        <div className="p-3">
          <div className="grid grid-cols-1/6 items-end gap-y-7">
            <div></div>
            <input
              type="text"
              name="title"
              placeholder="Income Title"
              className="pt-3 border-0 text-gray-600 pb-2 w-full border-b-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-red-500"
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
            />


          <input 
            type="number" 
            id="amount" 
            name="amount" 
            step="1" min="1" 
            placeholder="Amount"
            value={formData.amount}
            onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
            />

          <select value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}>
              {incomeCategories && 
                incomeCategories.map((c) => 
                  <option key={c.type} value={c.type}>{c.type}</option>
                )}
          </select>
          </div>
        </div>
        <footer className="flex justify-end border-t p-3 mt-5">
          <span
            type="submit"
            onClick={createTransaction}
            className="bg-red-500 hover:bg-red-600 px-6 py-2 rounded text-white"
          >
            Save
          </span>
        </footer>
      </form>
    </div>
  )
}

export default IncomeForm;