import { Injectable } from "@angular/core";

@Injectable()
export class DataList {

 lawsuit_type =[ // نوع الدعوى
    {no: 1, name: "حقوق مالية"},
    {no: 2, name:"تصريحية/تصحيح قيد"},
    {no: 3, name: "اثبات/ابطال/الغاء/فسخ (قيد، سند، تسجيل، شيكات، عقد، وكالة)، تحكيم"},
    {no: 4, name: "أراضي"},
    {no: 5, name: "تعويض /حادث طرق/أخطاء طبية/أخطاء أخرى"},
    {no: 6, name: "إزالة تعدي /تصحيح حدود"},
    {no: 7, name: "حقوق عمالية وتعويض إصابات عمل"},
    {no: 8, name: "ازالة ضرر/إزالة خصومة"},
    {no: 9, name: "نزع يد/رفع يد/وضع يد/إعادة حال سابق "},
    {no: 10, name: "تقسيم أموال مشتركة/فرز وتجنيب/إزالة شيوع"},
    {no: 11, name: "استرداد/حيازة/منع تعرض/وقف الأعمال الجديدة"},
    {no: 12, name: "اعتراض الغير"},
    {no: 13, name: "أولوية"},
    {no: 14, name: "حقوق ارتفاق مرور، أجزاء مشتركة"},
    {no: 15, name: "تنفيذ عيني"},
    {no: 16, name: "اخلاء ماجور"},
    {no: 17, name: "تنفيذ (عقد، التزامات، معاملة)"},
    {no: 18, name: "استرداد عارية"},
    {no: 19, name: "دعوى تزوير أصلية"},
    {no: 20, name: "دعوى هبة"},
    {no: 21, name: "اثبات وفاء"},
    {no: 22, name: "دعوى شفعة"},
    {no: 23, name: "إعادة محاكمة"},
    {no: 24, name: "دعوى استحقاق عقار/إجراء محاسبة/إلغاء تسجيل إعادة قيد"},
    {no: 25, name: "أخرى"},
 ];

stage = [  //المراحل
    {no:1 , name: "مرحلة تبليغ الأطراف"},
    {no:2 , name: "مرحلة تقديم بيانات المدعي"},
    {no:3 , name: "مرحلة تقديم بيانات المدعى عليه"},
    {no:4 , name: "اقفال باب المرافعة"},
    {no:5 , name: "فتح باب المرافعة"},
    {no:6 , name: "اقفال باب المرافعة والحجز للحكم"},
];

postponementPeriodList = [
  {name:'claimant' , value:' المدعي او وكيله' },
  {name:'defendant' , value:'المدعى عليه او وكيله' },
  {name:'hea' , value:'القاضي / الهيئة القضائية' },
  {name:'khabeer' , value:'الخبير' },
  {name:'witness' , value:'الشهود' },
  {name:'notes' , value:'التبيلغات' },
  {name:'corona' , value:'جائحة_كورونا' },
  {name:'daily' , value:'تأجيل_إداري' },
  {name:'award' , value:'عوارض_الخصومة' },
  {name:'file' , value:'حركة الملف' },
]

claimant = [//المدعى
    {no: 1 ,  name: "عدم حضور المدعي أو وكيله"},
    {no: 2 ,  name: "السماح لتقديم بينات"},
    {no: 3 ,  name: "استكمال تقديم البينات"},
    {no: 4 ,  name: "عدم القدرة على تقديم البينات"},
    {no: 5 ,  name: "طلب توكيل محامي"},
    {no: 6 ,  name: "طلب تغيير محامي"},
    {no: 7 ,  name: "تأجيل الجلسة بناء على طلبه"},
    {no: 8 ,  name: "تعديل لائحة الدعوى"},
    {no: 9 ,  name: "للاطلاع على مبرزات المدعى عليه"},
    {no: 10 , name: "المحامي ليس له صفة في الدعوى"},
    {no: 11 , name: "طلبات الإدخال والتدخل"},
    {no: 12 , name: "نظر الطلب"},
    {no: 13 , name: "التأجيل أملاً في المصالحة"},
    {no: 14 , name: "أخرى"},
];


defendant = [ //المدعى_عليه
    {no: 1 , name: "عدم حضور المدعى عليه أو وكيله" },
    {no: 2,  name: "السماح لتقديم بينات" },
    {no: 3,  name: "استكمال تقديم البينات" },
    {no: 4,  name: "عدم القدرة على تقديم البينات" },
    {no: 5,  name: "طلب توكيل محامي" },
    {no: 6,  name: "طلب تغيير محامي" },
    {no: 7,  name: "تأجيل الجلسة بناء على طلبه" },
    {no: 8,  name: "تقديم لائحة جوابية" },
    {no: 9,  name: "للاطلاع على مبرزات المدعي" },
    {no: 10, name: "المحامي ليس له صفة في الدعوى" },
    {no: 11, name: "طلبات الإدخال والتدخل" },
    {no: 12, name: "نظر الطلب" },
    {no: 13, name: "التأجيل أملاً في المصالحة" },
    {no: 14, name: "أخرى" },
];


hea = [
    //الهيئة_القضائية
    {no: 1,  name: "غياب القاضي /عدم اكتمال الهيئة القضائية"},
    {no: 2,  name: "طلب القاضي رأي خبير"},
    {no: 3,  name: "التأجيل أملاً في الصلح (عرض القاضي للصلح)"},
    {no: 4,  name: "تأجيل الجلسة للقرار في الدفوع"},
    {no: 5,  name: "عدم الاختصاص في نطاق معين من الدعوى"},
    {no: 6,  name: "تنحي القاضي"},
    {no: 7,  name: "فتح باب المرافعة"},
    {no: 8,  name: "سماع البينات"},
    {no: 9,  name: "عدم كفاية وقت المحكمة"},
    {no: 10, name: "الدراسة والحجز للحكم"},
    {no: 11, name: "تعديل لائحة الدعوى"},
    {no: 12, name: "عدم احضار ملف الدعوى"},
    {no: 13, name: "قرار المحكمة بإدخال خصوم للدعوى من تلقاء نفسها"},
    {no: 14, name: "أخرى"},
];

khabeer = [//الخبير
    {no: 1, name: "عدم حضور الخبير"},
    {no: 2, name: "تأخر الخبير في تسليم تقريره"},
    {no: 3, name: "عدم حلف الخبير لليمين"},
    {no: 4, name: "أخرى"},
];

witness=[ //الشهود
    {no:1, name: "عدم حضور الشاهد"},
    // {no:2, name: "طلب مزيد من الشهود"},
    {no:3, name: "أخرى"},
];

notes = [//التبيلغات
    {no:1, name: "عدم تبليغ المدعي أو وكيله" },
    {no:2, name: "عدم تبليغ المدعى عليه أو وكيله" },
    {no:3, name: "تأخر تبليغ الخبير" },
    {no:4, name: "تأخر تبليغ الشهود" },
    {no:5, name: "أخرى" },
];


corona= [//جائحة_كورونا
    {no:1, name: "الفترة الاستثنائية"},
    {no:2, name: "الإغلاق / إغلاق محكمة بسبب جائحة كورونا"},
    {no:3, name: "أخرى"},
];

daily = [//تأجيل_إداري
    {no:1, name: "إضراب"},
    {no:2, name: "أحوال جوية"},
    {no:3, name: "عطلة رسمية"},
    {no:4, name: "الاحتلال 'عدوان'"},
    {no:5, name: "دورات تدريبية"},
    {no:6, name: "أخرى"},
];

award =  [//عوارض_الخصومة
    {no:1, name: "التأجيل العام"},
    {no:2, name: "الشطب "},
    {no:3, name: "وفاة أحد الخصوم أو فقدان أهلية"},
    {no:4, name: "استئناف/طعن الطلبات الفرعية "},
    {no:5, name: "وقف الخصومة (وجود دعوى أخرى متعلقة بالدعوى)"},
    {no:6, name: "أخرى"},
];

file =  [// حركة الملف
    {no:1, name: "عدم إعادة الملف من محكمة الاستئناف "},
    {no:2, name: "عدم إعادة الملف من محكمة النقض"},
    {no:3, name: "عدم وجود الملف"},
    {no:4, name: "وقف لحين الفصل في الطلب"},
];

court_name = [ //اسم المحكمة
  {no: 1, name: 'بداية غزة'},
  {no: 2, name: 'بداية خانيونس'},
  {no: 3, name: 'بداية دير البلح'},
  {no: 4, name: 'بداية شمال غزة'},
  {no: 5, name: 'بداية رفح'},
  {no: 6, name: 'صلح غزة'},
  {no: 7, name: 'صلح خانيونس'},
  {no: 8, name: 'صلح دير البلح'},
  {no: 9, name: 'صلح شمال غزة'},
  {no: 10, name: 'صلح رفح'},
]

Judges_names = [
  {no : 1 ,  name: " 	انعام صبحي محمد الانشاصي "},
  {no : 2 ,  name: " 	ضياء الدين سعيد سليم المدهون "},
  {no : 3 ,  name: " 	اشرف رفيق حافظ فارس "},
  {no : 4 ,  name: " 	فاطمة خليل محمود المخللاتي "},
  {no : 5 ,  name: " 	اكرم عبد الفتاح يوسف كلاب "},
  {no : 6 ,  name: " 	على محمد عبد الله زامل "},
  {no : 7 ,  name: " 	احمد صبرة حسن النويري "},
  {no : 8 ,  name: " 	اياد يوسف عبد عاشور "},
  {no : 9 ,  name: " 	مسعود سلمان فريج الحشاش "},
  {no : 10 , name: "	محمد صلاح حسن الدريوي "},
  {no : 11 , name: "	زياد دياب ابراهيم الثوابتة "},
  {no : 12 , name: "	اشرف رفيق سليم نصر الله "},
  {no : 13 , name: "	انور فؤاد شعبان أبو شرخ "},
  {no : 14 , name: "	اشرف مصطفى ابو حميدان "},
  {no : 15 , name: "	احمد حسن سعيد الشيخ خليل  "},
  {no : 16 , name: "	فايز صالح عبد الرحمن أبو ربيع "},
  {no : 17 , name: "	حمدي محمد عبد الرحمن شاهين  "},
  {no : 18 , name: "	خليل احمد خليل حور  "},
  {no : 19 , name: "	اسامة عبد ربه حمدان ابو جامع  "},
  {no : 20 , name: "	محمد احمد حامد فروانة "},
  {no : 21 , name: "	احمد ابراهيم درويش عطا الله  "},
  {no : 22 , name: "	رشدي محمد رشدي أبو سيدو "},
  {no : 23 , name: "	فارس عبدالكريم فارس الغرة "},
  {no : 24 , name: "	بسام زهير يوسف الأغا "},
  {no : 25 , name: "	خليل عبد الكريم عبد الله الحتة "},
  {no : 26 , name: "	محمد حمدي السيد ابو مصبح "},
  {no : 27 , name: "	محمود احمد سليم بركة "},
  {no : 28 , name: "	ازهري محمد سفيان لطفي الربعي "},
  {no : 29 , name: "	عوض الله عبد الله محمود عوض الله "},
  {no : 30 , name: "	ضياء الدين عبد الحميد محمد الاسطل "},
  {no : 31 , name: "	عماد عبد عمر النبيه "},
  {no : 32 , name: "	سليمان صالح حمدان الغلبان "},
  {no : 33 , name: "	علاء طه احمد الغندور "},
  {no : 34 , name: "	خليل عاشور علي البطش "},
  {no : 35 , name: "	حسن على احمد الهسي "},
  {no : 36 , name: "	هشام حسن عبد الله كلخ "},
  {no : 37 , name: "	توفيق محمد جبر ابو جبر "},
  {no : 38 , name: "	نبيل عبد الله راشد الكباريتي "},
  {no : 39 , name: "	اسامه محمد محمود المسارعي "},
  {no : 40 , name: "	نور الدين محسن ابراهيم المدهون "},
  {no : 41 , name: "	سوزان محمد عبد ربه عقل "},
  {no : 42 , name: "	احمد فوزي محمد ابو عقلين  "},
  {no : 43 , name: "	احمد فوزي محمد أبو نعمة "},
  {no : 44 , name: "	يحيى اسماعيل محمد على حرارة "},
  {no : 45 , name: "	احمد خالد عبدالنور صالحة "},
  {no : 46 , name: "	محمود ابراهيم سعدي الراعي  "},
  {no : 47 , name: "	عبد الحميد وصفي غانم الاغا  "},
  {no : 48 , name: "	ابراهيم عبد الرحمن ابراهيم جودة  "},
  {no : 49 , name: "	سالم حمدان سالم قشطة "},
  {no : 50 , name: "	محمد زياد علي اللحام  "},
  {no : 51 , name: "	انس ابراهيم عبد الفتاح ابو ندى "},
  {no : 52 , name: "	حامد موسى جدوع السمك  "},
  {no : 53 , name: "	اسماعيل ابراهيم محمد ابو زيدان "},
  {no : 54 , name: "	محمد يوسف خليل نوفل "},
  {no : 55 , name: "	عبد الحكيم فتحي العبد رضوان "},
  {no : 56 , name: "	خليل محمود خليل الغرابلي "},
  {no : 57 , name: "	حسام منير شعبان نبهان  "},
  {no : 58 , name: "	احمد زياد ربيع المطوق  "},
  {no : 59 , name: "	حمدان سليمان محمد الدحدوح  "},
  {no : 60 , name: "	امجد سعد محمود شراب  "},
  {no : 61 , name: "	عبد الرحمن نصر هاشم التتر  "},
  {no : 62 , name: "	فهمي محمد زهير محمد أبو لبدة "},
  {no : 63 , name: "	محمد عمر إبراهيم مراد "},
  {no : 64 , name: "	ايهاب محمد فرحات عرفات "},
  {no : 65 , name: "	سامي نعيم كمال الاشرم  "},
  {no : 66 , name: "	محمود سالم بدوي ابو غالي  "},
  {no : 67 , name: "	هدى تيسير السيد عدوان "},
  {no : 68 , name: "	محمد محمود محمد ابو دان "},
  {no : 69 , name: "	ماهر حسني محمدعوض الجملة "},
  {no : 70 , name: "	عبد الفتاح رواي علي الأغا  "},
  {no : 71 , name: "	محمود عبدالمجيد يوسف الزطمة "},
  {no : 72 , name: "	وائل زهير عبد الله كلش  "},
  {no : 73 , name: "	احمد امين محمود صالحية  "},
  {no : 74 , name: "	فادي سمير سليمان أبو جامع "},
  {no : 75 , name: "	علاء رضوان جميل طوطح "},
  {no : 76 , name: "	ياسر علي ابراهيم نصار "},
  {no : 77 , name: "	حمزة محمود عطا أبو لبدة "},
  {no : 78 , name: "	محمد نافذ علي ريحان  "},
  {no : 79 , name: "	عبداللطيف صابر عبداللطيف ظاهر "},
  {no : 80 , name: "	عبد الرؤوف عمر الحلبي "},
  {no : 81 , name: "	 محمد احمد حسين عابد "},
  {no : 82 , name: "	محمد احمد يونس سعد "},
  {no : 83 , name: "	هشام حسين عبد الله أبو ندى "},
  {no : 84 , name: "	قاسم عايش أحمد عكاشة "},
  {no : 85 , name: "	حسن محمد حسن القهوجي - نقل  "},
  {no : 86 , name: "	بشير عمر بشير الحرتاني  "},
  {no : 87 , name: "	محمدسلام/ درويش مصطفى اللوح "},
  {no : 88 , name: "	محمد عبدالكريم اسماعيل الاشرم "},
  {no : 89 , name: "	سعيد محمد سعيد بطاح "},
  {no : 90 , name: "	محمد منير محمد معروف "},
  {no : 91 , name: "	خليل وحيد خليل بكري "},
  {no : 92 , name: "	محمد حمدي عودة الاغا "},
  {no : 93 , name: "	عادل صبحي مصطفى خليفه "},
]

}
