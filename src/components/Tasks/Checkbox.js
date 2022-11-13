import React from 'react';
import { firebase } from '../../firebase';

const Checkbox = ({ id, taskDesc }) => {
const archiveTask = () => {
    firebase.firestore().collection('tasks').doc(id).update({
        archived: true,
    });
};
  return (
    <div className="checkbox-holder"
    onClick={() => archiveTask()}
    role="button"
>
    <span className="checkbox" />        
    </div>
  );
};
export default Checkbox;