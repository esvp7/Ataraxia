import React, { useState, useReducer, createContext, useEffect } from "react";
import contextReducer from './contextReducer';

export const initialState = JSON.parse(localStorage.getItem('notes')) || [];
export const darkModeState = JSON.parse(localStorage.getItem('darkMode')) || false;
export const activeNoteState = JSON.parse(localStorage.getItem('activeNote')) || null;

export const NotesContext = createContext(initialState);

export const NotesProvider = ({ children }) => {
	const [state, dispatch] = useReducer(contextReducer, initialState);
    const [activeNote, setActiveNote] = useState(null);
	const [darkMode, setDarkMode] = useState(darkModeState);

	useEffect(() => {
		localStorage.setItem("darkMode", JSON.stringify(darkMode));
		localStorage.setItem("activeNote", JSON.stringify(activeNote));
	  }, [darkMode, activeNote]);

	const deleteNote = (id) => {
		dispatch({ type: 'DELETE_NOTE', payload: id});
	}

	const addNote = (state) => {
		dispatch({ type: 'ADD_NOTE', payload: state});
	}

	const updateNote = (state) => {
		dispatch({ type: 'UPDATE_NOTE', payload: state});
	}

	return (
		<NotesContext.Provider value={{ 
			state,
            deleteNote,
            addNote,
			updateNote,
            activeNote,
            setActiveNote,
			darkMode,
			setDarkMode
		}}>
		    {children}
		</NotesContext.Provider>
	);
}