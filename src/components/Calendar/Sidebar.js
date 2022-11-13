import React from 'react';
import CreateEventButton from './CreateEventButton';
import SmallCalendar from './SmallCalendar';
import Labels from './context/Labels';

const Sidebar = () => {
  return (
    <aside className="border p-5 w-64 sidebar-container">
    <CreateEventButton />
    <SmallCalendar />
    <Labels />
  </aside>
  )
}

export default Sidebar