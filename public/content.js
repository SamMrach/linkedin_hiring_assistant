chrome.runtime.onMessage.addListener(async(request,sender,response)=>{
    if(request.req=="scrape experiences"){
        const experiences=await scrapeExperiences();
        response(experiences);
    }
 })


const scrapeExperiences=()=>{
    return new Promise(res=>{
         let experiences=[];
    Array.from(document.querySelectorAll(".mr1")).forEach(job=>{
        experiences.push({
            jobTitle:job.childNodes[1].innerText,
            companyTitle:job.parentNode.parentNode.parentNode.nextElementSibling.childNodes[1].innerText,
            duration:job.parentNode.parentNode.parentNode.nextElementSibling.nextElementSibling.childNodes[1].innerText.split(" · ")[1],
            description:job.parentNode.parentNode.parentNode.parentElement.parentElement.nextElementSibling.innerText
        })
    })
   res(experiences);
    })
}