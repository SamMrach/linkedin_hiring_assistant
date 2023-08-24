
import { Experience } from "./Experience";
class Domain{
  domain:string="";
  yearsOfExperience:number=0;
  experiences:[]=[]
  
}
interface EmployeRange {
 employeRange:string,
 yearsOfExperience:string,
 company:string
}
interface ventureBacked{
    fundAmount:number,
    years:string,
    company:string
}
interface jobExperience{
    jobTitle:String,
    yearsOfExperience:string
}

class companyTenure{
    averageTenure:string;
    shortestTenure:string;
    shortestCompanyName:string=""
}

class notes{
    publications:Number=0

}

export class ProfileResults{
    domain:Domain=new Domain();
    employeeRanges:EmployeRange[]=[];
    ventureBackedCompanies:ventureBacked[]=[];
    jobExperiences:jobExperience[]=[];
    companyTenure:companyTenure=new companyTenure();
    notes:notes=new notes();

    experiencesData:Experience[]=[];
    hiringCompany:{   
        jobTitle:string,
        industry:number,
        employees_range:string,
        fund_amount:string,
        };

    constructor(experiencesData:[]){
        this.experiencesData=experiencesData;
        // @ts-ignore
        if(localStorage.getItem('hiring company'))
        // @ts-ignore
        this.hiringCompany=JSON.parse(localStorage.getItem('hiring company'))
    }
    
   
    fillDomain(){
        //let yearsOfExperience=0;
        this.experiencesData.map((exp:Experience)=>{
            // if(exp.industry==this.hiringCompany.industry) 
            // yearsOfExperience+=exp.duration;
          this.domain.experiences.push({
            companyTitle:exp.companyTitle,
            duration:exp.duration});
        })
        //if(yearsOfExperience) 
        //this.domain.yearsOfExperience=yearsOfExperience;

    }

    fillEmployeRange(){
        this.experiencesData.map((exp:any)=>{
            this.employeeRanges.push({
              employeRange:exp.employees_range,
              yearsOfExperience:exp.duration,
              company:exp.companyTitle
            })
        })
    }

    fillVentureBacked(){
        this.experiencesData.map((exp:any)=>{
            this.ventureBackedCompanies.push({
              fundAmount:exp.fund_amount,
              years:exp.duration,
              company:exp.companyTitle
            })
        })
    }

    filljobExperience(){
       for(let i=0;i<2;i++){
          this.jobExperiences.push({
            //this.experiencesData[i].jobTitle
            jobTitle:this.experiencesData[i].jobTitle,
            yearsOfExperience:this.experiencesData[i].duration
          })
       } 
    }

    fillCompanyTenure(){
        let totalYears=0,totalMonths=0,minTenure=10000,shortestTenureCompanyName="";
       
        this.experiencesData.map(exp=>{
             let numbers=exp.duration.match(/\d+/g);
             if(numbers==null) return;
             let actualTenureInMonths=0;
             if(numbers.length==2){
                totalYears+= parseInt(numbers[0]);
                totalMonths+=parseInt(numbers[1]);
                actualTenureInMonths=parseInt(numbers[0])*12+parseInt(numbers[1]);
             } else if(numbers.length==1){
                if(exp.duration.includes("yr")) {
                    totalYears+= parseInt(numbers[0]);
                    actualTenureInMonths=parseInt(numbers[0])*12;
                }
                else {
                    totalMonths+=parseInt(numbers[0]);
                    actualTenureInMonths=parseInt(numbers[0]);
                }
             }
             // calculate min tenure
             if(totalYears<5 && actualTenureInMonths<minTenure){
                minTenure=actualTenureInMonths;
                shortestTenureCompanyName=exp.companyTitle;
             }
             
           
        })
         // @ts-ignore
        let totalExperiencesInMonths=totalYears*12 + totalMonths;
        let averageExperienceInMonths=Math.floor(totalExperiencesInMonths/this.experiencesData.length);
       
        let averageTenure=this.formatTenureMessage(averageExperienceInMonths);
        
        this.companyTenure.averageTenure=averageTenure;
        this.companyTenure.shortestCompanyName=shortestTenureCompanyName;
        this.companyTenure.shortestTenure=this.formatTenureMessage(minTenure);
    }
    
     formatTenureMessage(monthsCount:number){
        if(monthsCount<12) return monthsCount + " mos";
        else return Math.floor(monthsCount/12) + " yrs " + monthsCount%12 +" mos";
    } 

    build(){
        this.fillDomain();
        this.fillEmployeRange();
        this.fillVentureBacked();
        this.filljobExperience();
        this.fillCompanyTenure();
    }

    
}