import { useState, useContext } from 'react';
import dayjs from "dayjs";
import { nanoid } from 'nanoid';
import { NotesContext } from './context';


const AddNote = ({
	currentNote,
	setCurrentNote,
	prevText,
	setPrevText
}) => {
	const { addNote, updateNote } = useContext(NotesContext);
    const [text, setText] = useState("");
	const characterLimit = 200;

	const handleSaveClick = (e) => {
		e.preventDefault();
		const noteContent = {
		text: currentNote !== null ? prevText : text,
		id: currentNote !== null ? currentNote?.id : nanoid(),
		date: currentNote !== null ? currentNote?.date : dayjs().format("DD-MM-YY"),
		}
		if (currentNote !== null) {
			updateNote(noteContent);
			setPrevText("");
			setCurrentNote(null);
		} else {
			addNote(noteContent);
			setText("");
			setCurrentNote(null);
		}
	};

	return (
		<div className='stickyNote newNote'>
			{!currentNote && (
			<input
				rows='8'
				cols='10'
				type="text"
				value={text}
				onChange={(e) => setText(e.target.value)}
			/>
			)}
			{currentNote && (
			<input
			rows='8'
			cols='10'
			type="text"
			value={prevText}
			onChange={(e) => setPrevText(e.target.value)}
		/>
			)}
			<div className='stickyNote-footing'>
				<small> {characterLimit - text.length} Remaining
				</small>
				<span
				  className='saveBtn' 
				  type='submit'
				  onClick={handleSaveClick}>
					{currentNote !== null ? 'Update Note' : 'Add Note'}
				</span>
			</div>
		</div>
	);
};

export default AddNote;