import { Component, OnInit } from "@angular/core";
import { Lawsuit } from "../../shared/models/lawsuit.model";
import { LawsuitService } from "../../services/lawsuit.service";
import { AuthService } from "../../services/auth.service";


@Component({
  selector: 'lawsuitTable-app',
  templateUrl: './lawsuittable.component.html',
  styleUrls: ['./lawsuittable.component.scss']
})
export class LawsutitTableComponent implements OnInit{

  lawsuitInfoList: Lawsuit[] = [];
  lawsuitLength: Number = 0;
  pageSize = 25;
  pageSizeOptions: number[] = [2, 5, 10, 25, 100];
  user = this.auth.currentUser;
  permissions = this.auth.permissions;


  constructor(private lawsuitInfo: LawsuitService , private auth: AuthService){}

  ngOnInit(): void {
    this.getLawsuitInfoList(this.pageSize,1);
    this.getLawsuitCount();
  }

  getLawsuitInfoList(limit, page){
    this.lawsuitInfo.getLawsuitInfo(limit,page).subscribe(e=>{
      if(e.length){
        this.lawsuitInfoList = e
      }
    },err => console.log(err))
  }

  getLawsuitCount(){
    this.lawsuitInfo.countLawsuitInfo().subscribe(e=>{
      this.lawsuitLength = e;
    })
  }

}
