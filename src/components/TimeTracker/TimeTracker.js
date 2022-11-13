import React, {useState, useContext, useEffect} from 'react';
import { FaTrashAlt } from 'react-icons/fa';
import Paginate from "../Pagination";
import dayjs from "dayjs";
import DisplayComponent from './DisplayComponent';
import BtnComponent from './BtnComponent';
import { TimeTrackerContext } from "./context";
import { v4 as uuidv4 } from 'uuid';

const initialState = {
  time: '',
  title: ''
}

function TimeTracker() {
  const [status, setStatus] = useState(0);
  const [time, setTime] = useState({ms:0, s:0, m:0, h:0});
  const { 
    state,
    showForm,
    setShowForm,
    deleteInput,
    addInput, 
    updateInput,
    setSelectedInput,
    selectedInput 
  } = useContext(TimeTrackerContext);
  useEffect(() => {
    console.log(selectedInput)
  }, [selectedInput])
  const editState = {
    title: selectedInput?.title
  }  
  const [savedData, setSavedData] = useState(selectedInput !== null? editState : initialState);
  const [interv, setInterv] = useState();
  const savedInputs = state;
  const [currentPage, setCurrentPage] = useState(1);
  const [inputsPerPage] = useState(2);
  const indexOfLastInput = currentPage * inputsPerPage;
  const indexOfFirstInput= indexOfLastInput- inputsPerPage;
  const  currentInputs = savedInputs?.slice(indexOfFirstInput, indexOfLastInput);
  const paginate = pageNumber => setCurrentPage(pageNumber);

  const start = () => {
    run();
    setStatus(1);
    setInterv(setInterval(run, 10));
  };

  var updatedMs = time.ms, updatedS = time.s, updatedM = time.m, updatedH = time.h;

  const run = () => {
    if(updatedM === 60){
      updatedH++;
      updatedM = 0;
    }
    if(updatedS === 60){
      updatedM++;
      updatedS = 0;
    }
    if(updatedMs === 100){
      updatedS++;
      updatedMs = 0;
    }
    updatedMs++;
    return setTime({ms:updatedMs, s:updatedS, m:updatedM, h:updatedH});
  };

  const stop = () => {
    clearInterval(interv);
    setStatus(2);
    setStatus(3);
  };

  const reset = () => {
    clearInterval(interv);
    setStatus(0);
    setSavedData(initialState)
    setShowForm(false);
    setTime({ms:0, s:0, m:0, h:0})
  };

  const createInput = (e) => {
    e.preventDefault();
    const input = { 
      ...savedData, 
      time: selectedInput !== null ? selectedInput?.time : time, 
      id: selectedInput !== null ? selectedInput?.id : uuidv4(),
      date: selectedInput !== null ? selectedInput?.date : dayjs().format("DD-MM-YY")
    }
    if (selectedInput !== null) {
      updateInput(input);
      setSelectedInput(null);
      reset();
    } else {
      addInput(input);
      reset();
    }
  }

  const resume = () => start();

  return (
    <div className="main-section">
     <div className="clock-holder">
          <div className="stopwatch">
               <DisplayComponent time={time}/>
               <BtnComponent 
                status={status} 
                resume={resume} 
                reset={reset} 
                stop={stop} 
                setShowForm={setShowForm}
                start={start}/>
              {showForm && (
              <>
              <div className="input-form-cont">
              <input 
                type="text"
                placeholder={selectedInput !== null ? selectedInput.title : "Input Title"}
                value={savedData.title}
                onChange={(e) => setSavedData({...savedData, title: e.target.value})}
                className="add-project__name small-input"
                name="title"
              />
                <button 
                type="submit"
                onClick={createInput}>
                  {selectedInput !== null ? 'Update Input' : 'Save Input'}
              </button>
              {selectedInput !== null && (
                  <button type="button" 
                    className="add-project__submit delete-input-btn"
                    onClick={() => { 
                    deleteInput(selectedInput.id);
                    setSelectedInput(null)
                    setShowForm(false);
                  }}>
                  <FaTrashAlt />
                </button>
                )}
              <button
              onClick={() => setShowForm(false)}
            >
              ✗Exit
            </button>
            </div>
              </> 
              )}
          </div>
     </div>
     {currentInputs &&
     currentInputs.map((input) => (
      <>
      <div className="input-outer-div"
      key={input.id}>
      <>
      <div className='input-heading'>
      <h1 className="bold" onClick={() => {
        setSelectedInput(input)
        setShowForm(true)}}>{input.title}</h1>
      </div>
      </>
      <div className="input-inner-div">
      <h1>Duration: {input.time.h}:{input.time.m}:{input.time.ms}:{input.time.s}</h1>
      <h1 style={{fontSize: '10px', marginTop: '10px'}}>{input.date}</h1>
      </div>
      </div>
      </>
     ))}
      {savedInputs.length > inputsPerPage &&
            <Paginate
             tasksPerPage={inputsPerPage}
             totalTasks={savedInputs.length}
             paginate={paginate}
            />
            }
    </div>
  );
}

export default TimeTracker;
