import React from 'react'
import { Header } from '../components/Header'
import { Setup } from '../components/Setup'
import { Jobslist } from '../components/Jobslist'
export default function Home() {
    
  return (
    <div >
      <Header /> 
      <Setup/>
      <Jobslist/>
    </div>
    
  )
}
