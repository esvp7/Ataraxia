import React, { createContext, useContext, useState, useEffect } from 'react';
import { useProjects } from '../hooks';

export const darkModeState = JSON.parse(localStorage.getItem('darkMode')) || false;
export const progressState = JSON.parse(localStorage.getItem('progress')) || 0;

export const ProjectsContext = createContext();
export const ProjectsProvider = ({ children }) => {
  const { projects, setProjects } = useProjects();
  const [darkMode, setDarkMode] = useState(darkModeState);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
		localStorage.setItem("darkMode", JSON.stringify(darkMode));
    localStorage.setItem("progress", JSON.stringify(progress));
	  }, [darkMode, progress]);

  return (
    <ProjectsContext.Provider value={{ 
      projects, 
      setProjects, 
      darkMode, 
      setDarkMode,
      progress,
      setProgress,}}>
      {children}
    </ProjectsContext.Provider>
  );
};

export const useProjectsValue = () => useContext(ProjectsContext);