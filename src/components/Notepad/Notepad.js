import { useState, useContext, useEffect } from 'react';
import NotesList from './NotesList';
import Search from './Search';
import Header from './Header';
import Paginate from "../Pagination";
import { NotesContext } from './context';

const Notepad = () => {
	const {state, darkMode, setDarkMode} = useContext(NotesContext);
	const notes = state;
	const [currentPage, setCurrentPage] = useState(1);
	const [notesPerPage] = useState(3);
	const indexOfLastTask = currentPage * notesPerPage;
	const indexOfFirstTask = indexOfLastTask - notesPerPage;
	const currentNotes = notes?.slice(indexOfFirstTask, indexOfLastTask);
	const paginate = pageNumber => setCurrentPage(pageNumber);

	const [searchText, setSearchText] = useState('');

	useEffect(() => {
		document.title = `Notepad: Ataraxia`;
	  });

	return (
		<div className={`${darkMode && 'dark-mode'}`}>
			<div className="cont">
				<Header handleToggleDarkMode={setDarkMode} />
				<Search handleSearchNote={setSearchText} />
				<NotesList
					notes={currentNotes.filter((note) =>
						note.text.toLowerCase().includes(searchText)
					)}
				/>
			{notes.length > notesPerPage &&
            <Paginate
             tasksPerPage={notesPerPage}
             totalTasks={notes.length}
             paginate={paginate}
            />
            }
			</div>
		</div>
	);
};

export default Notepad;