import React from 'react';
import { MdSearch } from 'react-icons/md';

const SearchTasks = ({ handleSearchTask }) => {
	return (
		<div className='searchInput' style={{'height': '40px'}}>
			<MdSearch className='searchIcons' size='1.3em' />
			<input
				onChange={(event) =>
					handleSearchTask(event.target.value)
				}
				type='text'
				placeholder='type to search...'
			/>
		</div>
	);
};

export default SearchTasks;