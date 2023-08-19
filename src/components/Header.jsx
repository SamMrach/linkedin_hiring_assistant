import React from 'react'
import '../styles/Header.css'
import Button from '@mui/material/Button';
export const Header = () => {
  return (
    <div className='header_container'>
        <h2 className='name'>Sourcer Copilot</h2>
        <Button variant="contained" className="feedback_btn">Feedback</Button>
       
    </div>
  )
}
