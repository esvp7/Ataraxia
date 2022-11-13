import React, {useState} from 'react';
import { firebase } from '../../firebase';
import { useProjectsValue } from '../../context';

const EditProject = ({ setIsEditing, activeProject }) => {
    const [projectTitle, setProjectTitle] = useState('');
    const { projects, setProjects } = useProjectsValue();
    

    const editMode = (docId) => {
        if ( projectTitle && activeProject ) {
          console.log(activeProject);
          const db = firebase.firestore();
          db.collection('projects').doc(docId).update({
            name: projectTitle
          })
        .then(() => {
          setProjectTitle('');
          setIsEditing(false);
          setProjects([...projects]);
        })
      };
    };

    return (
    <div>
      <div className="empty-div"></div>
    <div className="edit_mode projectEdit">
    <input
        className="add-task__content"
        style={{'borderRadius': '4px'}}
        placeholder='Change Title'
        type="text"
        value={projectTitle}
        onChange={(e) => setProjectTitle(e.target.value)}
      />
    <button
      type="button"
      className="btn-action"
      onClick={() => editMode(activeProject.docId)}>
        Update Project
      </button>           
      <span
              className="add-task__cancel"
              onClick={() => {
                setIsEditing(false);
              }}
              role="button"
            >
              Exit
            </span>
        </div>
    </div>
    );
}

export default EditProject;