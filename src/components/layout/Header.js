import React, { useState } from 'react';
import { FaPizzaSlice, FaShareSquare, FaArrowAltCircleLeft } from 'react-icons/fa';
import { useProjectsValue } from '../../context';
import { useAuth } from "../../context/auth-context";
import { Link, useNavigate } from "react-router-dom";
import AddTask from '../Tasks/AddTask';
import TrackPlayer from './TrackPlayer';

const Header = () => {
  const { darkMode, setDarkMode } = useProjectsValue();
  const [shouldShowMain, setShouldShowMain] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showQuickAddTask, setShowQuickAddTask] = useState(false);
  const [error, setError] = useState("");
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    setError("")

    try {
      await logout()
      navigate("/auth")
    } catch {
      setError("Failed to log out")
    }
  };

  return (
    <header className={darkMode === true ? 'header darkmode-header' : 'header'}>
      <nav>
        <Link to="/">
        <div className="logo">
          <img src="ataraxia1.png" alt="Ataraxia"/>
        </div>
        </Link>
        <div className="settings">
        <ul>
          {!currentUser && (
          <Link to="/auth">
          <li className="login-container">
          <FaShareSquare />
            <span
              className="login_btn"
              role="button"
            >
              <FaShareSquare className="login-icon"/>
              SignUp
            </span>
            </li>
            </Link>
            )}
            {currentUser && (
              <li className="login-container">
                <span
                  className="login_btn"
                  onClick={handleLogout}
                  role="button"
                >
                  <FaArrowAltCircleLeft className="login-icon"/>
                  LogOut
                  {error && alert(error)}
                </span>
                </li>
              
            )}
            <li className="settings__add">
              <button
                type="button"
                onClick={() => {
                  setShowQuickAddTask(true);
                  setShouldShowMain(true);
                }}
              >
                +
              </button>
            </li>
            <li className="settings__darkmode">
              <button
                type="button"
                onClick={() => setDarkMode(!darkMode)}
              >
                <FaPizzaSlice />
              </button>
            </li>
            <li className="settings__darkmode playingIcon">
              <button
                type="button"
                onClick={() => setIsPlaying(!isPlaying)}
              >
                <TrackPlayer isPlaying={isPlaying}/>
              </button>
            </li>
          </ul>
        </div>
      </nav>
      <AddTask
        showAddTaskMain={false}
        shouldShowMain={shouldShowMain}
        showQuickAddTask={showQuickAddTask}
        setShowQuickAddTask={setShowQuickAddTask}
      />
    </header>
  );
};
export default Header;