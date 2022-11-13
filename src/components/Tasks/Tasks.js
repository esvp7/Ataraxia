import React, { useState, useEffect, useMemo } from "react";
import { useTasks } from '../../hooks';
import { FaEdit } from 'react-icons/fa';
import { collatedTasks } from '../../constants';
import { useSelectedProjectValue, useProjectsValue } from '../../context';
import { getTitle, getCollatedTitle, collatedTasksExist } from '../../helpers';
import Checkbox from './Checkbox';
import AddTask from './AddTask';
import EditTask from './EditTask';
import Analytics from '../Analytics/Analytics';
import Paginate from "../Pagination";
import Notepad from '../Notepad/Notepad';
import FinanceManger from '../FinanceManager/FinanceManager';
import TimeTracker from '../TimeTracker/TimeTracker';
import Calendar from '../Calendar/Calendar';
import Mindmap from '../Mindmap/Mindmap';
import PomodoroTimer from '../PomodoroTimer/PomodoroTimer';
import SearchTasks from './SearchTasks';
import PriorityStars from "./PriorityStars";
import { Slider } from "@mui/material";

const Tasks = ({ activeValue = null }) => {
  const [activeTask, setActiveTask] = useState(activeValue);
  const [ isSelecting, setIsSelecting ] = useState(false);
  const seen = new Set();
  const [category, setCategory] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('')
  const [sortBy, setSortBy] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [searchText, setSearchText] = useState('');
  const { selectedProject, active } = useSelectedProjectValue();
  const { projects } = useProjectsValue();
  const { tasks } = useTasks(selectedProject);
  const [currentPage, setCurrentPage] = useState(1);
  const [tasksPerPage] = useState(4);
  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  let currentTasks = tasks?.slice(indexOfFirstTask, indexOfLastTask);
  const filteredResults = currentTasks.filter((task) =>
  task.task.toLowerCase().includes(searchText));
  const filteredCategories = filteredResults.filter(el => {
    const duplicate = seen.has(el.category);
    seen.add(el.category);
    return !duplicate;
  });

  const paginate = pageNumber => setCurrentPage(pageNumber);

  const handleChange = (e) => {
    setSelectedCategory(e.target.value);
  }
  const onChange = (e) => {
    setSortBy(e.target.value);
  }

  let projectName = '';

  if (collatedTasksExist(selectedProject) && selectedProject) {
    projectName = getCollatedTitle(collatedTasks, selectedProject).name;
  }

  if (
    projects && 
    projects.length > 0 &&
    selectedProject &&
    !collatedTasksExist(selectedProject)
  ) {
    projectName = getTitle(projects, selectedProject).name;
  }

  if (sortBy === 'descending') {
    filteredResults.sort((a,b) =>  b.priority - a.priority );
  } if (sortBy === 'ascending') {
    filteredResults.sort((a, b) => a.priority - b.priority);
  } if (sortBy === 'descIdx') {
    filteredResults.sort((a,b) =>  b.indexId- a.indexId );
  } if (sortBy === 'ascIdx') {
    filteredResults.sort((a, b) => a.indexId - b.indexId);
  } if (sortBy === 'descProgress') {
    filteredResults.sort((a, b) => b.progress - a.progress);
  } if (sortBy === 'ascProgress') {
    filteredResults.sort((a, b) => a.progress - b.progress);
  }
  
  
  useEffect(() => {
    document.title = `${projectName}: Ataraxia`;
  });

  const toggleEditMode = () => setIsEditing(!isEditing);

  const getFilteredList = () => {
    if (!selectedCategory) {
      return filteredResults
    }
    return filteredResults.filter((item) => item.category === selectedCategory);
  }
  var filteredList = useMemo(getFilteredList, [selectedCategory, filteredResults]);

  return (
    <div className={
      active === 'calendar' ? 'tasks tasks-lg' :
      'tasks'}
    >
      { active !== 'analytics' &&
        active !== 'notepad' &&
        active !== 'finance' &&
        active !== 'timetracker' &&
        active !== 'calendar' && 
        active !== 'mindmap' && 
        active !== 'pomodoro' && (
        <>
    <div className="heading-div">
    <h2>{projectName}</h2>
    <div className="dropdown-items">
    <select className="select select1" onChange={handleChange}>
      <option value="">Category</option>
      {filteredCategories?.map((task) => (
        <option key={task.id} value={task.category}>
          {task.category}</option>
        ))}
      </select>
      <select value={sortBy} onChange={onChange} className="select">
        <option value="">Order By</option>
        <option value="descending">Most Important</option>
        <option value="ascending">Least Important</option>
        <option value="descProgress">Most Progressed</option>
        <option value="ascProgress">Least Progressed</option>
        <option value="ascIdx">First Created</option>
        <option value="descIdx">Last Created</option>
      </select>
      </div>
    </div>
    <SearchTasks handleSearchTask={setSearchText}/>
    <ul className="active tasks__list">
    {filteredList?.map((task) => (
          <li key={`${task.id}`} onMouseLeave={() => setIsSelecting(false)}>
            <Checkbox id={task.id} taskDesc={task.task}/>
            <div
            className="tasks-flex-container"
            role="button"
            onClick={(e) => {
              setActiveTask(task)
            }}
            >
            {isSelecting && (
            <span 
              onClick={toggleEditMode}>
                <FaEdit />
              </span>
            )}
            <span className="edit-mode-hover"
            onMouseOver={() => setIsSelecting(true)}
            >{task.task}</span>
            <PriorityStars priority={task.priority}/>
            </div>
            <Slider 
              aria-label="Progress Status"
              className="progress-slider"
              style={{ width: '20%' }}
              size="small"
              value={task.progress}
              defaultValue={task.progress}
              valueLabelDisplay="auto"/>
          </li>
        ))}
        {isEditing && (
        <EditTask setIsEditing={setIsEditing} activeTask={activeTask} id={activeTask.id}/>
        )}
    </ul>
    <AddTask category={category} setCategory={setCategory} />
    {tasks.length > tasksPerPage &&
            <Paginate
             tasksPerPage={tasksPerPage}
             totalTasks={tasks.length}
             paginate={paginate}
            />
            }
    </>
    )}
    { active === 'analytics' && (
      <>
      <h2>{projectName}</h2>
      <Analytics projectName={projectName} />
      </>
    )}
    { active === 'notepad' && (
      <Notepad />
    )}
    { active === 'finance' && (
      <FinanceManger />
    )}
    { active === 'timetracker' && (
      <TimeTracker />
    )}
    { active === 'pomodoro' && (
      <PomodoroTimer />
    )}
    { active === 'calendar' && (
      <Calendar />
    )}
    { active === 'mindmap' && (
      <Mindmap />
    )}
  </div>
  )
}

export default Tasks;