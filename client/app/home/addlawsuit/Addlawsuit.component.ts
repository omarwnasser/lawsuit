import { Component, OnDestroy, OnInit } from "@angular/core";
import { DataList } from "../../services/datalist.service";
import { Observable, BehaviorSubject } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { LawsuitService,LawsuitTableService, RequestTableService } from "../../services/lawsuit.service";
import { ToastComponent } from "../../shared/toast/toast.component";
import { Lawsuit,LawsuitTable, RequestTable } from "../../shared/models/lawsuit.model";
import { ActivatedRoute } from "@angular/router";
import { formatDate } from "@angular/common";
import { MatDatepicker } from "@angular/material/datepicker";


@Component({
  selector: "addlawsuit-app",
  templateUrl: './Addlawsuit.component.html',
  styleUrls: ['./Addlawsuit.component.scss']
})

export class AddlawsuitComponent implements OnInit,OnDestroy{

constructor(
  public dList: DataList,
  private lawInfo: LawsuitService,
  private lawTable: LawsuitTableService,
  private reqTable: RequestTableService,
  public toast : ToastComponent,
  private route: ActivatedRoute){}

lawsuitInfoData: Lawsuit = {};
lawsuitTableList: LawsuitTable[] = [];
RequestTableList: RequestTable[] = [];

lawsuitInfoForm: FormGroup;
lawsuitTableForm: FormGroup;
requestTableForm: FormGroup;

l_no = new FormControl('',[Validators.required,Validators.min(1)]);
l_year = new FormControl('',[Validators.min(1970),Validators.max(2050),Validators.required]);
court_name = new FormControl('',Validators.required);
l_type = new FormControl('',Validators.required);
l_date = new FormControl('');
l_type_no = new FormControl('',Validators.required);
l_type_s = new FormControl('',Validators.required);
l_cost = new FormControl('');
l_cost_type = new FormControl('شيكل');
claimant_no = new FormControl(0,[Validators.min(1),Validators.required]);
defendant_no = new FormControl(0,[Validators.min(1),Validators.required]);
witness_no = new FormControl(0,[Validators.min(0)]);
court_trans_from = new FormControl();
court_trans_to = new FormControl();
trans_date = new FormControl();

// ===========================

session_no = new FormControl('', Validators.required);
court_name_table = new FormControl('', Validators.required);
judge_name = new FormControl('', Validators.required);
from_date  = new FormControl(formatDate(new Date(),'yyyy-MM-dd','en')  , Validators.required);
to_date = new FormControl(new Date(), Validators.required);
postponement_period = new FormControl({value: 0} );
postponement_period_couse = new FormControl('',Validators.required);
reason_details = new FormControl('');
stage = new FormControl('');
session_active = new FormControl(true)
has_lawyer = new FormControl(false)

lawsuitModalData : LawsuitTable ;

// ===========================

request_no = new FormControl('',Validators.required)
request_year = new FormControl('',[Validators.required , Validators.max(2050) , Validators.min(1970)])
request_type = new FormControl('',Validators.required)
judge_name_request = new FormControl('', Validators.required)
applicant_name = new FormControl('', Validators.required)
applicant_date = new FormControl(formatDate(new Date() , 'yyyy-MM-dd','en'))
applicant_do_date = new FormControl(formatDate(new Date() , 'yyyy-MM-dd','en'))
applicant_do_period = new FormControl({value: 0})


// ===========================

postponementPeriodDetail: BehaviorSubject<{no: number, name: string}[]> = new BehaviorSubject([])

options: any[] = this.dList.lawsuit_type;
filteredOptions: Observable<any[]>;

isLoading: boolean = false;

editInfo : String = '';
editId : String = '';
editrId : String = '';

tabIndex : number = 0;


ngOnInit() {

  this.route.params.subscribe(e=>{
   if(e.id){
     this.isLoading = true;
     this.lawInfo.getLawsuitInfoId(e.id).subscribe(elem=>{
       this.lawsuitInfoData = elem;
     },err=> console.log(err),()=>{
       this.lawTable.getLawsuitTable({lawsuitFile: e.id}).subscribe(element=>{
         this.lawsuitTableList = element;
          this.from_date.setValue(formatDate( this.lawsuitTableList.length ? this.lawsuitTableList[this.lawsuitTableList.length - 1].to_date: new Date() , 'yyyy-MM-dd' , 'en'));
          this.session_no.setValue(this.lawsuitTableList.length ? parseInt(this.lawsuitTableList[this.lawsuitTableList.length - 1].session_no.toString()) + 1 : 1);
       });
       this.reqTable.getRequestTable({lawsuitFile: e.id}).subscribe(element=>{
          this.RequestTableList = element;
          this.request_no.setValue(this.RequestTableList.length ? parseInt( this.RequestTableList[this.RequestTableList.length -1 ].request_no.toString()) + 1 : 1)
       })
       this.isLoading = false;
     })
   }
  })

  this.filteredOptions = this.l_type.valueChanges.pipe(
    startWith(''),
    map(value => this._filter(value)),
  );
    this.lawsuitInfoForm = new FormGroup({
      l_no : this.l_no,
      l_year : this.l_year,
      court_name : this.court_name,
      l_type : this.l_type,
      l_date : this.l_date,
      l_type_no : this.l_type_no,
      l_type_s : this.l_type_s,
      l_cost : this.l_cost,
      l_cost_type : this.l_cost_type,
      claimant_no : this.claimant_no,
      defendant_no : this.defendant_no,
      witness_no : this.witness_no,
      court_trans_from : this.court_trans_from,
      court_trans_to : this.court_trans_to,
      trans_date : this.trans_date,
    });
    this.lawsuitTableForm = new FormGroup({
      session_no : this.session_no,
      court_name : this.court_name_table,
      judge_name : this.judge_name,
      from_date : this.from_date,
      to_date : this.to_date,
      postponement_period : this.postponement_period,
      postponement_period_couse : this.postponement_period_couse,
      reason_details : this.reason_details,
      stage : this.stage,
      session_active : this.session_active,
      has_lawyer: this.has_lawyer,
    })

    this.requestTableForm = new FormGroup({
      request_no : this.request_no,
      request_year : this.request_year,
      request_type : this.request_type,
      judge_name : this.judge_name_request,
      applicant_name : this.applicant_name,
      applicant_date : this.applicant_date,
      applicant_do_date : this.applicant_do_date,
      applicant_do_period : this.applicant_do_period,
    })

}

ngOnDestroy(): void {
  this.postponementPeriodDetail.unsubscribe();
}

addLawsuit(){
  this.isLoading = true;
  if(this.lawsuitInfoForm.valid){
    if(this.l_type_s.value == 'نوعي'){
      this.l_cost.setValue(0)
    }
    this.lawInfo.setLawsuitInfo(this.lawsuitInfoForm.value).subscribe(e=>{
      if(e._id){
        this.lawsuitInfoData = e;
        this.resetLawsuitInfo()
      }else if(e['message']){
        this.toast.setMessage(e['message'],'danger')
      }else{
        this.toast.setMessage('خطأ في إدخال البيانات','danger')
      }
      this.isLoading=false;
    })
  }
  else{
      this.toast.setMessage('خطأ في البيانات المدخلة تأكد من الحقول المطلوبة *', 'danger');
      this.isLoading = false;
  }
}

editLawsuit(){
  this.editInfo = this.lawsuitInfoData._id;
  let data = Object.assign({},this.lawsuitInfoData)
  delete data._id;
  delete data['__v'];
  delete data.user;
  if(!data.l_cost_type){
    data['l_cost_type'] = 'شيكل'
  }
  this.lawsuitInfoForm.setValue(data)
  this.l_date.setValue(formatDate(data.l_date , 'yyyy-MM-dd','en'));
  this.trans_date.setValue(data.trans_date ? formatDate(data.trans_date, 'yyyy-MM-dd', 'en') : '')
}

updateLawsuit(){
  this.isLoading = true;
  if(this.l_type_s.value == 'نوعي'){
    this.l_cost.setValue(0)
  }
  this.lawInfo.updateLawsuitInfo(this.editInfo, this.lawsuitInfoForm.value).subscribe(e=>{
    this.lawsuitInfoData = e;
    this.editInfo = '';
    this.resetLawsuitInfo();
    this.isLoading = false;
  },err=> {
    this.toast.setMessage(err, 'warning');
    this.isLoading = false;
  } , ()=>{
    this.isLoading = false;
  })
}

cancelEditLawsuit(){
  this.editInfo = '';
  this.resetLawsuitInfo();
}

addLawsuitTable(){
  this.isLoading = true;
  if(this.lawsuitTableForm.valid){
    // if(new Date(this.from_date.value) > new Date(this.to_date.value)) return this.toast.setMessage('خطأ فيالفترة من تاريخ إلى تاريخ ', 'danger');
    this.lawTable.setLawsuitTable({...this.lawsuitTableForm.value, lawsuitFile: this.lawsuitInfoData._id }).subscribe(e=>{
      this.lawsuitTableList.push(e)
      this.resetLawsuitTable()
    },err=> {
      console.log(err);
      this.isLoading = false;
    },()=>{
      this.isLoading = false;
    })
  }else{
    this.toast.setMessage('خطأ في البيانات المدخلة تأكد من الحقول المطلوبة *', 'danger');
    this.isLoading = false;
  }
}

addRequestTable(){
  this.isLoading = true;
  if(this.requestTableForm.valid){
    this.reqTable.setRequestTable({...this.requestTableForm.value, lawsuitFile: this.lawsuitInfoData._id }).subscribe(e=>{
      this.isLoading = false;
      this.RequestTableList.push(e)
      this.resetRequestTable();
    })
  }else{
    this.toast.setMessage('خطأ في البيانات المدخلة تأكد من الحقول المطلوبة *', 'danger');
    this.isLoading = false;
    this.tabIndex = 1;
  }
}

editLawsuitTable(id:String){
  this.editId = id;
  let data = Object.assign({},this.lawsuitTableList.find(e => e._id == id));
  delete data._id;
  delete data.lawsuitFile;
  delete data['__v'];
  this.lawsuitTableForm.setValue(data);
  this.from_date.setValue(formatDate(data.from_date , 'yyyy-MM-dd','en'));
  this.to_date.setValue(formatDate(data.to_date , 'yyyy-MM-dd','en'));
}

editLawTable(){
  this.lawTable.updateLawsuitTable(this.editId,this.lawsuitTableForm.value).subscribe(e=>{
    let n = this.lawsuitTableList.findIndex(e=> e._id == this.editId);
    this.lawsuitTableList[n] = e;
    this.editId = '';
    this.resetLawsuitTable();
  })
}

deleteLawsuitTable(id){
  this.lawTable.deleteLawsuitTable(id).subscribe()
  this.lawsuitTableList = [];
  this.lawTable.getLawsuitTable({lawsuitFile: this.lawsuitInfoData._id}).subscribe(elem=>{
    this.lawsuitTableList = elem;
  })
}

editRequestTable(id:String){
  this.editrId = id;
  let data = Object.assign({},this.RequestTableList.find(e => e._id == id));
  console.log(data)
  delete data._id;
  delete data.lawsuitFile;
  delete data['__v'];
  if(!data['applicant_do_period']){
    data['applicant_do_period'] = 0;
  }
  this.requestTableForm.setValue(data);
  this.applicant_date.setValue(formatDate(data.applicant_date , 'yyyy-MM-dd','en'));
  this.applicant_do_date.setValue(formatDate(data.applicant_do_date , 'yyyy-MM-dd','en'));
  this.applicantPeriod();

}

editReqTable(){
  this.reqTable.updateRequestTable(this.editrId,this.requestTableForm.value).subscribe(e=>{
    this.RequestTableList[ this.RequestTableList.findIndex(e=> e._id == this.editrId)] = e;
    this.editrId = '';
    this.resetRequestTable();
  })
}

deleteRequestTable(id){
  this.reqTable.deleteRequestTable(id).subscribe()
  this.reqTable.getRequestTable({lawsuitFile: this.lawsuitInfoData._id}).subscribe(elem=>{
    this.RequestTableList = elem;
  })
}

resetLawsuitInfo(){
  this.l_no.reset()
  this.l_year.reset()
  this.court_name.reset()
  this.l_type.reset()
  this.l_date.reset()
  this.l_type_no.reset()
  this.l_type_s.reset()
  this.l_cost.reset()
  this.l_cost_type.reset()
  this.claimant_no.reset()
  this.defendant_no.reset()
  this.witness_no.reset()
  this.court_trans_from.reset()
  this.court_trans_to.reset()
  this.trans_date.reset()
}

resetLawsuitTable(){
  this.session_no.reset(this.lawsuitTableList.length ? parseInt(this.lawsuitTableList[this.lawsuitTableList.length - 1].session_no.toString()) + 1 : 1);
  this.court_name_table.reset();
  this.judge_name.reset();
  this.from_date.reset(formatDate( this.lawsuitTableList.length ? this.lawsuitTableList[this.lawsuitTableList.length - 1].to_date: new Date() , 'yyyy-MM-dd' , 'en'));
  this.to_date.reset();
  this.postponement_period.reset();
  this.postponement_period_couse.reset();
  this.reason_details.reset();
  this.stage.reset();
  this.session_active.reset(true);
  this.editId = '';
  this.has_lawyer.reset(this.lawsuitTableList.length ? this.lawsuitTableList[this.lawsuitTableList.length - 1].has_lawyer : false);
}

resetRequestTable(){
  this.request_no.reset(this.RequestTableList.length ? parseInt( this.RequestTableList[this.RequestTableList.length -1 ].request_no.toString()) + 1 : 1);
  this.request_year.reset();
  this.request_type.reset();
  this.judge_name_request.reset();
  this.applicant_name.reset();
  this.applicant_date.reset();
  this.applicant_do_date.reset();
  this.applicant_do_period.reset();
  this.editrId = '';

}

postponementPeriodcouse(){
   this.postponementPeriodDetail.next(this.dList[this.postponement_period_couse.value])
   if(this.postponement_period_couse.value == 'daily'){
      this.session_active.setValue(false)
   }else{
    this.session_active.setValue(true)
   }
}

getPostPoementPeriod(value) : string{
  return this.dList.postponementPeriodList.find(e=> e.name == value).value
}

postponementPeriod(){
  let from = new Date(this.from_date.value).getTime();
  let to = new Date(this.to_date.value).getTime();
  let period = (to - from) / (1000 * 60 * 60 * 24)
   return this.postponement_period.setValue(Math.round(period))
}

applicantPeriod(){
  let from = new Date(this.applicant_date.value).getTime();
  let to = new Date(this.applicant_do_date.value).getTime();
  let period = (to - from) / (1000 * 60 * 60 * 24)
  if(to < from){
    this.applicant_do_date.setValue(formatDate(this.applicant_date.value,'yyyy-MM-dd','en'));
  }
   return this.applicant_do_period.setValue(Math.round(period))
}

showModal(data: LawsuitTable){
  this.lawsuitModalData = data;
}

private _filter(value: string): any[] {
  const filterValue = value;

  return this.options.filter(option => option.name.includes(filterValue));
}

setYear(event , db: MatDatepicker<Number>): number{
   let d = new Date(event);
   this.l_year.setValue( d.getFullYear() );
   db.close();
  return
}

setYear2(event , db: MatDatepicker<Number>): number{
  let d = new Date(event);
  this.request_year.setValue( d.getFullYear() );
  db.close();
 return
}


YearRange(): number[]{
  let s = 1970;
  let range = []
  for(let i = s ; i < 2025 ; i++ ){
    range.push(i)
  }
  return range;
}

YearFilter(){
    if(this.l_year.value)
        return this.YearRange().filter(e=> e.toString().includes(this.l_year.value.toString()))
    else
        return this.YearRange();
  }

  checkYear(){
    let s =  this.l_year.value?  this.l_year.value.toString() : null;
    if(s && s.length >= 4){
      this.l_year.setValue(this.l_year.value.toString().slice(0,4))
      s =  this.l_year.value.toString()
    }
    if(s && s.length == 4 && (+s > 2025 || +s < 1948)){
      this.l_year.setValue(0)
    }

  }

}
