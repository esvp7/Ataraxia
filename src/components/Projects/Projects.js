import React, { useState } from 'react';
import { useSelectedProjectValue, useProjectsValue } from '../../context';
import IndividualProject from './IndividualProject';
import EditProject from './EditProject';

const Projects = ({ activeValue = null }) => {
  const { active, setActive } = useSelectedProjectValue();
  const [activeProject, setActiveProject] = useState(activeValue);
  const [isEditing, setIsEditing] = useState(false);
  const { setSelectedProject } = useSelectedProjectValue();
  const { projects } = useProjectsValue();

  return (
    <>
    {projects &&
    projects.map((project) => (
      <li
        key={project.projectId}
        data-doc-id={project.docId}
        className={
          active === project.projectId
            ? 'active sidebar__project'
            : 'sidebar__project'
        }
      >
        <div
          role="button"
          onClick={() => {
            setActive('project');
            setActiveProject(project)
            setSelectedProject(project.projectId);
          }}
        >
          <IndividualProject project={project} isEditing={isEditing} setIsEditing={setIsEditing}/>
        </div>
      </li>
    ))}
    {isEditing && (
      <EditProject setIsEditing={setIsEditing} activeProject={activeProject}
      />
    )}
    </>
  );
};

export default Projects;