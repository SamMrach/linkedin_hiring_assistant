import {useState,React} from 'react'
import { TextField } from '@mui/material'
export const Setup = () => {
    const [profile,setProfile]=useState("");
    const handleChange=(e)=>{
        setProfile(e.target.value)
    }
  return (
    <div>
        <h3>Setup :</h3>
        <h4>Hiring company profile</h4>
        <TextField id="outlined-basic" label="Website" variant="outlined" value={profile} onChange={handleChange} />
    </div>
  )
}
