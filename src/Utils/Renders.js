
export function renderDomain(domainData){
    console.log(domainData)
    
    return (
        <>
        {/* <p className="block_element"> {domainData.totalExperience} in {domainData.domain} </p> */}
    {domainData.experiences.map(exper=>
         (
            <p className="block_element">{exper.duration} at {exper.companyTitle}</p>
        ))}
        </>
    )
        
    
}
export function renderEmployeeRange(employeeRangeData){
    return employeeRangeData.map(emplCompany=>(
        emplCompany.employeRange ?
        <p className="block_element">{emplCompany.employeRange} employees:  {emplCompany.yearsOfExperience} at {emplCompany.company}</p>
         :null
        ))
}

export function renderVentureBacked(ventureData){
    return ventureData.map(ventureComp=>(
        ventureComp.fundAmount ?
        <p className="block_element">{ventureComp.years}  at {ventureComp.company} with ${ventureComp.fundAmount} funding</p>
        :null
        ))

}

export function renderRecentJobs(recentJobs){
    return recentJobs.map(job=>(
        <p className="block_element">{job.yearsOfExperience} as a  {job.jobTitle} </p>
    ))
}

export function renderCompanyTenure(companyTenureData){
    return (<>
    <p className="block_element">avg company tenure: {companyTenureData.averageTenure} per company</p>
           <p className="block_element">shortest tenure in 5 years:  {companyTenureData.shortestTenure}  at {companyTenureData.shortestCompanyName}</p></>)
}

export function formatYear(duration){
    if(duration !=0 & duration <1) return Math.ceil(duration * 12)+" months";
    else return 
}