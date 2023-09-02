const handleScrapeExperiences = async resp => {
  let profilUrl = await getProfileUrl();
  console.log(profilUrl);
  if (!isLinkedinProfilePage(profilUrl)) {
    chrome.runtime.sendMessage({ req: 'invalid page' });
    return;
  }
  chrome.tabs
    .create({
      url: profilUrl + '/details/experience/',
      active: false,
    })
    .then(async tab => {
      const experiences = await scrapeExperiencesFromCreatedTab();
      returnDataToPopupScript(experiences);
    });
};

const scrapeExperiencesFromCreatedTab = () => {
  return new Promise(resolve => {
    chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
      if (tab.url.indexOf('details/experience/') != -1 && changeInfo.status == 'complete') {
        chrome.tabs.sendMessage(tab.id, { req: 'scrape experiences' }, res => {
          chrome.tabs.remove(tab.id);
          resolve(res);
        });
      }
    });
  });
};

const isLinkedinProfilePage = url => {
  // const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
  return url.includes('linkedin.com/in/') & (url.split('/').length == 6);
};
const getProfileUrl = async () => {
  const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
  return tabs[0].url;
};

const returnDataToPopupScript = experiences => {
  chrome.runtime.sendMessage({ req: 'scraped experiences', experiences });
};

const handlers = {
  'scrape experiences': handleScrapeExperiences,
};

chrome.runtime.onMessage.addListener((request, sender, response) => {
  handlers[request.req](response);
});
