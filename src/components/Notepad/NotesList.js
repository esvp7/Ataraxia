import React, { useState, useContext } from "react";
import { MdDeleteForever } from 'react-icons/md';
import { NotesContext } from "./context";
import AddNote from './AddNote';

const NotesList = ({
	notes
}) => {
	const { deleteNote } = useContext(NotesContext);
	const [currentNote, setCurrentNote] = useState(null);
	const [prevText, setPrevText] = useState("");
	return (
		<div className='stickyNote-lists'>
		{notes.map((note) => (
		<div className='stickyNote' key={note.id} onClick={() => {
			setCurrentNote(note)
			setPrevText(note.text)}}>
		<span>{note.text}</span>
		<div className='stickyNote-footing'>
			<small>{note.date}</small>
			<MdDeleteForever
				onClick={() => deleteNote(note.id)}
				className='deleteBtn'
				size='1.3em'
			/>
		</div>
	</div>
			))}
			<AddNote 
			  currentNote={currentNote} 
			  setCurrentNote={setCurrentNote}
			  prevText={prevText}
			  setPrevText={setPrevText}/>
		</div>
	);
};

export default NotesList;