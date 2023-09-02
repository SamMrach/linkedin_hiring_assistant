import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField,Select,MenuItem,InputLabel,Button } from '@mui/material'
export const AddJob = () => {
    const [job,setJob]=useState({});
    const navigate=useNavigate();
    const handleChange=(e)=>{
        const {name,value}=e.target;
        setJob(prev=>({
            ...prev,
            [name]:value
        }))
     console.log(job)
    }

    const saveJob=()=>{
        //let api=chrome.storage.local ;
       
        let api=localStorage;
        if(localStorage.getItem("jobs") !== null){
            let jobs=[...JSON.parse(localStorage.getItem("jobs"))];
            jobs.push(job);
            localStorage.setItem("jobs",JSON.stringify(jobs))
            console.log(localStorage.getItem("jobs"))
        }else{
            let jobsArr=[job];
            localStorage.setItem("jobs",JSON.stringify(jobsArr))
            console.log(localStorage.getItem("jobs"))
        }
        navigate("/");
        // localStorage.getItem(["jobs"],(res)=>{
        //     console.log(res.jobs)
        //     if(res.jobs !== null){
        //         console.log(res.jobs)
        //         let jobs=[...res.jobs];
        //         jobs.push(job);
        //         localStorage.setItem({"jobs":jobs})
        //     }else{
        //         let jobsArr=[job];
        //         localStorage.setItem({"jobs":JSON.stringify(jobsArr)})
        //     }
        //     console.log(JSON.parse(localStorage.getItem('jobs')))
        // })
        
    }
  return (
    <>
    <div className="horizontal_flex fivepx_margin">
    <TextField id="outlined-basic" label="job_title" name="title" variant="outlined" value={job.jobtTitle} onChange={handleChange} />
    <TextField id="outlined-basic" label="desired experience" name="desiredExp" variant="outlined" value={job.desiredExp} onChange={handleChange} />
    </div>
    <div className="horizontal_flex fivepx_margin">
    <TextField id="outlined-basic" label="domain" name="domain" variant="outlined" value={job.jobDomain} onChange={handleChange} />
    <TextField id="outlined-basic" label="desired domain experience" name="desiredDomainExp" variant="outlined" value={job.desiredDomainExp} onChange={handleChange} />
    </div>
    <div className="horizontal_flex fivepx_margin">
    <TextField id="outlined-basic" label="product" name="product" variant="outlined" value={job.product} onChange={handleChange} />
    <TextField id="outlined-basic" label="desired product experience" name="desiredExpProduct" variant="outlined" value={job.desiredExpProduct} onChange={handleChange} />
    </div>
    <div className="fivepx_margin">
    <InputLabel id="demo-simple-select-label">Your Role</InputLabel>
    <Select
     labelId="demo-simple-select-label"
    id="demo-simple-select"
    value={job.role || "Hiring Manager"}
    label="Role"
    onChange={handleChange}
    name="role"
  >
    <MenuItem value="Hiring Manager"> Hiring Manager</MenuItem>
    <MenuItem value=" Agency Recruiter">Agency Recruiter</MenuItem>
    <MenuItem value=" Corporate Recruiter"> Corporate Recruiter</MenuItem>
  </Select>
    </div>
    <div className="fivepx_margin">
    <Button variant="contained" onClick={saveJob} >Save job</Button> 
    </div>
    </>
   
  )
}
