import React from 'react';
import { useProjectsValue } from '../../context';

const ProjectOverlay = ({
    setProject,
    showProjectOverlay,
    setShowProjectOverlay,
    showQuickAddTask
  }) => {
    const { projects } = useProjectsValue(); 

    return (
        projects && 
        showProjectOverlay && (
            <div className={showQuickAddTask ? "project-overlay quick-task-overlay" :  "project-overlay"}>
                <ul className="project-overlay___list">
                    {projects.map((project) => (
                        <li key={project.projectId}>
                            <div
                               data-tesid="project-overlay-action"
                               onClick={() => {
                                  setProject(project.projectId)
                                  setShowProjectOverlay(false)
                               }}
                              role="button"
                            >
                                {project.name}

                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        )
    );
};

export default ProjectOverlay;