import React, { useState } from 'react';
import { FaTrashAlt, FaEdit } from 'react-icons/fa';
import { useProjectsValue, useSelectedProjectValue } from '../../context';
import { firebase } from '../../firebase';

const IndividualProject = ({ project, isEditing, setIsEditing }) => {
    const [showConfirm, setShowConfirm] = useState(false);
    const [showIcons, setShowIcons] = useState(false);
    const { projects, setProjects } = useProjectsValue();
    const { setSelectedProject } = useSelectedProjectValue();
    const toggleEditMode = () => setIsEditing(!isEditing);

    const deleteProject = (docId) => {
        firebase
        .firestore()
        .collection('projects')
        .doc(docId)
        .delete()
        .then(() => {
            setProjects([...projects]);
            setSelectedProject('INBOX');
        });
    };

    return (
      <>
      <div onClick={() => setShowIcons(!showIcons)}>
        <span className="sidebar__dot">•</span>
        <span className="sidebar__project-name">{project.name}</span>
        <span
           className="sidebar_project-delete"
           onClick={() => setShowConfirm(!showConfirm)}
           role="button"
        >
            {showIcons && <FaTrashAlt className="actionIcon" />}
            {showConfirm && (
                <div className="project-delete-modal delete-modal">
                    <div className="project-delete-modal__inner">
                        <button
                            type="button"
                            onClick={() => deleteProject(project.docId)}>
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
        </span>
        </div>
        {showIcons && <FaEdit className="actionIcon" onClick={toggleEditMode}/>}
      </>
    );
};

export default IndividualProject;