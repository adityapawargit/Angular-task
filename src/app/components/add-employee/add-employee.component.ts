import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent {
  EmployeeArray : any[] = [];
  isResultLoaded = false;
  isUpdateFormActive = false;
 
  employeename: string ="";

  currentEmployeeID = "";

  constructor(private http: HttpClient )
  {
    this.getAllEmployee();
  }

  ngOnInit(): void {
  }

  getAllEmployee()
  {
    this.http.get("http://localhost:3000/employee")
    .subscribe((resultData: any)=>
    {
        this.isResultLoaded = true;
        console.log(resultData.data);
        this.EmployeeArray = resultData.data;
    });
  }

  register()
  {
    let bodyData = {
      "name" : this.employeename,
      
    };
    this.http.post("http://localhost:3000/employee",bodyData).subscribe((resultData: any)=>
    {
        console.log(resultData);
        alert("Employee Registered Successfully")
        this.getAllEmployee();
    
    });
  }

  setUpdate(data: any)
  {
   this.employeename = data.employeename;
 
  
 
   this.currentEmployeeID = data.id;
  }


  UpdateRecords()
  {
    let bodyData =
    {
      "name" : this.employeename,
      
    };
    
    this.http.put("http://localhost:3000/employee"+ "/"+ this.currentEmployeeID ,bodyData).subscribe((resultData: any)=>
    {
        console.log(resultData);
        alert("Employee Updated")
        this.getAllEmployee();
      
    });
  }

  save()
  {
    if(this.currentEmployeeID  == '')
    {
        this.register();
    }
      else
      {
       this.UpdateRecords();
      }      
 
  }

  setDelete(data: any)
  {
    this.http.delete("http://localhost:3000/employee"+ "/"+ data.id).subscribe((resultData: any)=>
    {
        console.log(resultData);
        alert("Employee Deleted")
        this.getAllEmployee();
    });
  }
 
  DeleteAll(){
    this.http.delete("http://localhost:3000/employee").subscribe(()=>{
      alert("All Employee Deleted")
      this.getAllEmployee();  
      console.log('All employee deleted')
    })

  }

  }


