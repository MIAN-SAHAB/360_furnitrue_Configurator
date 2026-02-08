import React from 'react';
import { 
  Palette, Layout, Smartphone, Eye, 
  ArrowLeft, Check, Box as CubeIcon, Globe, Sparkles, 
  Layers, BarChart3, Boxes, Scan,
  RotateCw, LayoutDashboard, ShieldCheck, Zap,
  MousePointer2, Ruler, BoxSelect, TrendingUp as TrendingUpIcon
} from 'lucide-react';
import { COLORS } from '../constants';
import { AppView } from '../types';

export const Home = ({ onNavigate }) => {
  const mainFeatures = [
    {
      title: "عرض 360 درجة",
      desc: "تجربة عرض تفاعلية بزاوية كاملة تتيح للعملاء فحص الأثاث من كافة الجهات بدقة متناهية.",
      icon: RotateCw,
      color: "bg-blue-50 text-blue-600 border-blue-100"
    },
    {
      title: "الواقع المعزز (AR)",
      desc: "معاينة الأثاث في مساحة العميل الحقيقية باستخدام الكاميرا مباشرة من المتصفح.",
      icon: Scan,
      color: "bg-teal-50 text-teal-600 border-teal-100"
    },
    {
      title: "تخصيص المواد والألوان",
      desc: "تغيير الأقمشة، الأخشاب، والألوان فورياً على النموذج ثلاثي الأبعاد قبل الشراء.",
      icon: Palette,
      color: "bg-purple-50 text-purple-600 border-purple-100"
    },
    {
      title: "لوحة تحكم ذكية",
      desc: "إدارة كاملة للمنتجات، المخزون، وتحليلات تفاعل العملاء مع نماذج الـ 3D.",
      icon: LayoutDashboard,
      color: "bg-orange-50 text-orange-600 border-orange-100"
    },
    {
      title: "مكتبة ثيمات المتاجر",
      desc: "مجموعة متنوعة من القوالب والمخططات العصرية المصممة لتناسب هوية متجرك البصرية.",
      icon: Layers,
      color: "bg-pink-50 text-pink-600 border-pink-100"
    },
    {
      title: "بنية متعددة المستأجرين",
      desc: "بنية متطورة تدعم تعدد المؤسسات مع عزل منطقي وعزل بيانات كامل لضمان أعلى مستويات الأمان والخصوصية لكل جهة.",
      icon: ShieldCheck,
      color: "bg-gray-100 text-gray-800 border-gray-200"
    }
  ];

  const visualGallery = [
    {
      image: "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&q=80&w=800",
      alt: "Modern Living Room",
      label: "تصميم معاصر"
    },
    {
      image: "https://images.unsplash.com/photo-1598191383441-7c3a9928f6a0?auto=format&fit=crop&q=80&w=800",
      alt: "Scandinavian Interior",
      label: "راحة وأناقة"
    },
    {
      image: "https://images.unsplash.com/photo-1592078615290-033ee584e267?auto=format&fit=crop&q=80&w=800",
      alt: "Minimal Luxury Furniture",
      label: "مساحات فاخرة"
    }
  ];

  const stats = [
    { label: 'زيادة في المبيعات', value: '45%', icon: TrendingUpIcon },
    { label: 'تفاعل AR شهرياً', value: '100k+', icon: Smartphone },
    { label: 'نموذج ثلاثي أبعاد', value: '5,000+', icon: Boxes },
    { label: 'متجر نشط', value: '1,200+', icon: Globe }
  ];

  return (
    <div className="animate-in fade-in duration-1000 bg-[#fcfaf7]">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden pt-12 pb-24">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-[#f4f1ea] -z-10 rounded-bl-[15rem] shadow-sm"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-teal-500/5 rounded-full blur-[100px] -z-10"></div>
        
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            <div className="lg:col-span-6 relative z-10 order-2 lg:order-1">
              <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/90 backdrop-blur border border-teal-100 text-[#309ca8] text-xs font-bold mb-10 shadow-md">
                 <Sparkles className="w-4 h-4" /> المنصة المتكاملة للأثاث الذكي
              </div>
              <h1 className="text-[44px] md:text-[72px] font-bold text-[#1a1c1e] mb-8 leading-[1.05] tracking-tight">
                حوّل معرضك إلى <br/>
                <span className="text-[#309ca8] relative inline-block">
                    تجربة غامرة
                    <div className="absolute bottom-2 left-0 w-full h-3 bg-teal-500/10 -z-10"></div>
                </span> <br/>
                بتقنيات 3D و AR
              </h1>
              <p className="text-lg md:text-xl text-gray-500 mb-12 max-w-xl leading-relaxed font-medium">
                ارفع مستوى مبيعاتك مع أول منصة متخصصة في تجارة الأثاث تدعم العرض ثلاثي الأبعاد والواقع المعزز بشكل كامل وسلس.
              </p>
              <div className="flex flex-col sm:flex-row gap-6">
                <button onClick={() => onNavigate(AppView.ONBOARDING)} className="px-12 py-5 bg-[#1a1c1e] text-white rounded-[2rem] font-bold text-lg hover:bg-black transition-all shadow-2xl hover:shadow-gray-900/40 flex items-center justify-center gap-3 group">
                  <ArrowLeft className="w-5 h-5 group-hover:-translate-x-2 transition-transform" />
                  ابدأ بناء متجرك الآن
                </button>
                <button onClick={() => onNavigate(AppView.THEMES_GALLERY)} className="px-12 py-5 bg-white border border-gray-200 text-[#1a1c1e] rounded-[2rem] font-bold text-lg hover:bg-gray-50 transition-all shadow-sm flex items-center justify-center gap-3 group">
                  <Layout className="w-5 h-5 text-gray-400 group-hover:text-teal-600" />
                  استعراض الثيمات
                </button>
              </div>
              
              <div className="mt-16 flex items-center gap-6 border-t border-gray-100 pt-10">
                <div className="flex -space-x-4">
                  {[1,2,3,4].map(i => (
                    <div key={i} className="w-12 h-12 rounded-full border-4 border-white overflow-hidden shadow-sm">
                      <img src={`https://i.pravatar.cc/150?u=${i+10}`} alt="User" />
                    </div>
                  ))}
                  <div className="w-12 h-12 rounded-full border-4 border-white bg-teal-600 flex items-center justify-center text-white text-xs font-bold shadow-sm">+500</div>
                </div>
                <div className="text-sm font-medium text-gray-400">
                    انضم إلينا أكثر من <span className="text-gray-900 font-bold">500 جهة</span> <br/>
                    في جميع أنحاء المملكة.
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 relative order-1 lg:order-2 h-[550px] lg:h-[700px]">
              <div className="absolute top-10 left-10 w-[85%] h-[80%] rounded-[5rem] overflow-hidden shadow-2xl z-10 border-[12px] border-white ring-1 ring-gray-100">
                <img src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&q=80&w=1200" className="w-full h-full object-cover" alt="Luxury Sofa" />
              </div>
              <div className="absolute -bottom-5 -right-5 w-[65%] h-[45%] rounded-[4rem] border-[16px] border-white overflow-hidden shadow-2xl z-20 ring-1 ring-gray-100">
                <img src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=1000" className="w-full h-full object-cover" alt="Modern Interior" />
              </div>
              <div className="absolute top-1/2 -right-10 bg-white/90 backdrop-blur p-6 rounded-[2.5rem] shadow-2xl z-30 border border-gray-100 animate-bounce-slow">
                 <div className="w-12 h-12 bg-teal-500 rounded-2xl flex items-center justify-center text-white mb-3 shadow-lg shadow-teal-500/20">
                    <CubeIcon className="w-7 h-7" />
                 </div>
                 <p className="text-sm font-bold text-gray-900">أثاث 3D تفاعلي</p>
                 <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Real-time Rendering</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid Section */}
      <section className="py-32 bg-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-blue-500/5 rounded-full blur-[120px] -z-10"></div>
        <div className="container mx-auto px-4">
          <div className="text-center mb-24 animate-in slide-in-from-bottom duration-700">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-teal-50 text-teal-600 text-[10px] font-bold uppercase tracking-widest mb-6 border border-teal-100 shadow-sm">
              <Zap className="w-3.5 h-3.5" /> مميزات المنصة الذكية
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 tracking-tight">كل ما تحتاجه للنجاح في عالم الأثاث الرقمي</h2>
            <p className="text-gray-500 max-w-2xl mx-auto text-lg leading-relaxed">نوفر لك أحدث التقنيات البصرية وأدوات الإدارة المتطورة لتبني متجرك بأسلوب عالمي ينافس أكبر الماركات.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {mainFeatures.map((feature, idx) => (
              <div key={idx} className="group p-10 bg-[#fcfaf7] rounded-[3rem] border border-gray-100 shadow-sm hover:shadow-2xl hover:bg-white hover:-translate-y-3 transition-all duration-500">
                <div className={`w-20 h-20 rounded-[1.8rem] flex items-center justify-center mb-8 border-2 shadow-sm transition-transform duration-500 group-hover:rotate-6 ${feature.color}`}>
                  <feature.icon className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-teal-600 transition-colors">{feature.title}</h3>
                <p className="text-gray-500 text-base leading-relaxed font-medium">{feature.desc}</p>
                <div className="mt-8 pt-8 border-t border-gray-100 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-2 text-teal-600 font-bold text-sm">
                    اقرأ المزيد <ArrowLeft className="w-4 h-4" />
                </div>
              </div>
            ))}
          </div>

          {/* Optimized Visual Gallery Row (Furniture focused) */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 animate-in fade-in slide-in-from-bottom duration-1000 delay-300">
            {visualGallery.map((item, idx) => (
              <div key={idx} className="relative aspect-[16/10] rounded-[2rem] overflow-hidden group shadow-lg border border-gray-100/50">
                <img 
                  src={item.image} 
                  alt={item.alt} 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
                />
                <div className="absolute bottom-6 right-6 z-20">
                  <div className="bg-white/90 backdrop-blur-md px-5 py-2 rounded-full shadow-sm border border-white/20">
                    <p className="text-xs font-bold text-gray-900">{item.label}</p>
                  </div>
                </div>
                <div className="absolute inset-0 bg-black/5 group-hover:bg-black/20 transition-colors duration-500"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modern Stats / Social Proof */}
      <section className="py-32 bg-[#121212] text-white">
        <div className="container mx-auto px-4">
           <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 text-center items-center">
              {stats.map((stat, i) => (
                <div key={i} className="flex flex-col items-center group">
                   <div className="w-16 h-16 bg-[#1e1e1e] rounded-[1.2rem] flex items-center justify-center mb-6 text-[#309ca8] shadow-lg transition-transform group-hover:scale-110">
                      <stat.icon className="w-7 h-7" />
                   </div>
                   <h4 className="text-5xl md:text-6xl font-black mb-3 tracking-tight">
                     {stat.value}
                   </h4>
                   <p className="text-gray-400 text-sm md:text-base font-medium">
                     {stat.label}
                   </p>
                </div>
              ))}
           </div>
        </div>
      </section>
    </div>
  );
};
