import {useState,React, useEffect} from 'react'
import { TextField } from '@mui/material'
import { fetchCompanyData, fetchCompanyDataByDomain } from '../Utils/Clearbit';
export const Setup = () => {
    const [hiringCompanyDomain,setHiringCompanyDomain]=useState("");
    const [validDomainName,setValidDomainName]=useState(false);
    const handleChange=(e)=>{
      setHiringCompanyDomain(e.target.value)
    }
    function isDomain(arg) {
      let regexDomain = /^\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      if (arg.match(regexDomain)) {
        return true;
      } else {
        return false;
      }
    }
    const handleOnBlur=async (e)=>{
     if(isDomain(e.target.value)){
      setValidDomainName(true);
      let hiringCmpData=await fetchCompanyDataByDomain(e.target.value);
      console.log(hiringCmpData);
      localStorage.setItem("hiring company",JSON.stringify(hiringCmpData))

     }else{
      setValidDomainName(false)
     }
    }

    useEffect(()=>{
      if(localStorage.getItem('hiring company')){
        let domainName=JSON.parse(localStorage.getItem('hiring company')).domain;
        setHiringCompanyDomain(domainName);
        setValidDomainName(true);
      }
    },[])
  return (
    <div>
        <h3>Setup :</h3>
        <h4>Hiring company profile</h4>
        <TextField id="outlined-basic" label="Website" variant="outlined" 
         value={hiringCompanyDomain}
         onChange={handleChange}
         onBlur={handleOnBlur}
         error={!validDomainName}
         helperText={!validDomainName ? "Incorrect domain name." :""}
         />

    </div>
  )
}
