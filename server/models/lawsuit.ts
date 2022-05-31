
import {Schema , Document,model} from "mongoose";

const lawsuitInfoSchema = new Schema({
  l_no: {type: Number}, //رقم الملف
  l_year: Number, // سنة الملف
  court_name: String, // المحكمة
  l_date: Date, // تاريخ ايداع الدعوى
  l_type: String, // نوع الدعوة
  l_type_no: {type: String , enum: ['فرد' , 'هيئة'] },
  l_type_s: {type: String , enum: ['قيمي' , 'نوعي'] },
  l_cost: Number, // مبلغ الدعوى
  l_cost_type: {type:String , enum: ['دينار','دولار','شيكل']}, // عملة الدفع
  claimant_no : Number, // عدد المدّعين
  defendant_no: Number, // عدد المدعى عليهم
  witness_no : Number, // عدد الشهود
  court_trans_from: String, // اسم المحكمة المحال منها
  court_trans_to : String, // اسم المحكمة المحال إليها
  trans_date: Date, // تاريخ التحمويل
  user: {type:  Schema.Types.ObjectId , ref: 'User'},
  has_no_coast: Boolean, // لا يحتوي قيمة في حال انه صحيح يجب تفريغ القيمة القديمة
})

export const LawsuitInfo =  model('lawsuitInfo', lawsuitInfoSchema);

const lawsuitTableSchema = new Schema({
  lawsuitFile: {type: Schema.Types.ObjectId , ref: 'lawsuitInfo'},
  session_no: Number, // تاريخ الجلسة
  court_name: String, // اسم المحمكة
  judge_name: String, // اسم القاضي
  from_date: Date, // من تاريخ
  to_date: Date, // الى تاريخ
  postponement_period : Number, // مدة التأجيل
  postponement_period_couse: String, // سبب التأجيل
  reason_details: String, // تفاصيل سبب التأجيل
  stage: String, // المرحلة
  session_active: {type: Boolean, default: true},
  has_lawyer: {type: Boolean, default: false}
});

export const LawsuitTable = model('lawsuitTable', lawsuitTableSchema);

const RequestTableSchema = new Schema({
  lawsuitFile: {type: Schema.Types.ObjectId , ref: 'lawsuitInfo'},
  request_no: Number, // رقم الطلب
  request_year: Number, // سنة الطلب
  request_type: String,// نوع الطلب
  judge_name: String, // اسم القاضي
  applicant_name : String, // اسم مقدم الطلب
  applicant_date: Date, // تاريخ تقديم الطلب
  applicant_do_date: Date, // تاريخ فصل الطلب
  applicant_do_period: Number, // الفترة بين الطلب وفصله
  is_applicant: Boolean,
})

export const RequestTable = model('requestTable', RequestTableSchema);


const DataListSchema = new Schema({
  dataName: String,
  dataValues: [Object],
})


export const DataList = model('dataList',DataListSchema);
