
import React, { useState } from 'react';
import { Palette, Type, MousePointer2, Layout, Eye, Save, MoveVertical } from 'lucide-react';
import { COLORS } from '../constants';

export const ThemeCustomizer = () => {
  const [activeTab, setActiveTab] = useState('colors');

  return (
    <div className="flex gap-8 h-full">
      {/* Control Panel */}
      <div className="w-80 bg-white rounded-[2rem] shadow-sm border border-gray-100 flex flex-col">
        <div className="p-6 border-b">
           <h3 className="font-bold text-gray-800">تخصيص الهوية</h3>
           <p className="text-xs text-gray-400 mt-1">قم بتعديل الثيم ليناسب علامتك التجارية</p>
        </div>
        <div className="flex-grow p-6 space-y-8 custom-scrollbar overflow-y-auto">
          {/* Colors */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest flex items-center gap-2">
              <Palette className="w-3 h-3" /> لوحة الألوان
            </h4>
            <div className="space-y-4">
               <div>
                 <label className="text-xs text-gray-500 mb-2 block">اللون الأساسي</label>
                 <div className="flex items-center gap-3">
                   <div className="w-8 h-8 rounded-full border-2 border-white shadow-sm ring-1 ring-gray-200" style={{ backgroundColor: COLORS.petrolBlue }}></div>
                   <input type="text" value="#1a394f" className="flex-grow text-xs font-mono p-2 bg-gray-50 rounded-lg outline-none" readOnly />
                 </div>
               </div>
               <div>
                 <label className="text-xs text-gray-500 mb-2 block">اللون الثانوي</label>
                 <div className="flex items-center gap-3">
                   <div className="w-8 h-8 rounded-full border-2 border-white shadow-sm ring-1 ring-gray-200" style={{ backgroundColor: COLORS.teal }}></div>
                   <input type="text" value="#309ca8" className="flex-grow text-xs font-mono p-2 bg-gray-50 rounded-lg outline-none" readOnly />
                 </div>
               </div>
               <div>
                 <label className="text-xs text-gray-500 mb-2 block">لون التمييز (Accent)</label>
                 <div className="flex items-center gap-3">
                   <div className="w-8 h-8 rounded-full border-2 border-white shadow-sm ring-1 ring-gray-200" style={{ backgroundColor: COLORS.gold }}></div>
                   <input type="text" value="#cc943c" className="flex-grow text-xs font-mono p-2 bg-gray-50 rounded-lg outline-none" readOnly />
                 </div>
               </div>
            </div>
          </div>

          {/* Typography */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest flex items-center gap-2">
              <Type className="w-3 h-3" /> الخطوط
            </h4>
            <select className="w-full p-3 bg-gray-50 border border-gray-100 rounded-xl text-sm outline-none">
              <option>Tajawal (Recommended)</option>
              <option>Almarai</option>
              <option>Cairo</option>
            </select>
          </div>

          {/* Buttons & Borders */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest flex items-center gap-2">
              <MousePointer2 className="w-3 h-3" /> الحواف والأزرار
            </h4>
            <div className="grid grid-cols-3 gap-2">
               <button className="p-3 border rounded-lg flex items-center justify-center hover:border-teal-500 transition"><div className="w-4 h-4 border-2 border-gray-400"></div></button>
               <button className="p-3 border rounded-xl flex items-center justify-center border-teal-500 bg-teal-50"><div className="w-4 h-4 border-2 border-teal-500 rounded-md"></div></button>
               <button className="p-3 border rounded-full flex items-center justify-center hover:border-teal-500 transition"><div className="w-4 h-4 border-2 border-gray-400 rounded-full"></div></button>
            </div>
          </div>

          {/* Layout Drag & Drop Mockup */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest flex items-center gap-2">
              <Layout className="w-3 h-3" /> ترتيب الأقسام
            </h4>
            <div className="space-y-2">
               {['البانر الرئيسي', 'الفئات', 'المنتجات الرائجة', 'واقع معزز (AR)', 'آراء العملاء'].map((section, idx) => (
                 <div key={idx} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl cursor-move border border-transparent hover:border-teal-200 transition">
                   <MoveVertical className="w-4 h-4 text-gray-400" />
                   <span className="text-xs font-medium text-gray-600">{section}</span>
                 </div>
               ))}
            </div>
          </div>
        </div>
        <div className="p-6 border-t mt-auto">
           <button className="w-full bg-teal-600 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg hover:bg-teal-700 transition">
             <Save className="w-5 h-5" /> حفظ التغييرات
           </button>
        </div>
      </div>

      {/* Preview Area */}
      <div className="flex-grow flex flex-col">
         <div className="bg-white p-4 rounded-t-[2rem] border-x border-t border-gray-100 flex items-center justify-between">
           <div className="flex gap-2">
             <div className="w-3 h-3 rounded-full bg-red-400"></div>
             <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
             <div className="w-3 h-3 rounded-full bg-green-400"></div>
           </div>
           <div className="bg-gray-100 px-8 py-1 rounded-full text-[10px] text-gray-400 font-mono">https://yourstore.360.com</div>
           <button className="text-teal-600 text-xs font-bold flex items-center gap-1"><Eye className="w-3 h-3" /> معاينة بالحجم الكامل</button>
         </div>
         <div className="flex-grow bg-gray-50 rounded-b-[2rem] border border-gray-100 overflow-hidden relative">
            <div className="absolute inset-0 overflow-y-auto custom-scrollbar p-8">
              <div className="bg-white rounded-[2rem] shadow-lg max-w-4xl mx-auto min-h-full origin-top transform scale-[0.9]">
                 {/* Mini Preview of the Landing Page */}
                 <header className="p-6 border-b flex justify-between">
                    <div className="w-24 h-6 bg-gray-100 rounded"></div>
                    <div className="flex gap-4">
                      <div className="w-12 h-2 bg-gray-100 rounded"></div>
                      <div className="w-12 h-2 bg-gray-100 rounded"></div>
                    </div>
                 </header>
                 <div className="p-12">
                   <div className="w-full h-48 rounded-[2rem] mb-8" style={{ backgroundColor: COLORS.petrolBlue }}></div>
                   <div className="grid grid-cols-4 gap-4 mb-12">
                     {[1,2,3,4].map(i => <div key={i} className="aspect-square bg-gray-100 rounded-2xl"></div>)}
                   </div>
                   <div className="space-y-4">
                     <div className="h-4 bg-gray-100 rounded w-1/4"></div>
                     <div className="grid grid-cols-3 gap-6">
                       {[1,2,3].map(i => <div key={i} className="aspect-[3/4] bg-gray-50 rounded-3xl border border-gray-100"></div>)}
                     </div>
                   </div>
                 </div>
              </div>
            </div>
         </div>
      </div>
    </div>
  );
};
