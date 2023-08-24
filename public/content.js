
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
            companyTitle:formatCompanyName(job.parentNode.parentNode.parentNode.nextElementSibling.childNodes[1].innerText),
            duration:formatDuration(job.parentNode.parentNode.parentNode.nextElementSibling.nextElementSibling.childNodes[1].innerText.split(" · ")[1]),
            //description:job.parentNode.parentNode.parentNode.parentElement.parentElement.nextElementSibling.innerText
        })
    })

   res(experiences);
    })
}

function formatDuration(duration){
  if(duration.includes("year")) return parseInt(duration.split("year")[0]);
  else if(duration.includes("yr")) return parseInt(duration.split("yr")[0]);
  else if(duration.includes("mos")) return Number(parseFloat(duration.split("mos")[0]/12).toFixed(1));
  else return 0;
}

function formatCompanyName(companyName){
    return capitalizeFirstLetters(companyName.split("·")[0]);
}
function capitalizeFirstLetters(companyName){
    return companyName.trim().split(" ").map(
                       word=>word.charAt(0)
                      .toUpperCase()+word.slice(1))
                    .join(' ');
}

