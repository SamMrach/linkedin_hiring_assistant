import { fetchCompanyData } from 'src/Utils/Clearbit';

export class Experience {
  jobTitle: string;
  companyTitle: string;
  duration: string;
  company: CompanyProfile = new CompanyProfile();

  constructor(jobTitle: string, companyTitle: string, duration: string) {
    this.jobTitle = jobTitle;
    this.companyTitle = companyTitle;
    this.duration = duration;
  }

  setCompany(companyData: CompanyProfile) {
    this.company = companyData;
  }
}
export class CompanyProfile {
  name: string;
  description: string;
  employeesRange: string;
  raised: number;
  tags: [];
  category: {};
  tech: [];
  techCategories: [];
  domainName: string;

  setCompanyProfile(clearbitData: any) {
    this.name = clearbitData.name;
    this.description = clearbitData.description;
    this.employeesRange = clearbitData.metrics.employeesRange;
    this.raised = clearbitData.metrics.raised;
    this.tags = clearbitData.tags;
    this.category = clearbitData.category;
    this.tech = clearbitData.tech;
    this.techCategories = clearbitData.techCategories;
    this.domainName = clearbitData.domain;
  }
  async retrieveClearbitData(companyName: string) {
    try {
      let data = await fetchCompanyData(companyName);
      this.setCompanyProfile(data);
    } catch (err) {
      return;
    }
  }
}
