import React, { useState, useReducer, createContext } from "react";
import contextReducer from './contextReducer';

const initialState = JSON.parse(localStorage.getItem('transactions')) || [];

export const ExpenseTrackerContext = createContext(initialState);

export const Provider = ({ children }) => {
	const [state, dispatch] = useReducer(contextReducer, initialState);
    const [activeCategory, setActiveCategory] = useState("");
	const [showForm, setShowForm] = useState(false);
	const [selectedTransaction, setSelectedTransaction] = useState(null);

	const deleteTransaction = (id) => {
		dispatch({ type: 'DELETE_TRANSACTION', payload: id});
	}

	const addTransaction = (state) => {
		dispatch({ type: 'ADD_TRANSACTION', payload: state});
	}

	const updateTransaction = (state) => {
		dispatch({ type: 'UPDATE_TRANSACTION', payload: state});
	}

	return (
		<ExpenseTrackerContext.Provider value={{ 
			state,
			deleteTransaction,
			addTransaction,
			updateTransaction,
            activeCategory,
            setActiveCategory,
			setShowForm,
			showForm,
			selectedTransaction, 
			setSelectedTransaction,
		}}>
		    {children}
		</ExpenseTrackerContext.Provider>
	);
}