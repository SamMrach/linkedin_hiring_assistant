/*global chrome*/
import React, { useEffect } from 'react'
import { useState } from 'react';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { Job } from './Job';
import { ProfileResults } from '../models/ProfileResults';
import LoadingButton from '@mui/lab/LoadingButton';

export const Jobslist = () => {
    const [jobs,setJobs]=useState([]);
    const [loading,setLoading]=useState(false);
    useEffect(()=>{
        if(localStorage.getItem("jobs") !== null){
            setJobs(JSON.parse(localStorage.getItem("jobs")));
        }
        chrome.runtime.onMessage.addListener((msg)=>{
            if(msg.req="scraped experiences"){
                console.log(msg.experiences);
                let profileResults=new ProfileResults(msg.experiences);
                profileResults.build();
                console.log("profile ",profileResults);
                setLoading(false);
            }
        })
    },[])
    const navigate=useNavigate();
    const goToAddJob=()=>{
        navigate('/add_job');
    }

    const evaluateCandidate=()=>{
        setLoading(true);
        chrome.runtime.sendMessage({req:"scrape experiences"})
        
    }
  return (
    <>
   
    <div className="horizontal_flex">
        <h3>All Opened Jobs</h3>
    <Button variant="contained" onClick={goToAddJob} >Add job</Button> 
   
    </div>
 {jobs.length  && jobs.map(job=>{
    return (<Job title={job.title} />)
})}
    <LoadingButton
        loading={loading}
        onClick={evaluateCandidate}
        variant="outlined"
      >
        Evaluate Candidate
      </LoadingButton>
    </>
       
  )
}
