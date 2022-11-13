import React, { useState, useReducer, createContext } from "react";
import contextReducer from './contextReducer';

const initialState = JSON.parse(localStorage.getItem('inputs')) || [];

export const TimeTrackerContext = createContext(initialState);

export const Provider = ({ children }) => {
	const [state, dispatch] = useReducer(contextReducer, initialState);
	const [showForm, setShowForm] = useState(false);
	const [selectedInput, setSelectedInput] = useState(null);

	const deleteInput = (id) => {
		dispatch({ type: 'DELETE_INPUT', payload: id});
	}

	const addInput = (state) => {
		dispatch({ type: 'ADD_INPUT', payload: state});
	}

	const updateInput = (state) => {
		dispatch({ type: 'UPDATE_INPUT', payload: state});
	}

	return (
		<TimeTrackerContext.Provider value={{ 
			state,
			deleteInput,
			addInput,
			updateInput,
			setShowForm,
			showForm,
            selectedInput, 
            setSelectedInput
		}}>
		    {children}
		</TimeTrackerContext.Provider>
	);
}