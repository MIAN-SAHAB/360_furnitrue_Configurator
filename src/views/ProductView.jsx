
import React from 'react';
import { 
  Smartphone, RotateCw, Maximize2, ShoppingCart, Heart, Share2, 
  ChevronLeft, Box as CubeIcon, Ruler, Globe
} from 'lucide-react';
import { AppView } from '../types';

const ModelViewer = 'model-viewer';

export const ProductView = ({ product, onNavigate }) => {
  return (
    <div className="min-h-screen bg-white animate-in fade-in duration-500">
      <div className="container mx-auto px-4 py-6 md:py-8">
        <div className="flex items-center gap-2 mb-8 text-xs font-bold text-gray-400">
          <button onClick={() => onNavigate(AppView.PUBLIC)} className="hover:text-teal-600">الرئيسية</button>
          <ChevronLeft className="w-3 h-3" />
          <span className="text-gray-900">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16 items-start">
          <div className="relative">
             <div className="aspect-square bg-gray-50 rounded-[1.5rem] md:rounded-[3rem] overflow-hidden border border-gray-100 relative shadow-inner">
                <ModelViewer
                  src="https://modelviewer.dev/shared-assets/models/Astronaut.glb"
                  style={{ width: '100%', height: '100%' }}
                  auto-rotate camera-controls shadow-intensity="1" environment-image="neutral"
                >
                  <button slot="ar-button" className="absolute bottom-4 md:bottom-8 left-1/2 -translate-x-1/2 bg-teal-600 text-white px-5 md:px-10 py-2.5 md:py-4 rounded-full font-bold shadow-2xl flex items-center gap-2 md:gap-3 hover:scale-105 transition text-xs md:text-base whitespace-nowrap">
                    <Smartphone className="w-5 h-5" /> جرب في غرفتك (AR)
                  </button>
                  <div className="absolute top-4 md:top-8 right-4 md:right-8 flex flex-col gap-2 md:gap-3">
                    <button className="w-10 h-10 md:w-12 md:h-12 bg-white/90 rounded-xl md:rounded-2xl shadow-lg flex items-center justify-center text-gray-700 hover:bg-white transition"><RotateCw className="w-4 h-4 md:w-5 md:h-5" /></button>
                    <button className="w-10 h-10 md:w-12 md:h-12 bg-white/90 rounded-xl md:rounded-2xl shadow-lg flex items-center justify-center text-gray-700 hover:bg-white transition"><Maximize2 className="w-4 h-4 md:w-5 md:h-5" /></button>
                  </div>
                </ModelViewer>
             </div>
          </div>

          <div className="space-y-8 md:space-y-10">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="px-3 py-1 bg-teal-50 text-teal-600 text-[10px] font-bold uppercase rounded border border-teal-100">جديد</span>
                <span className="text-[10px] font-bold text-gray-400 uppercase">SKU: {product.sku}</span>
              </div>
              <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">{product.name}</h1>
              <p className="text-3xl md:text-4xl font-bold text-teal-700 mb-6 md:mb-8 pb-6 md:pb-8 border-b border-gray-100">{product.price.toLocaleString()} ر.س</p>
              <p className="text-base md:text-lg text-gray-500 leading-relaxed mb-8 md:mb-10">{product.description}</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-8 mb-8 md:mb-10">
               <div className="p-5 md:p-6 bg-gray-50 rounded-2xl md:rounded-3xl border border-gray-100">
                 <div className="flex items-center gap-3 text-gray-400 mb-2 uppercase text-[10px] font-bold"><Ruler className="w-4 h-4" /> الأبعاد</div>
                 <p className="text-sm font-bold text-gray-800">220L × 95W × 85H سم</p>
               </div>
               <div className="p-5 md:p-6 bg-gray-50 rounded-2xl md:rounded-3xl border border-gray-100">
                 <div className="flex items-center gap-3 text-gray-400 mb-2 uppercase text-[10px] font-bold"><Globe className="w-4 h-4" /> المنشأ</div>
                 <p className="text-sm font-bold text-gray-800">صنع في إيطاليا</p>
               </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="flex-grow bg-gray-900 text-white py-5 rounded-2xl font-bold text-lg hover:bg-black transition-all shadow-2xl flex items-center justify-center gap-3">
                <ShoppingCart className="w-6 h-6" /> إضافة للسلة
              </button>
              <button className="w-16 h-16 bg-white border border-gray-200 rounded-2xl flex items-center justify-center text-gray-400 hover:text-red-500 transition-all"><Heart className="w-6 h-6" /></button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
