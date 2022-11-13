import React, { useState } from 'react';
import { firebase } from '../../firebase';
import { useProjectsValue } from '../../context';
import { useAuth } from '../../context/auth-context';
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'

const AddProject = () => {
  const [show, setShow] = useState(false);
  const [showPicker, setShowPicker] = useState(false);
  const [emoji, setEmoji] = useState('');
  const [projectName, setProjectName] = useState('');
  const { currentUser } = useAuth();

  const onEmojiSelect = (data) => {
    setEmoji(data.native)
    emoji && setProjectName(prevInput => prevInput + emoji)
    setShowPicker(false);
  }

  const projectId = Date.now();
  const { projects, setProjects } = useProjectsValue();

  const addProject = () =>
    projectName &&
    firebase
      .firestore()
      .collection('projects')
      .add({
        projectId,
        name: projectName,
        userId: currentUser.uid,
      })
      .then(() => {
        setProjects([...projects]);
        setProjectName('');
        setShow(false);
      });

  return (
    <div className="add-project">
      {show && (
        <div className="add-project__input">
          <div className="input-container" 
          style={{'border': '1px solid #DDD', 
          'borderRadius': '4px'}}>
          <img
            style={{'marginLeft': '5px'}}
            alt="emoji-icon"
            src="https://icons.getbootstrap.com/assets/icons/emoji-smile.svg"
            onClick={() => setShowPicker(val => !val)} />
          <input
            value={projectName}
            style={{'border': 'none'}}
            onChange={(e) => setProjectName(e.target.value)}
            className="add-project__name"
            type="text"
            placeholder="Name your project"
          />
          </div>
          {showPicker && 
          <Picker data={data} onEmojiSelect={onEmojiSelect} />
          }
          <button
            className="btn-action"
            type="button"
            onClick={() => addProject()}
          >
            Add Project
          </button>
          <span
            aria-label="Cancel adding project"
            className="add-project__cancel"
            onClick={() => setShow(false)}
            role="button"
          >
            Cancel
          </span>
        </div>
      )}
      <span className="add-project__plus">+</span>
      <span
        className="add-project__text"
        onClick={() => setShow(!show)}
        role="button"
      >
        Add Project
      </span>
    </div>
  );
};
export default AddProject;