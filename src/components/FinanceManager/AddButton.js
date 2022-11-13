import React from 'react';
import plusImg from "../Calendar/plus.png";

const AddButton = ({ setShowForm }) => {

  return (
    <button
      onClick={() => setShowForm(true)}
      className="border p-2 rounded-full flex items-center shadow-md hover:shadow-2xl createBtn"
    >
      <img src={plusImg} alt="create_event" className="w-7 h-7" />
      <span className="pl-3 pr-7"> Create</span>
    </button>
  )
}

export default AddButton;