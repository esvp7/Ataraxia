import React, {useState} from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title } from 'chart.js';
import { Pie, Bar, Doughnut } from 'react-chartjs-2';
import { useSelectedProjectValue, useProjectsValue } from '../../context';
import { useTasks } from '../../hooks';
import { FaCheckCircle } from 'react-icons/fa';
import Paginate from "../Pagination";

ChartJS.register(
  ArcElement, 
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip, 
  Legend);

const Analytics = () => {
  const [chartType, setChartType] = useState("pie");
  const [ isSelecting, setIsSelecting ] = useState(false);
  const { selectedProject, setSelectedProject } = useSelectedProjectValue();
  const { archivedTasks } = useTasks(selectedProject);
  const { tasks } = useTasks(selectedProject);
  const [currentPage, setCurrentPage] = useState(1);
  const [tasksPerPage] = useState(6);
  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const  currentArchivedTasks = archivedTasks?.slice(indexOfFirstTask, indexOfLastTask);
  const paginate = pageNumber => setCurrentPage(pageNumber);
  const { projects } = useProjectsValue();
  const arr1 = tasks.length;
  const arr2 = archivedTasks.length;
  const remainingTasks = arr1 - arr2;
  const data = {
    labels: ['Done Tasks', 'Remaining Tasks', 'Total Tasks'],
    datasets: [
      {
        label: 'Tasks State',
        data: [archivedTasks.length, remainingTasks, tasks.length],
        backgroundColor: [
          'rgba(255, 198, 170)',
          'rgba(255, 172, 132)',
          'rgba(244, 141, 92)',
        ],
      },
    ],
  };
  

  const handleChange = (e) => {
    setChartType(e.target.value)
  };

  return (
    <>
    <select value={chartType} onChange={handleChange} className="graphs-dropdown">
      <option value="pie">Pie Chart</option>
      <option value="doughnut">Doughnut Chart</option>
      <option value="bar">Bar Chart</option>
    </select>

    <button className="add-task__submit padding-left" 
    onMouseOver={() => setIsSelecting(true)}>
      Select Category</button>
     
     {isSelecting && (
    <li className="project-delete-modal justify" 
    onMouseLeave={() => setIsSelecting(false)}>
    <div className="project-delete-modal__inner">
    <ul onClick={() => setSelectedProject("INBOX")}>Inbox</ul>
    <ul onClick={() => setSelectedProject("TODAY")}>Today</ul>
    <ul onClick={() => setSelectedProject("NEXT_7")}>Next 7</ul>
    {projects &&
      projects.map((project) => (
        <ul key={project.projectId} onClick={() => {
          setSelectedProject(project.projectId);
        }}>{project.name}</ul>
      ))}
      </div>
    </li>
    )}
  
  <div className="section-wrapper">
  <div>
    <h4>Completed Tasks:</h4>
    {currentArchivedTasks &&
    currentArchivedTasks.map((task) => (
      <li
        key={task.id}
        data-doc-id={task.id}
        className="sidebar__project"
      >
        <span className="sidebar__dot checks"><FaCheckCircle /></span>
        <span className="sidebar__project-name done-tasks">{task.task}</span>
      </li>
    ))}
    {archivedTasks.length > tasksPerPage &&
            <Paginate
             tasksPerPage={tasksPerPage}
             totalTasks={archivedTasks.length}
             paginate={paginate}
            />
            }
    {archivedTasks.length === 0 && <span className="sidebar__project-name" style={{'fontSize': '15px'}}>
      You have no archived tasks</span>}
  </div>
  <div className='graphs-container'>
    {chartType === "pie" && (<Pie data={data} />)}
    {chartType === "doughnut" && (<Doughnut data={data} />)}
    {chartType === "bar" && (<Bar data={data} />)}
  </div>
  </div>
    </>
  )
}

export default Analytics;