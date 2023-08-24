
import { Experience } from "./Experience";
class Domain{
  domain:string="";
  yearsOfExperience:number=0;
  experiences:[]=[]
  
}
interface EmployeRange {
 employeRange:string,
 years:Number,
 company:string
}
interface ventureBacked{
    fundAmount:number,
    years:Number,
    company:string
}
interface jobExperience{
    jobTitle:String,
    years:number
}

class companyTenure{
    averageTenure:Number=0;
    shortestTenure:number=0;
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
        let yearsOfExperience=0;
        this.experiencesData.map((exp:Experience)=>{
            if(exp.industry==this.hiringCompany.industry) 
            yearsOfExperience+=exp.duration;
          this.domain.experiences.push({
            companyTitle:exp.companyTitle,
            duration:exp.duration});
        })
        if(yearsOfExperience) 
        this.domain.yearsOfExperience=yearsOfExperience;

    }

    fillEmployeRange(){
        this.experiencesData.map((exp:any)=>{
            this.employeeRanges.push({
              employeRange:exp.employees_range,
              years:exp.duration,
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
            years:this.experiencesData[i].duration
          })
       } 
    }

    fillCompanyTenure(){
        let numberOfCompanies=this.experiencesData.length;
        let totalExperience:number=this.experiencesData.reduce((total:number,currentExp:Experience)=>{
          return  total+currentExp.duration;
        },0);
       
        this.companyTenure.averageTenure=Math.round(totalExperience/numberOfCompanies)
        this.experiencesData.map((exp:Experience)=>{
           if(exp.duration<5){
              this.companyTenure.shortestTenure=exp.duration;
              this.companyTenure.shortestCompanyName=exp.companyTitle;
              return;
           }

        })
        
    }
   
     getNumberOfYearsOfExperience(duration:String){
      return parseInt(duration.split("year")[0]);
    }
    

    build(){
        this.fillDomain();
        this.fillEmployeRange();
        this.fillVentureBacked();
        this.filljobExperience();
        this.fillCompanyTenure();
    }

    
}