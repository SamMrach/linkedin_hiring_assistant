import { CompanyProfile, Experience } from './Experience';
import { doesDomainMatch } from '../Utils/OpenAi';
class Domain {
  domain: string;
  totalExperience: string;
  experiences: [] = [];
}
interface EmployeRange {
  employeRange: string;
  yearsOfExperience: string;
  company: string;
}
interface ventureBacked {
  fundAmount: number;
  years: string;
  company: string;
}
interface jobExperience {
  jobTitle: String;
  yearsOfExperience: string;
}

class companyTenure {
  averageTenure: string;
  shortestTenure: string;
  shortestCompanyName: string;
}

class notes {
  publications: Number = 0;
}

export class ProfileResults {
  domain: Domain = new Domain();
  employeeRanges: EmployeRange[] = [];
  ventureBackedCompanies: ventureBacked[] = [];
  jobExperiences: jobExperience[] = [];
  companyTenure: companyTenure = new companyTenure();
  notes: notes = new notes();

  experiencesData = [];
  hiringCmpProfile: CompanyProfile;

  constructor(experiencesData: []) {
    this.experiencesData = experiencesData;
    // @ts-ignore
    if (localStorage.getItem('hiring company'))
      // @ts-ignore
      this.hiringCompany = JSON.parse(localStorage.getItem('hiring company'));
  }

  fillDomain() {
    let experienceInMonths = 0;
    this.experiencesData.map(exp => {
      experienceInMonths += this.getExperienceInMonths(exp.duration);
      this.domain.experiences.push({
        companyTitle: exp.companyTitle,
        duration: exp.duration,
      });
    });
    this.domain.totalExperience = this.formatTenureMessage(experienceInMonths);
    console.log(this.domain.totalExperience);
    console.log(this.domain.experiences);
  }

  fillEmployeRange() {
    this.experiencesData.map((exp: Experience) => {
      this.employeeRanges.push({
        employeRange: exp.company.employeesRange,
        yearsOfExperience: exp.duration,
        company: exp.companyTitle,
      });
    });
  }

  fillVentureBacked() {
    this.experiencesData.map((exp: Experience) => {
      this.ventureBackedCompanies.push({
        fundAmount: exp.company.raised,
        years: exp.duration,
        company: exp.companyTitle,
      });
    });
  }

  filljobExperience() {
    for (let i = 0; i < 2; i++) {
      this.jobExperiences.push({
        //this.experiencesData[i].jobTitle
        jobTitle: this.experiencesData[i].jobTitle,
        yearsOfExperience: this.experiencesData[i].duration,
      });
    }
    console.log(this.jobExperiences);
  }

  fillCompanyTenure() {
    let totalYears = 0,
      totalMonths = 0,
      minTenure = 10000,
      shortestTenureCompanyName = '';

    this.experiencesData.map((exp: Experience) => {
      let numbers = exp.duration.match(/\d+/g);
      if (numbers == null) return;
      let actualTenureInMonths = 0;
      if (numbers.length == 2) {
        totalYears += parseInt(numbers[0]);
        totalMonths += parseInt(numbers[1]);
        actualTenureInMonths = parseInt(numbers[0]) * 12 + parseInt(numbers[1]);
      } else if (numbers.length == 1) {
        if (exp.duration.includes('yr')) {
          totalYears += parseInt(numbers[0]);
          actualTenureInMonths = parseInt(numbers[0]) * 12;
        } else {
          totalMonths += parseInt(numbers[0]);
          actualTenureInMonths = parseInt(numbers[0]);
        }
      }
      // calculate min tenure
      if (totalYears < 5 && actualTenureInMonths < minTenure) {
        minTenure = actualTenureInMonths;
        shortestTenureCompanyName = exp.companyTitle;
      }
    });
    // @ts-ignore
    let totalExperiencesInMonths = totalYears * 12 + totalMonths;
    let averageExperienceInMonths = Math.floor(totalExperiencesInMonths / this.experiencesData.length);

    let averageTenure = this.formatTenureMessage(averageExperienceInMonths);

    this.companyTenure.averageTenure = averageTenure;
    this.companyTenure.shortestCompanyName = shortestTenureCompanyName;
    this.companyTenure.shortestTenure = this.formatTenureMessage(minTenure);
  }

  formatTenureMessage(monthsCount: number) {
    if (monthsCount < 12) return monthsCount + ' mo(s)';
    else
      return (
        Math.floor(monthsCount / 12) + ' yr(s)' + (monthsCount % 12 != 0 ? (monthsCount % 12) + ' mos' : '')
      );
  }

  getExperienceInMonths(companyTenure: string) {
    if (companyTenure == null) return 0;
    let numbers = companyTenure.match(/\d+/g);
    let actualTenureInMonths = 0;
    if (numbers.length == 2) {
      actualTenureInMonths = parseInt(numbers[0]) * 12 + parseInt(numbers[1]);
    } else if (numbers.length == 1) {
      if (companyTenure.includes('yr')) {
        actualTenureInMonths = parseInt(numbers[0]) * 12;
      } else {
        actualTenureInMonths = parseInt(numbers[0]);
      }
    }
    return actualTenureInMonths;
  }

  build() {
    this.fillDomain();
    this.fillEmployeRange();
    this.fillVentureBacked();
    this.filljobExperience();
    this.fillCompanyTenure();
  }
}
