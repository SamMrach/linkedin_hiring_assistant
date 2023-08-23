import React, { useEffect } from 'react'
import { Header } from '../components/Header'
import { Setup } from '../components/Setup'
import { Jobslist } from '../components/Jobslist'
import { fetchCompaniesData,fetchCompanyData } from '../Utils/Clearbit'
export default function Home() {
    useEffect(()=>{
     
    },[])
  return (
    <div >
      <Header /> 
      <Setup/>
      <Jobslist/>
    </div>
    
  )
}
