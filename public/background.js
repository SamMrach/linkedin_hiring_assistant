

const handleScrapeExperiences=async (resp)=>{
    if(!await isLinkedinProfilePage()){
        //alert("not a valid page, move to a linkedin profile page")
        resp({err:"invalid"})
        return;
   }
   let profilUrl=await getProfileUrl();
    chrome.tabs.create({
    url: profilUrl+"/details/experience/", 
    active:false
  }).then(async tab=>{
    const experiences=await scrapeExperiencesFromCreatedTab();
    returnDataToPopupScript(experiences);
  });
}

const scrapeExperiencesFromCreatedTab=()=>{
    return new Promise(resolve=>{
         chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
        if (tab.url.indexOf('details/experience/') != -1 && changeInfo.status == 'complete') {
            chrome.tabs.sendMessage(tab.id,{req:"scrape experiences"},(res)=>{
                chrome.tabs.remove(tab.id);
                resolve(res);
            })
        }
    });
    })
   
}

 const isLinkedinProfilePage= async()=>{
    const tabs=await chrome.tabs.query({ active: true, currentWindow: true });
    return  tabs[0].url.includes("linkedin.com/in/");
}
const getProfileUrl=async()=>{
    const tabs=await chrome.tabs.query({ active: true, currentWindow: true });
    return  tabs[0].url;
}
 
const returnDataToPopupScript=(experiences)=>{
    chrome.runtime.sendMessage({req:'scraped experiences',experiences})
}

const handlers={
    "scrape experiences":handleScrapeExperiences
}

chrome.runtime.onMessage.addListener((request,sender,response)=>{
   handlers[request.req](response);
})

