
import React, { useState } from 'react';
import { Building2, FileText, Smartphone, Mail, ArrowRight, CheckCircle2, Upload, Fingerprint, ShieldCheck } from 'lucide-react';
import { COLORS } from '../constants';

export const Onboarding = ({ onComplete }) => {
  const [step, setStep] = useState(1);
  
  const renderStepIcon = (currentStep, target) => {
    if (currentStep > target) return <CheckCircle2 className="w-6 h-6 text-teal-500" />;
    return (
      <div className={`w-10 h-10 rounded-2xl flex items-center justify-center text-sm font-bold shadow-sm transition-all duration-300 ${currentStep === target ? 'bg-teal-600 text-white scale-110 shadow-teal-200' : 'bg-gray-100 text-gray-400'}`}>
        {target}
      </div>
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#fcfaf7] py-12 px-4">
      <div className="max-w-5xl w-full bg-white rounded-[3rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.08)] overflow-hidden flex flex-col md:flex-row border border-gray-100">
        {/* Side Panel */}
        <div className="w-full md:w-1/3 bg-[#1a1c1e] p-12 text-white flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
          <div>
            <div className="flex items-center gap-2 mb-12">
               <span className="text-2xl font-bold tracking-tighter text-teal-500">360</span>
               <span className="text-xl font-bold">Furniture</span>
            </div>
            <h2 className="text-3xl font-bold mb-6 leading-tight">سجل جهتك الآن <br/>في منصة المستقبل</h2>
            <p className="text-gray-400 text-sm leading-relaxed mb-12">أتمتة كاملة لعرض منتجاتك بتقنيات الـ 3D والواقع المعزز في خطوات بسيطة.</p>
            
            <div className="space-y-10 relative">
              {[
                { title: 'معلومات المنشأة', desc: 'CR, VAT والبيانات الرسمية' },
                { title: 'التحقق الثنائي', desc: 'تأكيد البريد والجوال OTP' },
                { title: 'المراجعة النهائية', desc: 'اعتماد الحساب والبدء' }
              ].map((s, i) => (
                <div key={i} className="flex gap-4 items-start group">
                  {renderStepIcon(step, i + 1)}
                  <div className="transition-all duration-300 group-hover:translate-x-[-4px]">
                    <h4 className={`font-bold text-sm ${step === i + 1 ? 'text-teal-400' : 'text-white'}`}>{s.title}</h4>
                    <p className="text-xs text-gray-500 mt-1">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="text-[10px] text-gray-500 font-bold uppercase tracking-widest pt-8 border-t border-white/5">
             جميع الحقوق محفوظة منصة 360 © 2024
          </div>
        </div>

        {/* Form Panel */}
        <div className="w-full md:w-2/3 p-12 overflow-y-auto max-h-[800px] custom-scrollbar bg-white">
          {step === 1 && (
            <div className="animate-in fade-in slide-in-from-left duration-700">
              <div className="mb-10">
                <h3 className="text-2xl font-bold text-gray-800">بيانات تسجيل الجهة</h3>
                <p className="text-gray-400 text-sm mt-1">يرجى إدخال البيانات الرسمية بدقة لضمان سرعة تفعيل الحساب.</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-widest mr-1">اسم المتجر / البراند</label>
                  <div className="relative">
                    <Building2 className="absolute right-3 top-3.5 w-4 h-4 text-gray-400" />
                    <input type="text" className="w-full pr-10 pl-4 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-teal-500/20 outline-none transition" placeholder="مثال: مفروشات الرواد" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-widest mr-1">الرقم الموحد للمنشأة (700)</label>
                  <input type="text" className="w-full px-4 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-teal-500/20 outline-none transition" placeholder="700XXXXXXXX" />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-widest mr-1">السجل التجاري (CR)</label>
                  <input type="text" className="w-full px-4 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl outline-none" placeholder="10XXXXXXXX" />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-widest mr-1">الرقم الضريبي (VAT)</label>
                  <input type="text" className="w-full px-4 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl outline-none" placeholder="3XXXXXXXXXXXXX" />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-widest mr-1">البريد الإلكتروني الرسمي</label>
                  <div className="relative">
                    <Mail className="absolute right-3 top-3.5 w-4 h-4 text-gray-400" />
                    <input type="email" className="w-full pr-10 pl-4 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl outline-none" placeholder="office@company.sa" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-widest mr-1">رقم الهاتف التواصل</label>
                  <div className="relative">
                    <Smartphone className="absolute right-3 top-3.5 w-4 h-4 text-gray-400" />
                    <input type="tel" className="w-full pr-10 pl-4 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl outline-none text-left" placeholder="05XXXXXXXX" dir="ltr" />
                  </div>
                </div>

                <div className="md:col-span-2 space-y-4">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-widest mr-1">رفع الوثائق الرسمية (PDF/Images)</label>
                  <div className="border-2 border-dashed border-gray-100 rounded-[2rem] p-10 flex flex-col items-center justify-center bg-gray-50 hover:bg-teal-50/50 hover:border-teal-200 transition-all cursor-pointer group">
                    <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-sm mb-4 group-hover:scale-110 transition-transform">
                      <Upload className="w-8 h-8 text-teal-600" />
                    </div>
                    <p className="text-sm font-bold text-gray-700">اسحب الملفات هنا أو انقر للرفع</p>
                    <span className="text-[10px] text-gray-400 mt-2 uppercase tracking-tighter">السجل التجاري، الشهادة الضريبية، هوية المفوض</span>
                  </div>
                </div>
              </div>

              <div className="mt-12">
                 <button onClick={() => setStep(2)} className="w-full bg-teal-600 text-white py-4.5 rounded-[1.5rem] font-bold text-lg hover:bg-teal-700 transition-all shadow-xl shadow-teal-200 flex items-center justify-center gap-3">
                   حفظ واستمرار التحقق <ArrowRight className="w-5 h-5" />
                 </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="animate-in fade-in slide-in-from-left duration-700 text-center py-10">
              <div className="w-20 h-20 bg-teal-50 rounded-3xl flex items-center justify-center mx-auto mb-8">
                 <Fingerprint className="w-10 h-10 text-teal-600" />
              </div>
              <h3 className="text-3xl font-bold text-gray-800 mb-4">التحقق الثنائي (OTP)</h3>
              <p className="text-gray-400 text-sm max-w-md mx-auto mb-12">أرسلنا رموزاً سرية مؤقتة إلى بريدك الإلكتروني وهاتفك المسجل لضمان ملكية الجهة.</p>
              
              <div className="space-y-12 mb-16">
                 <div>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-6 flex items-center justify-center gap-2">
                       <Smartphone className="w-3.5 h-3.5" /> رمز الجوال
                    </p>
                    <div className="flex gap-4 justify-center" dir="ltr">
                      {[1,2,3,4].map(i => (
                        <input key={i} type="text" maxLength={1} className="w-14 h-16 bg-gray-50 border border-gray-100 rounded-2xl text-center text-2xl font-black text-teal-600 focus:border-teal-500 focus:bg-white outline-none transition shadow-sm" />
                      ))}
                    </div>
                 </div>
                 <div>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-6 flex items-center justify-center gap-2">
                       <Mail className="w-3.5 h-3.5" /> رمز البريد الإلكتروني
                    </p>
                    <div className="flex gap-4 justify-center" dir="ltr">
                      {[1,2,3,4].map(i => (
                        <input key={i} type="text" maxLength={1} className="w-14 h-16 bg-gray-50 border border-gray-100 rounded-2xl text-center text-2xl font-black text-teal-600 focus:border-teal-500 focus:bg-white outline-none transition shadow-sm" />
                      ))}
                    </div>
                 </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <button onClick={() => setStep(1)} className="flex-1 py-4 bg-gray-100 text-gray-500 rounded-2xl font-bold hover:bg-gray-200 transition">السابق</button>
                <button onClick={() => setStep(3)} className="flex-[2] py-4 bg-teal-600 text-white rounded-2xl font-bold shadow-lg hover:bg-teal-700 transition">تحقق من الرموز</button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="h-full flex flex-col items-center justify-center text-center animate-in zoom-in duration-500 py-10">
              <div className="relative mb-8">
                 <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center">
                    <CheckCircle2 className="w-12 h-12 text-green-500" />
                 </div>
                 <div className="absolute -top-2 -right-2 w-10 h-10 bg-white rounded-2xl shadow-lg flex items-center justify-center border border-gray-100">
                    <ShieldCheck className="w-6 h-6 text-teal-500" />
                 </div>
              </div>
              <h3 className="text-3xl font-bold text-gray-800 mb-4">اكتمل تقديم الطلب!</h3>
              <p className="text-gray-500 max-w-sm mb-12 leading-relaxed">
                شكراً لثقتكم. طلب تسجيل <strong>"مفروشات الرواد"</strong> قيد المراجعة الآن. سيصلك إشعار بالاعتماد خلال 24 ساعة.
              </p>
              <div className="w-full max-w-md space-y-4">
                <div className="p-6 bg-gray-50 rounded-[2rem] border border-gray-100 space-y-4">
                   <div className="flex justify-between items-center text-sm border-b border-white pb-3">
                      <span className="text-gray-400 font-bold">رقم المرجع:</span>
                      <span className="font-mono font-bold text-gray-900">#REQ-360-7741</span>
                   </div>
                   <div className="flex justify-between items-center text-sm border-b border-white pb-3">
                      <span className="text-gray-400 font-bold">نوع الحساب:</span>
                      <span className="font-bold text-teal-600">Enterprise Tenant</span>
                   </div>
                   <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-400 font-bold">حالة التدقيق:</span>
                      <span className="flex items-center gap-1.5 text-orange-500 font-bold">
                         <div className="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></div> جاري المراجعة
                      </span>
                   </div>
                </div>
                <button onClick={onComplete} className="w-full bg-[#1a1c1e] text-white py-4.5 rounded-[1.5rem] font-bold hover:bg-black transition-all shadow-xl">العودة للرئيسية</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
