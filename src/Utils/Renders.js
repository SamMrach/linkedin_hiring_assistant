
export function renderDomain(domainData){
    console.log(domainData)
    
    return domainData.experiences.map(exper=>
         (
            <p className="block_element">{exper.duration} years at {exper.companyTitle}</p>
        )
    )
}
export function renderEmployeeRange(employeeRangeData){
    return employeeRangeData.map(emplCompany=>(
        emplCompany.employeRange!== undefined ?
        <p className="block_element">{emplCompany.employeRange} employees:  {emplCompany.years} years at {emplCompany.company}</p>
         :null
        ))
}

export function renderVentureBacked(ventureData){
    return ventureData.map(ventureComp=>(
        ventureComp.fundAmount !== null ?
        <p className="block_element">{ventureComp.years} years at {ventureComp.company} with ${ventureComp.fundAmount}funding</p>
        :null
        ))

}

export function renderRecentJobs(recentJobs){
    return recentJobs.map(job=>(
        <p className="block_element">{job.years} years at {job.jobTitle} </p>
    ))
}

export function renderCompanyTenure(companyTenureData){
    return (<>
    <p className="block_element">avg company tenure: {companyTenureData.averageTenure} years/company</p>
           <p className="block_element">shortest tenure in 5 years:  {companyTenureData.shortestTenure} years at {companyTenureData.shortestCompanyName}</p></>)
}