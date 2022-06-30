import { Component, OnInit } from '@angular/core';
import { LawsuitService, LawsuitTableService, RequestTableService } from '../../services/lawsuit.service';
import json2xlsx from 'json2xlsx-export';
import { DataList } from '../../services/datalist.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {

  lsCount : any;
  liCount : any;
  lrCount : any;
  lsList = [];
  liList = [];
  lrList = [];

  isLoading = false;

  constructor(private ls: LawsuitService,private li: LawsuitTableService, private lr: RequestTableService, private dlist : DataList) { }

  ngOnInit(): void {
    this.getInfo();
  }

  getInfo = ()=>{
    this.isLoading = true;
   
    this.ls.getLawsuitAll().subscribe({
      next: e=> this.lsList = e ,
      error: error => console.log(error),
      complete: ()=>{
        this.li.getSessionAll().subscribe({next: e=> this.liList = e, complete: ()=>{
          this.lr.getRequestAll().subscribe({next: e=> this.lrList = e,complete:()=>{
            this.ls.countLawsuitInfo().subscribe(e=> this.lsCount = e)
            this.li.getSessionCount().subscribe(e=> this.liCount = e)
            this.lr.getRequestCount().subscribe(e=> this.lrCount = e)
            this.isLoading = false;
          }})
        }})
      }
      })
   
     
  }

  getAreaCount = (ar: any[], st: string)=>{
    return ar.find(e=> e._id == st) && ar.find(e=> e._id == st).sum ? ar.find(e=> e._id == st).sum : 0;
  }


  exportNewExcel() {
   
    let head0 = [
      {value: 'رقم القضية', type: 'string'},
      {value: 'سنة القضية', type: 'string'},
      {value: 'المحكمة', type: 'string'},
      {value: 'تاريخ فتح القضية', type: 'string'},
      {value: 'نوع القضية', type: 'string'},
      {value: 'الهيئة القضائية', type: 'string'},
      {value: 'اختصاص الدعوى', type: 'string'},
      {value: 'قيمة الدعوى', type: 'string'},
      {value: 'نوع العملة', type: 'string'},
      {value: 'عدد المدعين', type: 'string'},
      {value: 'عدد المدعى عليهم', type: 'string'},
      {value: 'عدد الشهود', type: 'string'},
      {value: 'المحكمة المحال منها', type: 'string'},
      {value: 'المحكمة المحال إليها', type: 'string'},
      {value: 'تاريخ الإحالة', type: 'string'},
      {value: 'هل الدعوى مقدرة بقيمة', type: 'string'},
     
    ]

    let body0 = []
    this.lsList.forEach(e=>{
      body0.push([
        {value: e.l_no, type: 'number'},
        {value: e.l_year, type: 'number'},
        {value: e.court_name, type: 'string'},
        {value: e.l_date?e.l_date.slice(0, 10):'', type: 'string'},
        {value: e.l_type, type: 'string'},
        {value: e.l_type_no, type: 'string'},
        {value: e.l_type_s, type: 'string'},
        {value: e.l_cost, type: 'number'},
        {value: e.l_cost_type, type: 'string'},
        {value: e.claimant_no, type: 'number'},
        {value: e.defendant_no, type: 'number'},
        {value: e.witness_no, type: 'number'},
        {value: e.court_trans_from, type: 'string'},
        {value: e.court_trans_to, type: 'string'},
        {value: e.trans_date?e.trans_date.slice(0, 10):'', type: 'string'},
        {value: e.has_no_coast? 'نعم': 'لا', type: 'string'},
      ])
    })

    let obj0: any[] = [];
    obj0.push([...head0])
    obj0.push(...body0);

    let head1 = [
      {value: 'رقم القضية', type: 'string'},
      {value: 'سنة القضية', type: 'string'},
      {value: 'المحكمة', type: 'string'},
      {value: 'تاريخ ادراج القضية', type: 'string'},
      
      {value: 'نوع القضية', type: 'string'},
      {value: 'الهيئة القضائية', type: 'string'},
      {value: 'اختصاص الدعوى', type: 'string'},
      {value: 'قيمة الدعوى', type: 'string'},
      {value: 'نوع العملة', type: 'string'},
      {value: 'عدد المدعين', type: 'string'},
      {value: 'عدد المدعى عليهم', type: 'string'},
      {value: 'عدد الشهود', type: 'string'},
      {value: 'هل الدعوى مقدرة بقيمة', type: 'string'},
      
      {value: 'رقم الجلسة', type: 'string'},
      {value: 'المحكمة للجلسة', type: 'string'},
      {value: 'اسم القاضي', type: 'string'},
      {value: 'تاريخ بداية الجلسة', type: 'string'},
      {value: 'تاريخ نهاية الجلسة', type: 'string'},
      {value: 'المدة الزمنية', type: 'string'},
      {value: 'سبب التأجيل', type: 'string'},
      {value: 'تفصيل سبب التأجيل', type: 'string'},
      {value: 'المرحلة', type: 'string'},
      {value: 'هل الجلسة تمت', type: 'string'},
    ]
    let body1 = [];
    this.liList[0]&& this.liList[0].allData[0]? this.liList[0].allData[0].feild.forEach(e=>{
      body1.push([
        {value : e.lawsuit_no, type: 'number'},
        {value : e.lawsuit_year, type: 'number'},
        {value : e.lawsuit_court, type: 'string'},
        {value : e.lawsuit_date?e.lawsuit_date.slice(0, 10):'', type: 'string'},

        {value: e.l_type, type: 'string'},
        {value: e.l_type_no, type: 'string'},
        {value: e.l_type_s, type: 'string'},
        {value: e.l_cost, type: 'number'},
        {value: e.l_cost_type, type: 'string'},
        {value: e.claimant_no, type: 'number'},
        {value: e.defendant_no, type: 'number'},
        {value: e.witness_no, type: 'number'},
        {value: e.has_no_coast? 'نعم': 'لا', type: 'string'},

        {value : e.session_no, type: 'number'},
        {value : e.session_court, type: 'string'},
        {value : e.judge_name, type: 'string'},
        {value : e.from_date?e.from_date.slice(0, 10):'', type: 'string'},
        {value : e.to_date?e.to_date.slice(0, 10):'', type: 'string'},
        {value : e.postponement_period, type: 'number'},
        {value : this.dlist.postponementPeriodList.find(d=> d.name == e.postponement_period_couse).value, type: 'string'},
        {value : e.reason_details, type: 'string'},
        {value : e.stage, type: 'string'},
        {value : e.session_active ? 'نعم':"لا", type: 'string'},
      ])
    }):  body1 = [];
    let obj1: any[] = [];
    obj1.push([...head1])
    obj1.push(...body1);

    let head2 = [
      {value: 'رقم القضية', type: 'string'},
      {value: 'سنة القضية', type: 'string'},
      {value: 'المحكمة', type: 'string'},
      {value: 'تاريخ ادراج القضية', type: 'string'},

      {value: 'نوع القضية', type: 'string'},
      {value: 'الهيئة القضائية', type: 'string'},
      {value: 'اختصاص الدعوى', type: 'string'},
      {value: 'قيمة الدعوى', type: 'string'},
      {value: 'نوع العملة', type: 'string'},
      {value: 'عدد المدعين', type: 'string'},
      {value: 'عدد المدعى عليهم', type: 'string'},
      {value: 'عدد الشهود', type: 'string'},
      {value: 'هل الدعوى مقدرة بقيمة', type: 'string'},

      {value: 'رقم الطلب', type: 'string'},
      {value: 'سنة الطلب', type: 'string'},
      {value: 'نوع الطلب', type: 'string'},
      {value: 'اسم القاضي', type: 'string'},
      {value: 'مقدم الطلب', type: 'string'},
      {value: 'تاريخ تقديم الطلب', type: 'string'},
      {value: 'تاريخ اغلاق الطلب', type: 'string'},
      {value: 'مدة الطلب', type: 'string'},
      {value: 'هل تم الفصل في الطلب', type: 'string'},
      {value: 'عدد الجلسات للفصل في الطلب', type: 'string'},
     
    ]

    let body2 = [];
    this.lrList[0]&& this.lrList[0].allData[0]?  this.lrList[0].allData[0].feild.forEach(e=>{
      body2.push([
        {value : e.lawsuit_no, type: 'number'},
        {value : e.lawsuit_year, type: 'number'},
        {value : e.lawsuit_court, type: 'string'},
        {value : e.lawsuit_date?e.lawsuit_date.slice(0, 10):'', type: 'string'},

        {value: e.l_type, type: 'string'},
        {value: e.l_type_no, type: 'string'},
        {value: e.l_type_s, type: 'string'},
        {value: e.l_cost, type: 'number'},
        {value: e.l_cost_type, type: 'string'},
        {value: e.claimant_no, type: 'number'},
        {value: e.defendant_no, type: 'number'},
        {value: e.witness_no, type: 'number'},
        {value: e.has_no_coast? 'نعم': 'لا', type: 'string'},

        {value : e.request_no, type: 'number'},
        {value : e.request_year, type: 'number'},
        {value : e.request_type, type: 'string'},
        {value : e.judge_name, type: 'string'},
        {value : e.applicant_name, type: 'string'},
        {value : e.applicant_date?e.applicant_date.slice(0, 10):'', type: 'string'},
        {value : e.applicant_do_date ? e.applicant_do_date.slice(0, 10): '', type: 'string'},
        {value : e.applicant_do_period, type: 'number'},
        {value : e.is_applicant ? 'نعم':"لا", type: 'string'},
        {value : e.applicant_count, type: 'number'},
      ])
    }):  body2 = [];
    let obj2: any[] = [];
    obj2.push([...head2])
    obj2.push(...body2);
    const config = {
        filename: new Date().toISOString().slice(0,10),
        sheets: [
            {
            name: 'القضايا',
            data: obj0
             },
            {
                name: 'الجلسات',
                data: obj1
            },
            {
              name: 'الطلبات',
              data: obj2
          }
        ]
    };
    console.log(config);
    
    json2xlsx(config);
}

// exportNewExcelMultiSheet(data: exData, data2: exData) {
//     let obj: any[] = [];
//     obj.push([...data.head])
//     data.body.forEach(el => {
//         obj.push([...el]);
//     });
//     let obj2: any[] = [];
//     obj2.push([...data2.head])
//     data2.body.forEach(el => {
//         obj2.push([...el]);
//     });
//     const config = {
//         filename: data.name,
//         sheets: [
//             {
//                 name: data.sheetName ? data.sheetName : 'مستند عام',
//                 data: obj
//             },
//             {
//                 name: data2.sheetName ? data.sheetName : 'مستند عام',
//                 data: obj2
//             }
//         ]
//     };
//     json2xlsx(config);
// }


}
