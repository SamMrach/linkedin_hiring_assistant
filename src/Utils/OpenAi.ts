import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: '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', // defaults to process.env["OPENAI_API_KEY"],
  dangerouslyAllowBrowser: true
});

export async function generateOutboundMessage(hiringCompanyProfile,openedJob,candidateProfile) {
   
    let prompt=`
    Here is some context:
    Looking for: ${openedJob.desiredDomainExp} years of ${openedJob.jobDomain} experience.
    Candidate has ${candidateProfile.YearsOfExperience} of ${candidateProfile.domainName} experience: 
    ${candidateProfile.experiences[0].duration} at ${candidateProfile.experiences[0].companyTitle}; 
    ${candidateProfile.experiences[1].duration} at ${candidateProfile.experiences[1].companyTitle}; 
    Looking for: ${openedJob.desiredExp} years of ${openedJob.jobtTitle} experience. 
    Candidate has ${candidateProfile.experiences[0].duration} years of ${candidateProfile.jobTitle} experience. 
    `;
    const messages = [
        {"role": "system", 
        "content": `You are a talent acquisition expert with 20+ years of experience.
         You have a tone that is conversational, spartan, and very little corporate jargon. 
         You are helping a hiring manager at company ${hiringCompanyProfile.hiringCompanyName} write emails and linkedin messages to candidates for an open ${openedJob.jobtTitle} role. 
         Your goal is to get a response from the person. The output must be in the following format:
          {'linkedin subject': 'subject line for a linkedin message', 'linkedin message': 'message body for a linkedin message', 'email subject': 'subject line for an email', 'email body': 'body for an email.'`},
        {"role": "user", "content": prompt}
    ]
  const completion = await openai.chat.completions.create({
    messages: messages,
    model: 'gpt-3.5-turbo',
  });

  console.log("generated MSG",completion.choices);
}

export async function doesDomainMatch(hiringCompanyDomain,companyProfileData){

  let prompt=`
  Here is some information from Clearbit:

'company': ${companyProfileData.name},
'category': {'sector': ${companyProfileData.category.sector}, 'industryGroup': ${companyProfileData.category.industryGroup}, 'industry':${companyProfileData.category.industry}, 'subIndustry': ${companyProfileData.category.subIndustry}},
'tags': ${companyProfileData.tags},
'tech': ${companyProfileData.tech},
'techCategories': ${companyProfileData.techCategories},
'description': ${companyProfileData.description}

  `
 let messages = [
    {"role": "system", "content": `You are an industry analyst with 20+ years of experience. Please think carefully about the assignment to ensure you have the right answer. You are trying to determine if this company is in the following ${hiringCompanyDomain}, B2B.You will provide the answer in the following format:\n\n\n {“B2B”: “Answer Options: ['Yes', 'Maybe', 'No'].”, “Explanation”: “A thorough and explicit step-by-step explanation for the answer.”} \n\n\n `},
    {"role": "user", "content": prompt}
]
const completion = await openai.chat.completions.create({
  messages: messages,
  model: 'gpt-3.5-turbo',
});

console.log("does domain match ",completion);
return false;
}