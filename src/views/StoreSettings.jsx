
import React from 'react';
/* Fix: Add Image aliased as ImageIcon to imports */
import { Settings, Shield, Bell, CreditCard, Globe, Mail, Save, User as UserIcon, Camera, Layout, Image as ImageIcon } from 'lucide-react';

export const StoreSettings = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500 pb-20">
      <div className="bg-white p-10 rounded-[3rem] border border-gray-100 shadow-sm space-y-12">
         {/* Profile Section */}
         <section className="space-y-6">
            <h3 className="text-xl font-bold text-gray-800 flex items-center gap-3 border-b pb-4">
               <Settings className="w-5 h-5 text-teal-600" /> الإعدادات الأساسية
            </h3>
            <div className="flex items-center gap-8">
               <div className="relative group">
                  <div className="w-24 h-24 rounded-[2rem] bg-gray-100 flex items-center justify-center overflow-hidden border-2 border-dashed border-gray-200">
                     <ImageIcon className="w-8 h-8 text-gray-300" />
                  </div>
                  <button className="absolute -bottom-2 -right-2 p-2 bg-teal-600 text-white rounded-xl shadow-lg hover:scale-110 transition">
                     <Camera className="w-4 h-4" />
                  </button>
               </div>
               <div className="flex-grow space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                     <div className="space-y-2">
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-1">اسم المتجر</label>
                        <input type="text" defaultValue="مفروشات الرواد" className="w-full p-3 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:ring-1 focus:ring-teal-500 outline-none transition" />
                     </div>
                     <div className="space-y-2">
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-1">رابط المتجر</label>
                        <div className="flex items-center bg-gray-50 border border-gray-100 rounded-xl px-3">
                           <span className="text-[10px] text-gray-400 font-mono">360.com/</span>
                           <input type="text" defaultValue="alrowad" className="flex-grow p-3 bg-transparent text-sm outline-none font-bold text-gray-600" />
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </section>

         {/* Business Info */}
         <section className="space-y-6">
            <h3 className="text-xl font-bold text-gray-800 flex items-center gap-3 border-b pb-4">
               <Globe className="w-5 h-5 text-blue-600" /> معلومات العمل
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <div className="space-y-2">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-1">البريد الإلكتروني التجاري</label>
                  <input type="email" defaultValue="info@alrowad.com" className="w-full p-3 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:ring-1 focus:ring-teal-500 outline-none transition" />
               </div>
               <div className="space-y-2">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-1">رقم الهاتف الموحد</label>
                  <input type="text" defaultValue="920001234" className="w-full p-3 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:ring-1 focus:ring-teal-500 outline-none transition" />
               </div>
            </div>
         </section>

         {/* Features Config */}
         <section className="space-y-6">
            <h3 className="text-xl font-bold text-gray-800 flex items-center gap-3 border-b pb-4">
               <Layout className="w-5 h-5 text-purple-600" /> ميزات العرض
            </h3>
            <div className="space-y-4">
               {[
                  { label: 'تفعيل الواقع المعزز (AR)', desc: 'السماح للعملاء بمشاهدة الأثاث في منازلهم.', checked: true },
                  { label: 'عرض 360 درجة', desc: 'تفعيل دوران المنتجات التفاعلي لجميع العملاء.', checked: true },
                  { label: 'تقارير التفاعل الذكية', desc: 'تحليل سلوك العملاء عند استخدام نماذج الـ 3D.', checked: false }
               ].map((f, i) => (
                  <div key={i} className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl hover:bg-teal-50/30 transition border border-transparent hover:border-teal-100">
                     <div>
                        <p className="text-sm font-bold text-gray-800">{f.label}</p>
                        <p className="text-[10px] text-gray-400">{f.desc}</p>
                     </div>
                     <div className={`w-12 h-6 rounded-full p-1 transition-colors cursor-pointer ${f.checked ? 'bg-teal-600' : 'bg-gray-300'}`}>
                        <div className={`w-4 h-4 bg-white rounded-full transition-transform ${f.checked ? '-translate-x-6' : 'translate-x-0'}`}></div>
                     </div>
                  </div>
               ))}
            </div>
         </section>

         <div className="pt-6 border-t border-gray-50 flex justify-end gap-4">
            <button className="px-8 py-3 bg-gray-100 text-gray-500 rounded-xl font-bold hover:bg-gray-200 transition">إلغاء</button>
            <button className="px-10 py-3 bg-teal-600 text-white rounded-xl font-bold shadow-xl shadow-teal-600/20 hover:scale-105 transition-all">حفظ التغييرات</button>
         </div>
      </div>
    </div>
  );
};
