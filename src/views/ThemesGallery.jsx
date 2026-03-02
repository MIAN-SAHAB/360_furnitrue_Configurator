
import React, { useState, useMemo } from 'react';
import { 
  Smartphone, Monitor, Eye, Check, ShoppingCart, 
  Filter, X, Scan, Box as CubeIcon, Layout, 
  Star, ArrowLeft, ChevronLeft, ChevronRight, Laptop,
  Layers, Palette, ShieldCheck, Sparkles
} from 'lucide-react';
import { COLORS, MOCK_THEMES } from '../constants';
// import { StoreTheme, AppView } from '../types';

export const ThemesGallery = ({ onNavigate }) => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedTheme, setSelectedTheme] = useState(null);
  const [previewDevice, setPreviewDevice] = useState('desktop');

  const filteredThemes = useMemo(() => {
    if (activeFilter === 'All') return MOCK_THEMES;
    if (activeFilter === '3D/AR') return MOCK_THEMES.filter(t => t.features.ar || t.features.threeD);
    return MOCK_THEMES.filter(t => t.category === activeFilter);
  }, [activeFilter]);

  if (selectedTheme) {
    return (
      <div className="min-h-screen bg-[#f8f9fb] animate-in fade-in duration-500">
        {/* Preview Header */}
        <header className="bg-white border-b px-4 md:px-8 py-3 md:py-4 sticky top-0 z-[60] flex flex-col md:flex-row items-start md:items-center justify-between gap-3 md:gap-4 shadow-sm">
          <div className="flex items-center gap-3 md:gap-6">
            <button 
              onClick={() => setSelectedTheme(null)}
              className="flex items-center gap-2 text-gray-500 hover:text-gray-900 transition font-bold text-sm"
            >
              <ArrowLeft className="w-4 h-4" /> العودة للمعرض
            </button>
            <div className="h-6 w-[1px] bg-gray-200"></div>
            <div>
              <h2 className="text-lg font-bold text-gray-900">{selectedTheme.name}</h2>
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{selectedTheme.category} Theme</p>
            </div>
          </div>

          {/* Device Toggles */}
          <div className="hidden md:flex bg-gray-100 p-1 rounded-2xl gap-1">
            <button 
              onClick={() => setPreviewDevice('desktop')}
              className={`flex items-center gap-2 px-6 py-2 rounded-xl text-xs font-bold transition-all ${previewDevice === 'desktop' ? 'bg-white text-teal-600 shadow-sm' : 'text-gray-500'}`}
            >
              <Monitor className="w-4 h-4" /> كمبيوتر
            </button>
            <button 
              onClick={() => setPreviewDevice('mobile')}
              className={`flex items-center gap-2 px-6 py-2 rounded-xl text-xs font-bold transition-all ${previewDevice === 'mobile' ? 'bg-white text-teal-600 shadow-sm' : 'text-gray-500'}`}
            >
              <Smartphone className="w-4 h-4" /> جوال
            </button>
          </div>

          <div className="flex items-center justify-between md:justify-end w-full md:w-auto gap-4">
             <div className="hidden sm:block text-left">
               <p className="text-xs text-gray-400 font-bold">السعر</p>
               <p className="text-lg font-bold text-teal-700">{selectedTheme.price} ر.س</p>
             </div>
             <button className="bg-gray-900 text-white px-5 md:px-8 py-2.5 md:py-3 rounded-2xl font-bold shadow-xl shadow-gray-900/10 hover:bg-black transition-all flex items-center gap-2 text-sm md:text-base whitespace-nowrap">
               شراء وتفعيل <ShoppingCart className="w-4 h-4" />
             </button>
          </div>
        </header>

        {/* Mock Store Preview Rendering */}
        <div className="p-3 md:p-8 flex justify-center">
          <div 
            className={`bg-white shadow-2xl rounded-[1.5rem] md:rounded-[3rem] overflow-hidden transition-all duration-700 border border-gray-100 ${previewDevice === 'mobile' ? 'w-full max-w-[375px] h-[680px] sm:h-[750px]' : 'w-full max-w-7xl h-[760px] md:h-[1200px]'}`}
          >
            <div className="w-full h-full overflow-y-auto custom-scrollbar bg-white">
               {/* Mock Homepage Structure */}
               <nav className="p-4 md:p-6 border-b flex justify-between items-center gap-3">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-gray-900"></div>
                    <span className="font-bold text-base md:text-xl tracking-tighter">FURNI.STORE</span>
                  </div>
                  <div className="hidden md:flex gap-6 text-sm font-medium text-gray-400">
                    <span>جديدنا</span>
                    <span>المنتجات</span>
                    <span>تواصل معنا</span>
                  </div>
               </nav>
               <div className="p-4 md:p-12">
                 <div className="w-full h-[260px] md:h-[400px] rounded-[1.5rem] md:rounded-[3rem] mb-8 md:mb-12 flex flex-col items-center justify-center text-center p-4 md:p-12 overflow-hidden relative group" style={{ backgroundColor: selectedTheme.styles.colors[0] }}>
                    <img src={selectedTheme.previewImage} className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-overlay" />
                    <h1 className="text-2xl md:text-5xl font-bold text-white mb-3 md:mb-6 z-10">عنوان البانر الرئيسي</h1>
                    <p className="text-white/80 max-w-xl z-10 leading-relaxed mb-5 md:mb-8 text-sm md:text-base">هنا يظهر النص التعريفي للمتجر الخاص بك، هذا الثيم صمم ليعرض أثاثك بأفضل شكل ممكن.</p>
                    <button className="px-5 md:px-10 py-2.5 md:py-4 bg-white text-gray-900 rounded-full font-bold shadow-xl z-10 text-sm md:text-base">استعرض الكولكشن</button>
                 </div>

                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-8 mb-12 md:mb-20">
                    {[1,2,3,4].map(i => (
                      <div key={i} className="group">
                        <div className="aspect-[3/4] bg-gray-100 rounded-[2rem] mb-4 overflow-hidden relative">
                           <img src={`https://picsum.photos/seed/${i + 10}/600/800`} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                           {selectedTheme.features.ar && <div className="absolute top-4 left-4 p-2 bg-white/80 backdrop-blur rounded-xl text-teal-600"><Scan className="w-4 h-4" /></div>}
                        </div>
                        <h3 className="font-bold text-gray-800">اسم المنتج النموذجي</h3>
                        <p className="text-sm text-gray-400">1,200 ر.س</p>
                      </div>
                    ))}
                 </div>
               </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-in fade-in duration-700 bg-[#fcfaf7] min-h-screen">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[70%] md:w-[40%] h-[420px] md:h-[600px] bg-teal-500/5 -z-10 rounded-bl-[8rem] md:rounded-bl-[20rem] blur-[100px]"></div>
      
      <div className="container mx-auto px-4 py-12 md:py-20">
        <div className="text-center mb-12 md:mb-20 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-gray-100 text-gray-400 text-[10px] font-bold uppercase tracking-widest mb-6 shadow-sm">
             <Palette className="w-3.5 h-3.5" /> مكتبة الثيمات
          </div>
          <h1 className="text-[34px] md:text-[64px] font-bold text-gray-900 mb-5 md:mb-6 leading-tight">اختر ثيم متجرك</h1>
          <p className="text-base md:text-lg text-gray-500 leading-relaxed">
            مجموعة من الثيمات الجاهزة لتصميم متجر أثاثك بسهولة. صممت بعناية لتجذب العملاء وتدعم أحدث التقنيات البصرية.
          </p>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-12 gap-4 md:gap-8 sticky top-20 md:top-24 z-40 bg-[#fcfaf7]/80 backdrop-blur-xl p-4 md:p-6 rounded-[1.5rem] md:rounded-[2.5rem] border border-white shadow-xl shadow-gray-200/20">
          <div className="flex flex-wrap items-center gap-2">
            {[
              { id: 'All', label: 'الكل' },
              { id: 'Modern', label: 'مودرن' },
              { id: 'Classic', label: 'كلاسيكي' },
              { id: 'Dark', label: 'داكن' },
              { id: 'Light', label: 'فاتح' },
              { id: 'Luxury', label: 'فاخر' },
              { id: '3D/AR', label: 'يدعم 3D / AR' },
            ].map(filter => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`px-6 py-2.5 rounded-2xl text-sm font-bold transition-all ${activeFilter === filter.id ? 'bg-teal-600 text-white shadow-lg shadow-teal-600/30' : 'bg-white text-gray-500 hover:bg-gray-50 border border-gray-100'}`}
              >
                {filter.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3 md:gap-4 text-[10px] md:text-xs font-bold text-gray-400 uppercase tracking-widest">
            <span className="flex items-center gap-2 text-teal-600"><Check className="w-4 h-4" /> تحديثات مجانية</span>
            <div className="w-[1px] h-4 bg-gray-200"></div>
            <span className="flex items-center gap-2 text-teal-600"><Check className="w-4 h-4" /> دعم فني</span>
          </div>
        </div>

        {/* Themes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {filteredThemes.map((theme) => (
            <div 
              key={theme.id} 
              className="group relative bg-white rounded-[3rem] overflow-hidden border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-700 flex flex-col"
            >
              {/* Image & Overlay */}
              <div className="aspect-[4/3] relative overflow-hidden bg-gray-100">
                <img src={theme.previewImage} alt={theme.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[1.5s]" />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                   <button 
                    onClick={() => setSelectedTheme(theme)}
                    className="bg-white text-gray-900 px-8 py-3 rounded-2xl font-bold text-sm shadow-xl flex items-center gap-2 hover:scale-105 transition"
                   >
                     <Eye className="w-4 h-4" /> معاينة الثيم
                   </button>
                </div>
                {theme.isPremium && (
                  <div className="absolute top-6 right-6 px-4 py-1.5 bg-gold-600 text-white rounded-full text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 shadow-lg" style={{ backgroundColor: COLORS.gold }}>
                    <Star className="w-3 h-3 fill-white" /> Premium
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-10 flex-grow flex flex-col">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-[10px] font-bold text-teal-600 bg-teal-50 px-3 py-1.5 rounded-full uppercase tracking-widest">{theme.category}</span>
                  <div className="flex gap-2">
                    {theme.features.threeD && <div className="p-1.5 bg-gray-50 rounded-lg text-gray-400" title="يدعم 3D"><CubeIcon className="w-3.5 h-3.5" /></div>}
                    {theme.features.ar && <div className="p-1.5 bg-gray-50 rounded-lg text-gray-400" title="يدعم AR"><Scan className="w-3.5 h-3.5" /></div>}
                  </div>
                </div>
                
                <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-teal-600 transition-colors">{theme.name}</h3>
                <p className="text-sm text-gray-400 leading-relaxed mb-8 flex-grow">{theme.description}</p>
                
                <div className="pt-8 border-t border-gray-50 flex items-center justify-between">
                  <div className="text-sm font-bold text-teal-700">
                     {theme.price === 0 ? 'مجاني' : `${theme.price.toLocaleString()} ر.س`}
                  </div>
                  <button className="text-gray-900 font-bold text-sm flex items-center gap-2 hover:translate-x-1 transition-transform">
                    تفعيل الآن <ChevronLeft className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredThemes.length === 0 && (
          <div className="py-32 text-center animate-in zoom-in duration-300">
             <Layers className="w-20 h-20 text-gray-100 mx-auto mb-6" />
             <h3 className="text-2xl font-bold text-gray-800 mb-2">لا يوجد ثيمات بهذا التصنيف</h3>
             <p className="text-gray-400">جرب اختيار تصنيف آخر أو استعرض كل الثيمات.</p>
             <button onClick={() => setActiveFilter('All')} className="mt-8 px-8 py-3 bg-teal-600 text-white rounded-2xl font-bold">عرض كل الثيمات</button>
          </div>
        )}
      </div>
    </div>
  );
};
