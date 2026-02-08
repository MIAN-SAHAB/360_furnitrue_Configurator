
import React from 'react';
/* Fix: Add Plus to imports */
import { Box as CubeIcon, Upload, Trash2, Play, Download, MoreHorizontal, Smartphone, CheckCircle2, Search, Plus } from 'lucide-react';
import { MOCK_MODELS } from '../constants';

export const ModelManagement = () => {
  return (
    <div className="space-y-8 animate-in slide-in-from-bottom duration-500">
      <div className="flex flex-col md:flex-row justify-between items-center gap-6">
         <div>
            <h2 className="text-2xl font-bold text-gray-900">إدارة النماذج ثلاثية الأبعاد</h2>
            <p className="text-gray-400 text-sm mt-1">رفع وإدارة ملفات GLB و USDZ للمنتجات</p>
         </div>
         <button className="bg-teal-600 text-white px-8 py-3.5 rounded-2xl font-bold flex items-center gap-2 shadow-xl shadow-teal-600/20 hover:scale-105 transition-all">
            <Upload className="w-5 h-5" /> رفع نموذج جديد
         </button>
      </div>

      <div className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm">
         <div className="relative max-w-md mb-8">
            <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
            <input type="text" placeholder="بحث عن نموذج..." className="w-full bg-gray-50 border-none rounded-xl px-10 py-3 text-sm focus:ring-2 focus:ring-teal-500/10 transition" />
         </div>

         <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {MOCK_MODELS.map(model => (
               <div key={model.id} className="group relative bg-gray-50 rounded-[2.5rem] p-4 border border-transparent hover:border-teal-200 hover:bg-white hover:shadow-xl transition-all duration-500">
                  <div className="aspect-square bg-white rounded-3xl mb-4 flex items-center justify-center relative overflow-hidden shadow-inner">
                     <CubeIcon className="w-12 h-12 text-gray-200 group-hover:text-teal-500 transition-colors" />
                     <div className="absolute inset-0 bg-teal-600/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <button className="w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center text-teal-600 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                           <Play className="w-4 h-4 fill-current" />
                        </button>
                     </div>
                     <div className="absolute top-3 left-3 flex gap-1">
                        <span className="text-[8px] font-bold bg-white/80 backdrop-blur px-2 py-0.5 rounded-full text-gray-500 border border-gray-100 uppercase">{model.format}</span>
                     </div>
                  </div>
                  
                  <div className="px-1">
                     <h4 className="font-bold text-gray-800 text-xs truncate mb-1">{model.name}</h4>
                     <div className="flex justify-between items-center">
                        <span className="text-[9px] text-gray-400 font-mono">{model.size}</span>
                        <div className="flex gap-1">
                           <button className="p-1.5 hover:bg-red-50 hover:text-red-500 rounded-lg text-gray-300 transition"><Trash2 className="w-3 h-3" /></button>
                           <button className="p-1.5 hover:bg-gray-100 rounded-lg text-gray-300 transition"><MoreHorizontal className="w-3 h-3" /></button>
                        </div>
                     </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
                     <div className="flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3 text-teal-500" />
                        <span className="text-[9px] font-bold text-gray-400">مرتبط بمنتج</span>
                     </div>
                     <div className="flex items-center gap-1 text-[9px] font-bold text-gray-400">
                        <Smartphone className="w-3 h-3" /> AR
                     </div>
                  </div>
               </div>
            ))}

            {/* Upload Placeholder */}
            <div className="aspect-[4/5] border-2 border-dashed border-gray-200 rounded-[2.5rem] flex flex-col items-center justify-center gap-3 text-gray-400 hover:border-teal-500 hover:text-teal-500 hover:bg-teal-50 transition-all cursor-pointer">
               <div className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center border border-gray-100">
                  <Plus className="w-6 h-6" />
               </div>
               <span className="text-[10px] font-bold">إضافة نموذج جديد</span>
            </div>
         </div>
      </div>
    </div>
  );
};
