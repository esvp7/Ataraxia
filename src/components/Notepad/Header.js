import React from 'react';

const Header = ({ handleToggleDarkMode }) => {
	return (
		<div className='mainHead'>
			<h1 className="title">Notepad</h1>
			<button
				onClick={() =>
					handleToggleDarkMode(
						(previousDarkMode) => !previousDarkMode
					)
				}
				className='saveBtn'
			>
				Toggle Mode
			</button>
		</div>
	);
};

export default Header;