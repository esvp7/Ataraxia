import React, { useState } from 'react';
import { FaRegListAlt, FaRegCalendarAlt } from 'react-icons/fa';
import moment from 'moment';
import ProjectOverlay from '../Projects/ProjectOverlay';
import TaskDate from './TaskDate';
import { firebase } from '../../firebase';
import { useAuth } from '../../context/auth-context';
import { useSelectedProjectValue } from '../../context';
import { useProjectsValue } from '../../context';
import SliderBar from "./SliderBar";

const AddTask = ({
    showAddTaskMain = true,
    shouldShowMain = false,
    showQuickAddTask,
    setShowQuickAddTask,
    category,
    setCategory,
}) => {
    const [task, setTask] = useState('');
    const [priority, setPriority] = useState('');
    const [taskDate, setTaskDate] = useState('');
    const {progress, setProgress} = useProjectsValue();
    const [indexId, setIndexId] = useState(1)
    const [project, setProject] = useState('');
    const [showMain, setShowMain] = useState(shouldShowMain);
    const [showProjectOverlay, setShowProjectOverlay] = useState(false);
    const [showTaskDate, setShowTaskDate] = useState(false);
    const { currentUser } = useAuth();

    const { selectedProject } = useSelectedProjectValue();

    const handleChange = (e) => {
      setPriority(e.target.value)
    };

    const addTask = () => {
        const projectId = project || selectedProject;
        let collatedDate = '';

        if (projectId === 'TODAY') {
            collatedDate = moment().format('DD/MM/YYYY');
        } else if (projectId === 'NEXT_7') {
            collatedDate = moment().add(7, 'days').format('DD/MM/YYYY');
        }

        return (
        task &&
        projectId &&
        firebase
        .firestore()
        .collection('tasks')
        .add({
            archived: progress === 100 ? true : false,
            projectId,
            task,
            date: collatedDate || taskDate,
            userId: currentUser.uid,
            category,
            priority,
            indexId,
            progress
        })
        .then(() => {
            setTask('');
            setCategory('');
            setPriority('');
            setProject('');
            setShowMain('');
            setProgress(0);
            setShowProjectOverlay(false);
        })
    );
    };
    return (
        <div
        className={showQuickAddTask ? 'add-task add-task__overlay' : 'add-task'}
      >
        {showAddTaskMain && (
            <div 
               className="add-task__shallow"
               onClick={() => setShowMain(!showMain)}
              role="button"
            >
              <span className="add-task__plus">+</span>
              <span className="add-task__text">Add Task</span>
            </div>
        )}

{(showMain || showQuickAddTask) && (
        <div className="add-task__main">
          {showQuickAddTask && (
            <>
              <div>
                <span
                  className="add-task__cancel-x"
                  onClick={() => {
                    setShowMain(false);
                    setShowProjectOverlay(false);
                    setShowQuickAddTask(false);
                  }}
                  role="button"
                >
                  X
                </span>
              </div>
            </>
          )}
          <ProjectOverlay
            setProject={setProject}
            showProjectOverlay={showProjectOverlay}
            setShowProjectOverlay={setShowProjectOverlay}
            showQuickAddTask={showQuickAddTask}
          />
          <TaskDate
            setTaskDate={setTaskDate}
            showTaskDate={showTaskDate}
            setShowTaskDate={setShowTaskDate}
            showQuickAddTask={showQuickAddTask}
          />
          <div className="form-section">
          <input
            className="add-task__content addTitle"
            style={{'borderRadius': '4px'}}
            placeholder='Task Title'
            type="text"
            value={task}
            onChange={(e) => setTask(e.target.value)}
          />
          <input
            className="add-task__content"
            style={{'borderRadius': '4px'}}
            placeholder='Task Category'
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
          <select value={priority} onChange={handleChange} className="select select2">
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
          <SliderBar />
          </div>
          <div className="buttons-cont">
          <button
            type="button"
            className="btn-add btn-action"
            onClick={() => {
              setIndexId((prev) => prev + 1)
              showQuickAddTask
                ? addTask() && setShowQuickAddTask(false)
                : addTask()
              }
            }
          >
            Add Task
          </button>
          {!showQuickAddTask && (
            <span
              className="add-task__cancel"
              style={{'marginTop': '15px', 'marginLeft': '15px'}}
              onClick={() => {
                setShowMain(false);
                setShowProjectOverlay(false);
              }}
              role="button"
            >
              Cancel
            </span>
          )}
          <span
            className="add-task__project"
            style={{'marginLeft': '25rem'}}
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
      )}
        </div>
    );
}
export default AddTask;