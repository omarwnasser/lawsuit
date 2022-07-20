import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ResolutionService } from '../services/resolution.service';
import { ToastComponent } from '../shared/toast/toast.component';
import { Router } from '@angular/router';


export const resolutionData = [
  {name: "who_is" , text:'جهة متلقي الخدمة'},
  {name: "gender" , text:'الجنس'},
  {name: "work_place" , text:'مكان العمل'},
  {name: "jawda_e_a" , text:'يتميز موظفو شركة مرسال بالمعرفة والخبرة الكافية في إجراءات التبليغ القانونية'},
  {name: "jawda_e_b" , text:'يتميز موظفو شركة مرسال بالمعرفة والخبرة الكافية في إجراءات التبليغ القانونية'},
  {name: "jawda_e_c" , text:'تتميز شركة مرسال بالتأكد من وصول الإعلانات وعدم ضياعها'},
  {name: "jawda_e_d" , text:'يتمتع موظفو شركة مرسال بمتعاملين لدى المحاكم بشخصية تتناسب مع وظيفة عملهم'},
  {name: "jawda_e_e" , text:'يتميز موظفو شركة مرسال بتدقيق الإعلان قبل 72ساعة من موعد الإعلان'},
  {name: "jawda_e_f" , text:'يتميز موظفو شركة مرسال بالنزاهة والشفافية اللازمة'},
  {name: "monjza_a" , text:'مدى سرعة تسليم الإعلانات'},
  {name: "monjza_b" , text:'مدى تسليم الإعلانات بوقت كافٍ قبل موعد الجلسة'},
  {name: "monjza_c" , text:'مدى اعتماد مرسال للإعلان على أنه إعلان منجز مطابقة للواقع'},
  {name: "monjza_d" , text:'مدى سرعة أرشفة الإعلانات من قبل شركة مرسال على الحاسوب'},
  {name: "monjza_e" , text:'مدى الالتزام بتسليم الإعلان للشخص نفسه المراد إعلانه'},
  {name: "morjaa_a" , text:'مدى الالتزام بتسليم الإعلان للشخص نفسه المراد إعلانه'},
  {name: "morjaa_b" , text:'عند إعادة الإعلان المرجع سابقاً يقوم المبلغ ببذل المجهود اللازم للوصول الى الإعلان الصحيح'},
  {name: "morjaa_c" , text:'التأكد من العنوان ومحاولة الوصول للعنوان المذكور في الإعلان بجدية'},
  {name: "aajela_a" , text:'مدى سرعة تسليم الإعلانات العاجلة قبل موعد الجلسة'},
  {name: "aajela_b" , text:'مدى الالتزام بتسليم الإعلانات المعفاة'},
  {name: "aajela_c" , text:'مدى التعامل مع الإعلانات الصادرة خارج قطاع غزة'},
  {name: "malia_a" , text:'مدى تحصيل أتعاب مرسال للإعلانات والمخاطبات بأسعار معقولة'},
  {name: "malia_b" , text:'مدى إنجاز الإعلان على نفس العنوان عدة مرات بنفس الرسم الأول'},
  {name: "malia_c" , text:'مدى إنجاز إعادة الإعلان لغير المبلغ سابقاً بنفس الرسم الأول'},
  {name: "malia_d" , text:'مدى إنجاز الإعلانات المعفاة بدون تحصيل رسوم'},
  {name: "malia_e" , text:'مدى إعادة إنجاز الإعلانات المفقودة بدون تحصيل رسوم للمرة الثانية'},
  {name: "ease_a" , text:'مدى سهولة الوصول لموظفي ومقرات شركة مرسال'},
  {name: "ease_b" , text:'مدى توفير وسائل تواصل مع موظفي شركة مرسال'},
  {name: "ease_c" , text:'مدى قدرة شركة مرسال على معالجة إشكاليات الإعلانات'},
  {name: "accepted_a" , text:'درجة الرضا عن جودة أداء الخدمات المقدمة من خلال شركة مرسال'},
  {name: "accepted_b" , text:'درجة الرضا عن سرعة وصول الإعلانات لدى شركة مرسال'},
  {name: "accepted_c" , text:'درجة الرضا عن الدقة في الخدمات المقدمة من قبل شركة مرسال'},
  {name: "accepted_d" , text:'درجة الرضا عن أسعار خدمات شركة مرسال'},
  {name: "accepted_e" , text:'درجة الرضا عن نظام متابعه الإعلانات لدى شركة مرسال'},
  {name: "accepted_f" , text:'درجة الرضا عن نظام معالجة إشكاليات الإعلانات والمعمول به في شركة مرسال'},
  {name: "yes_no_a" , text:'توفر شركة مرسال لبرنامج يساعد المحاكم على المراجعة'},
  {name: "yes_no_b" , text:'توفر شركة مرسال لتطبيق جوال لتتبع الإعلانات'},
  {name: "suggestion" , text:'في حال لديك اقتراحات، يرجى ذكرها'},
]

@Component({
  selector: 'app-reslution',
  templateUrl: './reslution.component.html',
  styleUrls: ['./reslution.component.scss']
})
export class ReslutionComponent implements OnInit {

  resolutionForm : FormGroup;

  employee_name = new FormControl('',Validators.required);
  who_is = new FormControl('',Validators.required);
  gender = new FormControl('',Validators.required);
  work_place = new FormControl('',Validators.required);

  jawda_e_a = new FormControl(0);
  jawda_e_b = new FormControl(0);
  jawda_e_c = new FormControl(0);
  jawda_e_d = new FormControl(0);
  jawda_e_e = new FormControl(0);
  jawda_e_f = new FormControl(0);

  monjza_a = new FormControl(0);
  monjza_b = new FormControl(0);
  monjza_c = new FormControl(0);
  monjza_d = new FormControl(0);
  monjza_e = new FormControl(0);

  morjaa_a = new FormControl(0);
  morjaa_b = new FormControl(0);
  morjaa_c = new FormControl(0);

  aajela_a = new FormControl(0);
  aajela_b = new FormControl(0);
  aajela_c = new FormControl(0);

  malia_a = new FormControl(0);
  malia_b = new FormControl(0);
  malia_c = new FormControl(0);
  malia_d = new FormControl(0);
  malia_e = new FormControl(0);

  ease_a = new FormControl(0);
  ease_b = new FormControl(0);
  ease_c = new FormControl(0);

  accepted_a = new FormControl(0);
  accepted_b = new FormControl(0);
  accepted_c = new FormControl(0);
  accepted_d = new FormControl(0);
  accepted_e = new FormControl(0);
  accepted_f = new FormControl(0);

  yes_no_a = new FormControl(false, Validators.required);
  yes_no_b = new FormControl(false, Validators.required);

  suggestion = new FormControl('');

  res = resolutionData;

  constructor(private resolution : ResolutionService , public toast: ToastComponent, private route : Router) { }

  ngOnInit(): void {

    this.resolutionForm = new FormGroup({
      employee_name : this.employee_name,
      who_is : this.who_is,
      gender : this.gender,
      work_place : this.work_place,
      jawda_e_a : this.jawda_e_a,
      jawda_e_b : this.jawda_e_b,
      jawda_e_c : this.jawda_e_c,
      jawda_e_d : this.jawda_e_d,
      jawda_e_e : this.jawda_e_e,
      jawda_e_f : this.jawda_e_f,
      monjza_a : this.monjza_a,
      monjza_b : this.monjza_b,
      monjza_c : this.monjza_c,
      monjza_d : this.monjza_d,
      monjza_e : this.monjza_e,
      morjaa_a : this.morjaa_a,
      morjaa_b : this.morjaa_b,
      morjaa_c : this.morjaa_c,
      aajela_a : this.aajela_a,
      aajela_b : this.aajela_b,
      aajela_c : this.aajela_c,
      malia_a : this.malia_a,
      malia_b : this.malia_b,
      malia_c : this.malia_c,
      malia_d : this.malia_d,
      malia_e : this.malia_e,
      ease_a : this.ease_a,
      ease_b : this.ease_b,
      ease_c : this.ease_c,
      accepted_a : this.accepted_a,
      accepted_b : this.accepted_b,
      accepted_c : this.accepted_c,
      accepted_d : this.accepted_d,
      accepted_e : this.accepted_e,
      accepted_f : this.accepted_f,
      yes_no_a : this.yes_no_a,
      yes_no_b : this.yes_no_b,
      suggestion : this.suggestion,
    })
  }


  sendDataForm = ()=>{
    
    if(this.resolutionForm.valid){
      let data = Object.assign({},this.resolutionForm.value);
      delete data.employee_name;
      let resolutionData = [];
      for(let v in data){
        let s = {
            question: this.res.find(e=> e.name == v).name,
            text: this.res.find(e=> e.name == v).text,
            answer: data[v]
        }
        resolutionData.push(s)
      }
      let sendData = {
        employee_name : this.resolutionForm.value.employee_name,
        resolutionData : resolutionData
      }

      this.resolution.setResolution(sendData).subscribe(e=>{
        this.toast.setMessage('تمت عملية الحفظ بنجاح','success')
        this.route.navigate(['/login'])
        
      })

    }else{
      this.toast.setMessage('تأكد من البيانات المدخلة وخاصة اسم الموظف وبياناته الشخصية','danger')
    }
    
  }

}


// employee_name: String,
// resolutionData: [
//     {
//         question: String,
//         text: String,
//         answer: String
//     }
// ],
// this.res.find(e=> e.name == v)