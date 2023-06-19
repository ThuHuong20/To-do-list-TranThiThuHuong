import './App.css'
import React, { useReducer, useState } from 'react';
import Content from './component/Content';
import Navbar from './component/Navbar';
function App() {
  const initState = JSON.parse(localStorage.getItem("listJobs")) || [];
  const [isEdit, setIsEdit] = useState(null)
  const handleEdit = (jobId) => {
    const findJob = initState.find((job) => {
      return job.jobId === jobId
    })
    setIsEdit(findJob)
  }
  function reducerJob(state, action) {
    switch (action.type) {
      case 'addJob':
        localStorage.setItem("listJobs", JSON.stringify([...state, action.newJob]));
        return [...state, action.newJob];
      case "deleteJob":
        const updatedState = state.filter(
          (job) => job.jobId !== action.jobId
        );
        localStorage.setItem("listJobs", JSON.stringify(updatedState));
        return updatedState;
      case "handleUpdate":
        const updatedJobs = state.map((job) => {
          if (job.jobId === action.jobUpdate.jobId) {
            return action.jobUpdate;
          }
          return job;
        })
        localStorage.setItem("listJobs", JSON.stringify(updatedJobs));
        return updatedJobs;
      case "handleCompleteJob":
        const completedJobs = state.map((job) => {
          if (job.jobId === action.jobId) {
            return { ...job, complete: !job.complete }
          } else {
            return job;
          }
        })
        localStorage.setItem("listJobs", JSON.stringify(completedJobs));
        return completedJobs;
      default:
        throw new Error();
    }
  }
  const [state, dispatch] = useReducer(reducerJob, initState);
  return (
    <div className="App">
      <Navbar handleAddJob={dispatch} isEdit={isEdit} handleUpdate={dispatch} />
      <Content listJobs={state} handleDelete={dispatch} handleEdit={handleEdit} handleCompleteJob={dispatch} />
    </div>
  );
}

export default App;
