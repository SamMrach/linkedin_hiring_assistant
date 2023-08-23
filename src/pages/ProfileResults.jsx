import React, { useEffect } from 'react'
import '../styles/ProfileContainer.css'
import { useState } from 'react';
import Button from '@mui/material/Button';
import { renderDomain,renderEmployeeRange,renderVentureBacked,renderRecentJobs,renderCompanyTenure } from '../Utils/Renders';
import { TextField } from '@mui/material'
import { useLocation } from 'react-router-dom';
export default function ProfileResults() {
    const [generatedMsg,setGeneratedMsg]=useState({
        linkedin_subject_line:"",
        linkedin_message:"",
        email_subject_line:"",
        email_message:""
    }) 
    const {state}=useLocation();
    const generateOutboundMsg=()=>{

    }
    const {domain,
        employeeRanges,
        ventureBackedCompanies,
        jobExperiences,
        companyTenure,
        notes}=state.profileResults;
    useEffect(()=>{
      console.log("profile results",state.profileResults)
    },[])
  return (
    <div className='profile_container'>
        <div className="block">
           <h3 className="block_title">Domain</h3>
           {renderDomain(domain)}
        
        </div>
        <div className="block">
           <h3 className="block_title">Employee Range</h3>
          {renderEmployeeRange(employeeRanges)}
        </div>
        <div className="block">
           <h3 className="block_title">Venture Backed </h3>
          {renderVentureBacked(ventureBackedCompanies)}
        </div>
        <div className="block">
           <h3 className="block_title">Job Title </h3>
           {renderRecentJobs(jobExperiences)}
        </div>

        <div className="block">
           {renderCompanyTenure(companyTenure)}
        </div>

        <Button variant="contained" onClick={generateOutboundMsg} className="generateBtn"   sx={{
          margin: "4px 0px"
         }}>
            Generate Outbound Message
            </Button>
        <div className="block generatedMsgs">
          <div className="linkedin_block">
          <TextField id="outlined-basic" label="linkedin subject line" variant="outlined" value={generatedMsg.linkedin_subject_line}  />
          <textarea className='generated_textarea'
          placeholder="Linkedin Message ..." 
          value={generatedMsg.linkedin_message}
          />
          </div>
          <div className="email_block">
          <TextField id="outlined-basic" label="email subject line" variant="outlined" value={generatedMsg.email_subject_line}  />
          <textarea  className='generated_textarea'
          placeholder="Email Message ..." 
          value={generatedMsg.linkedin_message}
          />
          </div>
        </div> 
    </div>
  )
}
