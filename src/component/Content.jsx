import React, { useState } from 'react'

export default function Content(props) {
    return (
        <div>
            <div className="tab-content">
                <div className='text'>You have {props.listJobs.length} tasks to complete</div>
                <div className="list-group-item " >
                    {props.listJobs.map((job, index) =>
                        <div className='table'>
                            <div>
                                <input
                                    className="form-check-input
                                                  me-2"
                                    type="checkbox"
                                    defaultChecked=""
                                    checked={job.complete}
                                    onChange={() => props.handleCompleteJob({
                                        type: "handleCompleteJob",
                                        jobId: job.jobId,
                                    })}
                                />
                            </div>
                            <div className={`${job.complete ? "complete" : ""}`}>  {job.searchJobs}</div>
                            <div>
                                <button className='edit'
                                    onClick={() => {
                                        props.handleEdit(job.jobId)

                                    }}
                                > Edit</button>
                                <button className='delete'
                                    onClick={() =>
                                        props.handleDelete({
                                            type: "deleteJob",
                                            jobId: job.jobId,
                                        })

                                    }
                                >Delete</button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div >
    )
}
