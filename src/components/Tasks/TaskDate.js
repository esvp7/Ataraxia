import React from 'react';
import moment from 'moment';
import { FaSpaceShuttle, FaSun, FaRegPaperPlane } from 'react-icons/fa';

const TaskDate = ({ setTaskDate, showTaskDate, setShowTaskDate, showQuickAddTask}) =>
  showTaskDate && (
    <div className={showQuickAddTask ? "task-date quick-task-date" : "task-date"}>
        <ul className="task-date__list">
            <li>
                <div
                   onClick={() => {
                    setShowTaskDate(false);
                    setTaskDate(moment().format('DD/MM/YYYY'));
                   }}
                  role="button"
                >
                <span>
                    <FaSpaceShuttle />
                      </span>
                  <span>Today</span>
                </div>
            </li>
            <li>
                <div
                    onClick={() => {
                        setShowTaskDate(false);
                        setTaskDate(moment().add(1, 'day').format('DD/MM/YYYY'));
                    }}
                      role="button"
                    >
                    <span>
                        <FaSun />
                    </span>
                    <span>Tomorrow</span>
                </div>
            </li>
            <li>
          <div
            onClick={() => {
              setShowTaskDate(false);
              setTaskDate(moment().add(7, 'days').format('DD/MM/YYYY'));
            }}
            role="button"
          >
            <span>
              <FaRegPaperPlane />
            </span>
            <span>Next week</span>
          </div>
        </li>
        </ul>
    </div>
  );

  export default TaskDate;