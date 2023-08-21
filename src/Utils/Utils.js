
export function renderDomain(domainData){
    console.log(domainData)
    
    return domainData.experiences.map(exper=>
         (
            <div className="block_element">{exper.duration} years at {exper.companyTitle}</div>
        )
    )
}
export function renderEmployeeRange(employeeRangeData){
    return employeeRangeData.map(emplCompany=>(
        <div className="block_element">{emplCompany.employeRange} employees:  {emplCompany.years} years at {emplCompany.company}</div>
    ))
}

export function renderVentureBacked(ventureData){
    return ventureData.map(ventureComp=>(
        <div className="block_element">{ventureComp.years} years at {ventureComp.company} with ${ventureComp.fundAmount}funding</div>
    ))

}

export function renderRecentJobs(recentJobs){
    return recentJobs.map(job=>(
        <div className="block_element">{job.years} years at {job.jobTitle} </div>
    ))
}

export function renderCompanyTenure(companyTenureData){
    return (<>
    <div className="block_element">avg company tenure: {companyTenureData.averageTenure} years/company</div>
           <div className="block_element">shortest tenure in 5 years:  {companyTenureData.shortestTenure} years at {companyTenureData.shortestCompanyName}</div></>)
}