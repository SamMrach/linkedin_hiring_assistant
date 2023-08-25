/*global chrome*/
import React, { useEffect } from 'react'
import { useState } from 'react';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { Job } from './Job';
import { ProfileResults } from '../models/ProfileResults';
import LoadingButton from '@mui/lab/LoadingButton';
import {fetchCompaniesData} from "../Utils/Clearbit"
export const Jobslist = () => {
    const [jobs,setJobs]=useState([]);
    const [loading,setLoading]=useState(false);
    const navigate=useNavigate();

    useEffect(()=>{
        if(localStorage.getItem("jobs") !== null){
            setJobs(JSON.parse(localStorage.getItem("jobs")));
        }
        chrome.runtime.onMessage.addListener(async (msg)=>{
            if(msg.req="scraped experiences"){
                let allExperiencesDetails=await fillExperiencesWithClearbitData(msg.experiences);
                console.log("allExperiencesDetails",allExperiencesDetails)
                let profileResults=new ProfileResults(allExperiencesDetails);
                profileResults.build();
                console.log("profile ",profileResults);
                setLoading(false);
                navigate("/profile_results",{state:{profileResults}})
            }
        })
    },[])
    
    const goToAddJob=()=>{
        navigate('/add_job');
    }

    const evaluateCandidate=()=>{
        setLoading(true);
        chrome.runtime.sendMessage({req:"scrape experiences"})
        
    }

    async function fillExperiencesWithClearbitData(experiences){
        let experiencesTemp=[...experiences]
       const companiesName=[...new Set(experiences.map(exp=>exp.companyTitle))]; 
       const companiesClearBitData=await fetchCompaniesData(companiesName);
       let companiesDataMap=new Map();
       companiesClearBitData.map(cmp=>companiesDataMap.set(cmp.name,cmp));
      
       experiencesTemp.map(exp=>{
        if(companiesDataMap.has(exp.companyTitle.trim())){
            
            let companyClearbitData=companiesDataMap.get(exp.companyTitle.trim());
            exp.industry=companyClearbitData.industry;
            exp.employees_range=companyClearbitData.employees_range;
            exp.fund_amount=companyClearbitData.fund_amount;
            exp.tags=companyClearbitData.tags;
        }
        
       })
       
       console.log("exp temp details",experiencesTemp);
       return experiencesTemp;
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
        sx={{
            margin:"4px 0px"
        }}
      >
        Evaluate Candidate
      </LoadingButton>
    </>
       
  )
}
