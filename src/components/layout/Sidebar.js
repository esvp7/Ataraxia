import React, {useState} from 'react';
import {
  FaChevronDown,
  FaInbox,
  FaRegCalendarAlt,
  FaRegCalendar,
} from 'react-icons/fa';
import { useSelectedProjectValue } from '../../context';
import AddProject from '../Projects/AddProject';
import Projects from '../Projects/Projects';
import ToolsList from '../ToolsList';

const Sidebar = () => {
  const { setSelectedProject } = useSelectedProjectValue();
  const { active, setActive }= useSelectedProjectValue();
  const [showProjects, setShowProjects] = useState(true);
  const [showTools, setShowTools] = useState(false);
  const [showArchived, setShowArchived] = useState(false);
  return (
    <div className={
    active === 'finance' ? 'sidebar sidebar-fix' : 
    active === 'calendar' ? 'sidebar calendar-fix' : 
    active === 'notepad' ? 'sidebar notepad-fix' : 
    active === 'pomodoro' ? 'sidebar pomodoro-fix' :
    active === 'mindmap' ? 'sidebar mindmap-fix' :
    active === 'timetracker' ? 'sidebar timetracker-fix' :
    'sidebar'}>
    <ul className="sidebar__generic">
      <div className="collated-tasks-container">
      <li
      >
        <div
          role="button"
          onClick={() => {
            setActive('inbox');
            setSelectedProject('INBOX');
          }}
        >
          <span>
            <FaInbox />
          </span>
          <span>Inbox</span>
        </div>
      </li>
      <li
        className={active === 'today' ? 'active' : undefined}
      >
        <div
          role="button"
          onClick={() => {
            setActive('today');
            setSelectedProject('TODAY');
          }}
        >
          <span>
            <FaRegCalendar />
          </span>
          <span>Today</span>
        </div>
      </li>
      <li
        className={active === 'next_7' ? 'active' : undefined}
      >
        <div
          role="button"
          onClick={() => {
            setActive('next_7');
            setSelectedProject('NEXT_7');
          }}
        >
          <span>
            <FaRegCalendarAlt />
          </span>
          <span>Next 7 days</span>
        </div>
      </li>
      </div>

      <div
      className="sidebar__middle"
      onClick={() => setShowTools(!showTools)}
      role="button"
    >
      <span>
        <FaChevronDown
        />
      </span>
      <h2>🛠️ Tools</h2>
    </div>
    <ul className="sidebar__projects">{showTools && <ToolsList />}</ul>
    
    
    <div
      className="sidebar__middle"
      onClick={() => setShowProjects(!showProjects)}
      role="button"
    >
      <span>
        <FaChevronDown/>
      </span>
      <h2>🚀 Projects</h2>
    </div>
    </ul>

    <ul className="sidebar__projects">{showProjects && <Projects />}</ul>

  {showProjects && <AddProject />}

  <div
      className="sidebar__middle"
      onClick={() => {
        setShowArchived(!showArchived)
        setActive('analytics');
        setSelectedProject('ANALYTICS');
      }}
      role="button"
    >
      <span>
        <FaChevronDown/>
      </span>
      <h2>🎉 Done Tasks</h2>
    </div>

    <div
      className="sidebar__middle"
      onClick={() => {
        setShowArchived(!showArchived)
        setActive('kanban');
        setSelectedProject('KANBAN');
      }}
      role="button"
    >
    </div>

    
  </div>
  )
}

export default Sidebar;