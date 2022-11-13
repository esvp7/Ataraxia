import React from 'react'
import { useSelectedProjectValue } from '../context';

const ToolsList = () => {
  const { setActive } = useSelectedProjectValue();
  return (
    <div>
        <ul className="project-overlay___list">

            <li className='sidebar__project'
              onClick={() => setActive('notepad')}>
                <span className="sidebar__dot">•</span>
                Notepad
            </li>

            <li className='sidebar__project'
              onClick={() => setActive('finance')}>
                <span className="sidebar__dot">•</span>
                Finance Assistant
            </li>

            <li className='sidebar__project'
              onClick={() => setActive('timetracker')}>
                <span className="sidebar__dot">•</span>
                Time Tracker
            </li>

            <li className='sidebar__project'
              onClick={() => setActive('pomodoro')}>
                <span className="sidebar__dot">•</span>
                Pomodoro Timer
            </li>

            <li className='sidebar__project'
              onClick={() => setActive('calendar')}>
                <span className="sidebar__dot">•</span>
                Calendar
            </li>

            <li className='sidebar__project'
              onClick={() => setActive('mindmap')}>
                <span className="sidebar__dot">•</span>
                Mind Map
            </li>
        </ul>
    </div>
  )
}

export default ToolsList;