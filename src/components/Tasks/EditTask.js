import React, {useState } from 'react';
import { useTasks } from '../../hooks';
import { FaTrashAlt } from 'react-icons/fa';
import { useSelectedProjectValue} from '../../context';
import { firebase } from '../../firebase';
import { Slider } from '@mui/material'
import { useProjectsValue } from '../../context';
import { FaRegListAlt, FaRegCalendarAlt } from 'react-icons/fa';
import moment from 'moment';
import ProjectOverlay from '../Projects/ProjectOverlay';
import TaskDate from './TaskDate';

const EditTask = ({ setIsEditing, activeTask, id }) => {
    const [taskTitle, setTaskTitle] = useState(activeTask?.task);
    const {newProgress, setNewProgress} = useProjectsValue();
    const [newCat, setNewCat] = useState(activeTask?.category);
    const [newTaskDate, setNewTaskDate] = useState(activeTask?.date);
    const [newProject, setNewProject] = useState(activeTask?.projectId);
    const [newPriority, setNewPriority] = useState(activeTask?.priority);
    const [showConfirm, setShowConfirm] = useState(false);
    const [showProjectOverlay, setShowProjectOverlay] = useState(false);
    const [showTaskDate, setShowTaskDate] = useState(false);
    const { selectedProject } = useSelectedProjectValue();
    const { tasks } = useTasks(selectedProject);

    const handleChange = (e) => {
      setNewPriority(e.target.value)
    }

    const editMode = (id) => {
      const projectId = newProject || selectedProject;
      let collatedDate = '';

      if (projectId === 'TODAY') {
          collatedDate = moment().format('DD/MM/YYYY');
      } else if (projectId === 'NEXT_7') {
          collatedDate = moment().add(7, 'days').format('DD/MM/YYYY');
      }
        if ( tasks && taskTitle ) {
          const db = firebase.firestore();
          db.collection('tasks').doc(id).update({
            task: taskTitle,
            category: newCat,
            priority: newPriority,
            progress: newProgress,
            projectId: newProject,
            date: collatedDate || newTaskDate
          })
        .then(() => {
          setTaskTitle('');
          setNewCat('');
          setNewPriority('');
          setNewProgress(0);
          setNewProject('');
          setNewTaskDate('');
          setIsEditing(false);
        })
      };
    };

    const deleteTask = (id) => {
      firebase
      .firestore()
      .collection('tasks')
      .doc(id)
      .delete()
  };

  const archiveTask = () => {
    firebase.firestore().collection('tasks').doc(id).update({
        archived: true,
    });
};

const setArchived = () => {
  if (newProgress === 100) {
    archiveTask();
  }
}

    return (
    <div>
      <div className="empty-div"></div>
      <div className="add-task__main">
      <ProjectOverlay
            setProject={setNewProject}
            showProjectOverlay={showProjectOverlay}
            setShowProjectOverlay={setShowProjectOverlay}
          />
          <TaskDate
            setTaskDate={setNewTaskDate}
            showTaskDate={showTaskDate}
            setShowTaskDate={setShowTaskDate}
          />
      </div>
    <div className="edit_mode">
    <div className="form-section">
    <input
        className="add-task__content addTitle"
        style={{'borderRadius': '4px', 'color': 'gray'}}
        placeholder='Change Title'
        type="text"
        value={taskTitle}
        onChange={(e) => setTaskTitle(e.target.value)}
      />
    <input
        className="add-task__content"
        style={{'borderRadius': '4px', 'color': 'gray'}}
        placeholder='Change Category'
        type="text"
        value={newCat}
        onChange={(e) => setNewCat(e.target.value)}
      />

    <select value={newPriority} onChange={handleChange} className="select select2">
      <option value="">Priority</option>
      <option value="1">1</option>
      <option value="2">2</option>
      <option value="3">3</option>
      <option value="4">4</option>
      <option value="5">5</option>
    </select>
    </div>
    <div className="progress-cont">
    <h6>Current Progress Status</h6>
    <Slider 
      style={{ width: '70%', 'marginLeft': '15px' }}
      size="small"
      value={newProgress}
      defaultValue={activeTask?.progress}
      onChange={(e) => setNewProgress(e.target.value)}
      valueLabelDisplay="auto"/>
    </div>
    <div className="buttons-wrapper">
    <button
      type="button"
      className="btn-add btn-action"
      id={activeTask.id}
      onClick={() => {
        editMode(activeTask.id)
        setArchived()}}>
        Update Task
      </button>

      <span
           className="add-task__submit"
           style={{'marginBottom': '10px', 'marginLeft': '6px'}}
           onClick={() => setShowConfirm(true)}
           role="button"
        >
          <FaTrashAlt/>
          </span>
            {showConfirm && (
                <div className="project-delete-modal">
                    <div className="project-delete-modal__inner">
                        <p>Are you sure you want to delete this task?</p>
                        <button
                            type="button"
                            onClick={() => {
                              deleteTask(activeTask.id)
                              setIsEditing(false)
                              }}>
                                Delete
                        </button>
                        <span
                            onClick={() => setShowConfirm(!showConfirm)}
                              role="button"
                            >
                                Cancel
                        </span>
                    </div>
                </div>
            )}
            
      <span
              className="add-task__cancel exit-btn"
              style={{'marginLeft': '20px'}}
              onClick={() => {
                setIsEditing(false);
              }}
              role="button"
            >
              Exit
            </span>
            <span
            className="add-task__project"
            style={{'marginLeft': '20rem'}}
            onClick={() => setShowProjectOverlay(!showProjectOverlay)}
            role="button"
          >
            <FaRegListAlt />
          </span>
          <span
            className="add-task__date"
            onClick={() => setShowTaskDate(!showTaskDate)}
            role="button"
          >
            <FaRegCalendarAlt />
          </span>
            </div>
        </div>
    </div>
    );
}

export default EditTask;