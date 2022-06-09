enum Ltypeno {'فرد' , 'هيئة'}
enum Ltypes  {'قيمي' ,'نوعي'}

export class Lawsuit{
    _id? : String;
    l_no?: Number; //رقم الملف
    l_year?: Number; // سنة الملف
    court_name?: String; // المحكمة
    l_date?: Date; // تاريخ ايداع الدعوى
    l_type?: String; // نوع الدعوة
    l_type_no?: Ltypeno;
    l_type_s?: Ltypes;
    l_cost?: Number; // مبلغ الدعوى
    l_cost_type?: String; // مبلغ الدعوى
    claimant_no ?: Number; // عدد المدّعين
    defendant_no?: Number; // عدد المدعى عليهم
    witness_no ?: Number; // عدد الشهود
    court_trans_from?: String; // اسم المحكمة المحال منها
    court_trans_to ?: String; // اسم المحكمة المحال إليها
    trans_date?: Date; // تاريخ التحمويل
    user?: any;
    has_no_coast?: Boolean;
}

export class LawsuitTable{
    _id?: String;
    lawsuitFile? : String;
    session_no? : Number; // تاريخ الجلسة
    court_name? : String; // اسم المحمكة
    judge_name? : String; // اسم القاضي
    from_date? : Date; // من تاريخ
    to_date? : Date; // الى تاريخ
    postponement_period ? : Number; // مدة التأجيل
    postponement_period_couse? : String; // سبب التأجيل
    reason_details? : String; // تفاصيل سبب التأجيل
    stage? : String; // المرحلة
    session_active? : Boolean;
    has_lawyer?: Boolean;
}

export class RequestTable{
    _id?: String;
    lawsuitFile?: String;
    request_no?: Number; // رقم الطلب
    request_year?: Number; // سنة الطلب
    request_type?: String;// نوع الطلب
    judge_name?: String; // اسم القاضي
    applicant_name ?: String; // اسم مقدم الطلب
    applicant_date?: Date; // تاريخ تقديم الطلب
    applicant_do_date?: Date; // تاريخ فصل الطلب
    applicant_do_period?: Number; // الفترة بين الطلب وفصله
    is_applicant?: Boolean; // هل تم الفصل في الطلب ام لا
    applicant_count?: Number; // عدد الجلسات التي تم فصل الطلب فيها
}
