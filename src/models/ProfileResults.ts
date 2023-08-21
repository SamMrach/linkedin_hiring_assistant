import { Experience } from "./Experience";

class Domain{
  domain:string="";
  experience:Number=0;
  experiences:[]=[]
  
}
interface EmployeRange {
 employeRange:Number,
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
    experiencesData:Experience[]=[];
    domain:Domain=new Domain();
    employeeRanges:EmployeRange[]=[];
    ventureBackedCompanies:ventureBacked[]=[];
    jobExperiences:jobExperience[]=[];
    companyTenure:companyTenure=new companyTenure();
    notes:notes=new notes()

    constructor(experiencesData:[]){
        this.experiencesData=experiencesData;
    }

    fillDomain(){
        this.experiencesData.map((exp:Experience)=>{
          this.domain.experiences.push({
            companyTitle:exp.companyTitle,
            duration:exp.duration});
        })
    }

    fillEmployeRange(){
        this.experiencesData.map((exp:any)=>{
            this.employeeRanges.push({
              employeRange:100,
              years:exp.duration,
              company:exp.companyTitle
            })
        })
    }

    fillVentureBacked(){
        this.experiencesData.map((exp:any)=>{
            this.ventureBackedCompanies.push({
              fundAmount:100,
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
        let totalExperience=this.experiencesData.reduce((total:any,currentExp:Experience)=>{
          return  total+currentExp.duration;
        },0)
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