/*global chrome*/
import React, { useEffect } from 'react';
import { useState } from 'react';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { Job } from './Job';
import { ProfileResults } from '../models/ProfileResults';
import LoadingButton from '@mui/lab/LoadingButton';
import { fetchCompanyData, fetchCompaniesData } from '../Utils/Clearbit';
import { Experience, CompanyProfile } from '../models/Experience';
import { Experiences } from '../tests/Experiences';
export const Jobslist = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('jobs') !== null) {
      setJobs(JSON.parse(localStorage.getItem('jobs')));
    }
    chrome.runtime.onMessage.addListener(async msg => {
      if (msg.req == 'scraped experiences') {
        let experiences = [];
        let promises = msg.experiences.map(async exp => {
          let experience = new Experience(exp.jobTitle, exp.companyTitle, exp.duration);
          await experience.company.retrieveClearbitData(exp.companyTitle);
          return experience;
        });

        Promise.all(promises).then(experiences => {
          let profileResults = new ProfileResults(experiences);
          profileResults.build();
          setLoading(false);
          navigate('/profile_results', { state: { profileResults } });
        });
      } else if (msg.req == 'invalid page') {
        setLoading(false);
        alert('Not a valid page,please move to a linkedin profile page');
      }
    });
  }, []);

  const goToAddJob = () => {
    navigate('/add_job');
  };

  const evaluateCandidate = () => {
    setLoading(true);
    chrome.runtime.sendMessage({ req: 'scrape experiences' });
  };

  async function fillExperiencesWithClearbitData(experiences) {
    let experiencesTemp = [...experiences];
    const companiesName = [...new Set(experiences.map(exp => exp.companyTitle))];
    const companiesClearBitData = await fetchCompaniesData(companiesName);
    let companiesDataMap = new Map();
    companiesClearBitData.map(cmp => companiesDataMap.set(cmp.name, cmp));

    experiencesTemp.map(exp => {
      if (companiesDataMap.has(exp.companyTitle.trim())) {
        let companyClearbitData = companiesDataMap.get(exp.companyTitle.trim());
        exp.industry = companyClearbitData.industry;
        exp.employees_range = companyClearbitData.employees_range;
        exp.fund_amount = companyClearbitData.fund_amount;
        exp.tags = companyClearbitData.tags;
        exp.category = companyClearbitData.category;
        exp.tech = companyClearbitData.tech;
        exp.techCategories = companyClearbitData.techCategories;
        exp.industry = companyClearbitData.category.industry;
        exp.description = companyClearbitData.description;
      }
    });

    console.log('exp temp details', experiencesTemp);
    return experiencesTemp;
  }
  return (
    <>
      <div className="horizontal_flex">
        <h3>All Opened Jobs</h3>
        <Button variant="contained" onClick={goToAddJob}>
          Add job
        </Button>
      </div>
      {jobs.length &&
        jobs.map(job => {
          return <Job title={job.title} />;
        })}
      <LoadingButton
        loading={loading}
        onClick={evaluateCandidate}
        variant="outlined"
        sx={{
          margin: '4px 0px',
        }}
      >
        Evaluate Candidate
      </LoadingButton>
    </>
  );
};
