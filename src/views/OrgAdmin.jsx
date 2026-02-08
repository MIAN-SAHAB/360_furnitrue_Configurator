
import React, { useState, useMemo } from 'react';
import { 
  Package, Search, Plus, Trash2, Edit3, Tag, Smartphone, ChevronDown, 
  Upload, Box as CubeIcon, Image as ImageIcon, Save, ArrowRight, Loader2, 
  Camera, BarChart3, Activity, Boxes, ShoppingCart, Info, MoreHorizontal,
  Filter, Download, LayoutGrid, List, MessageSquare, Globe, Settings as SettingsIcon,
  ChevronRight, FileText, Share2, MousePointer2
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { COLORS, MOCK_PRODUCTS, CATEGORIES as INITIAL_CATEGORIES } from '../constants';

export const OrgAdmin = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'products' | 'cms' | 'orders'>('overview');
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');
  const [searchTerm, setSearchTerm] = useState('');

  const stats = [
    { label: 'زوار المتجر', value: '4,285', icon: Globe, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'تفاعل AR', value: '1,120', icon: Smartphone, color: 'text-teal-600', bg: 'bg-teal-50' },
    { label: 'طلبات الأسعار', value: '45', icon: MessageSquare, color: 'text-orange-600', bg: 'bg-orange-50' },
    { label: 'إجمالي المبيعات', value: '128,400 ر.س', icon: ShoppingCart, color: 'text-purple-600', bg: 'bg-purple-50' },
  ];

  const mockOrders = [
    { id: 'ORD-101', customerName: 'أحمد محمد', total: 4500, status: 'processing', date: '2024-05-12' },
    { id: 'ORD-102', customerName: 'سارة خالد', total: 2400, status: 'delivered', date: '2024-05-11' },
    { id: 'ORD-103', customerName: 'ياسر العتيبي', total: 12000, status: 'pending', date: '2024-05-10' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      {/* Tab Selector & Actions */}
      <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
         <div className="bg-white p-1.5 rounded-[1.5rem] shadow-sm border border-gray-100 flex gap-1 w-full lg:w-auto">
            {[
              { id: 'overview', label: 'الإحصائيات', icon: BarChart3 },
              { id: 'products', label: 'المنتجات', icon: Package },
              { id: 'cms', label: 'المحتوى CMS', icon: FileText },
              { id: 'orders', label: 'الطلبات', icon: ShoppingCart },
            ].map(tab => (
              <button 
                key={tab.id}
                onClick={() => setActiveTab(tab.id)} 
                className={`flex-1 lg:flex-none flex items-center justify-center gap-2 px-6 py-2.5 rounded-2xl text-xs font-bold transition-all ${activeTab === tab.id ? 'bg-[#1a1c1e] text-white shadow-xl' : 'text-gray-400 hover:bg-gray-50'}`}
              >
                <tab.icon className="w-4 h-4" />
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            ))}
         </div>
         <div className="flex items-center gap-3 w-full lg:w-auto">
            <button className="flex-1 lg:flex-none bg-white border border-gray-100 text-gray-700 px-6 py-3.5 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-gray-50 transition shadow-sm">
               <Download className="w-5 h-5" /> تصدير Excel
            </button>
            <button className="flex-1 lg:flex-none bg-teal-600 text-white px-8 py-3.5 rounded-2xl font-bold flex items-center justify-center gap-2 shadow-xl shadow-teal-100 hover:bg-teal-700 transition">
               <Plus className="w-5 h-5" /> منتج جديد
            </button>
         </div>
      </div>

      {activeTab === 'overview' && (
        <div className="space-y-8">
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, i) => (
                <div key={i} className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-md transition">
                   <div className={`w-12 h-12 rounded-2xl ${stat.bg} ${stat.color} flex items-center justify-center mb-4`}>
                      <stat.icon className="w-6 h-6" />
                   </div>
                   <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">{stat.label}</p>
                   <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                </div>
              ))}
           </div>
           
           <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 bg-white p-10 rounded-[3rem] border border-gray-100 shadow-sm h-[400px]">
                 <h3 className="font-bold text-gray-800 mb-8 flex items-center gap-2">
                    <Activity className="w-5 h-5 text-teal-600" /> تحليل الزيارات وتفاعل AR
                 </h3>
                 <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={[{n:'أحد', v:100, a:20}, {n:'اثنين', v:150, a:40}, {n:'ثلاثاء', v:120, a:35}, {n:'أربعاء', v:180, a:60}, {n:'خميس', v:250, a:120}]}>
                       <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                       <XAxis dataKey="n" hide />
                       <YAxis hide />
                       <Area type="monotone" dataKey="v" stroke="#309ca8" fill="#309ca810" />
                       <Area type="monotone" dataKey="a" stroke="#cc943c" fill="#cc943c10" />
                    </AreaChart>
                 </ResponsiveContainer>
              </div>
              <div className="bg-white p-10 rounded-[3rem] border border-gray-100 shadow-sm">
                 <h3 className="font-bold text-gray-800 mb-6">المنتجات الأكثر مشاهدة</h3>
                 <div className="space-y-6">
                    {MOCK_PRODUCTS.slice(0, 3).map(p => (
                       <div key={p.id} className="flex items-center gap-4 group cursor-pointer">
                          <img src={p.image} className="w-14 h-14 rounded-2xl object-cover" />
                          <div className="flex-grow">
                             <p className="text-sm font-bold text-gray-800 group-hover:text-teal-600 transition">{p.name}</p>
                             <p className="text-[10px] text-gray-400 font-bold uppercase">{p.category}</p>
                          </div>
                          <span className="text-xs font-bold text-gray-400">842 زيارة</span>
                       </div>
                    ))}
                 </div>
              </div>
           </div>
        </div>
      )}

      {activeTab === 'products' && (
        <div className="space-y-6">
           <div className="bg-white p-6 rounded-[2.5rem] border border-gray-100 shadow-sm flex flex-col md:flex-row items-center gap-4">
              <div className="relative flex-grow">
                 <Search className="absolute right-4 top-3.5 w-4 h-4 text-gray-400" />
                 <input type="text" placeholder="ابحث باسم المنتج أو الـ SKU..." className="w-full pr-12 pl-4 py-3.5 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-teal-500/10 transition outline-none" />
              </div>
              <div className="flex items-center gap-2">
                 <select className="bg-gray-50 border-none px-6 py-3.5 rounded-2xl text-sm font-bold text-gray-600 outline-none">
                    <option>جميع التصنيفات</option>
                    {INITIAL_CATEGORIES.map(c => <option key={c.id}>{c.name}</option>)}
                 </select>
                 <div className="bg-gray-50 p-1 rounded-2xl flex gap-1">
                    <button onClick={() => setViewMode('list')} className={`p-2.5 rounded-xl transition ${viewMode === 'list' ? 'bg-white shadow-sm text-teal-600' : 'text-gray-400'}`}><List className="w-4 h-4" /></button>
                    <button onClick={() => setViewMode('grid')} className={`p-2.5 rounded-xl transition ${viewMode === 'grid' ? 'bg-white shadow-sm text-teal-600' : 'text-gray-400'}`}><LayoutGrid className="w-4 h-4" /></button>
                 </div>
              </div>
           </div>

           <div className="bg-white rounded-[3rem] border border-gray-100 overflow-hidden shadow-sm">
              <table className="w-full text-right">
                <thead className="bg-gray-50 text-[10px] font-bold text-gray-400 uppercase tracking-widest border-b">
                   <tr>
                      <th className="px-10 py-6">المنتج</th>
                      <th className="px-10 py-6">الـ SKU</th>
                      <th className="px-10 py-6">المخزون</th>
                      <th className="px-10 py-6">دعم 3D/AR</th>
                      <th className="px-10 py-6">السعر</th>
                      <th className="px-10 py-6">الإجراءات</th>
                   </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                   {MOCK_PRODUCTS.map(p => (
                      <tr key={p.id} className="group hover:bg-gray-50/50 transition">
                         <td className="px-10 py-6">
                            <div className="flex items-center gap-4">
                               <img src={p.image} className="w-14 h-14 rounded-2xl object-cover border border-gray-100" />
                               <div>
                                  <p className="font-bold text-gray-800 text-sm">{p.name}</p>
                                  <p className="text-[10px] text-gray-400 font-bold uppercase">{p.category}</p>
                               </div>
                            </div>
                         </td>
                         <td className="px-10 py-6 text-xs font-mono text-gray-400">#{p.sku}</td>
                         <td className="px-10 py-6">
                            <span className="px-3 py-1 bg-green-50 text-green-600 rounded-full text-[10px] font-bold">متوفر ({p.stock})</span>
                         </td>
                         <td className="px-10 py-6">
                            <div className="flex gap-2">
                               {p.arEnabled && <div className="w-8 h-8 rounded-lg bg-teal-50 text-teal-600 flex items-center justify-center shadow-sm"><Smartphone className="w-4 h-4" /></div>}
                               {p.is360Enabled && <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shadow-sm"><CubeIcon className="w-4 h-4" /></div>}
                            </div>
                         </td>
                         <td className="px-10 py-6 font-bold text-gray-900">{p.price} ر.س</td>
                         <td className="px-10 py-6">
                            <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                               <button className="p-3 bg-white border border-gray-100 rounded-xl hover:bg-teal-50 hover:text-teal-600 transition shadow-sm"><Edit3 className="w-4 h-4" /></button>
                               <button className="p-3 bg-white border border-gray-100 rounded-xl hover:bg-red-50 hover:text-red-500 transition shadow-sm"><Trash2 className="w-4 h-4" /></button>
                            </div>
                         </td>
                      </tr>
                   ))}
                </tbody>
              </table>
           </div>
        </div>
      )}

      {activeTab === 'cms' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-in slide-in-from-bottom duration-500">
           {[
             { title: 'من نحن', icon: Info, color: 'text-blue-500', bg: 'bg-blue-50' },
             { title: 'تواصل معنا', icon: MessageSquare, color: 'text-green-500', bg: 'bg-green-50' },
             { title: 'الصفحات التعريفية', icon: FileText, color: 'text-purple-500', bg: 'bg-purple-50' },
             { title: 'تحسين محركات البحث SEO', icon: Globe, color: 'text-orange-500', bg: 'bg-orange-50' },
             { title: 'روابط التواصل', icon: Share2, color: 'text-pink-500', bg: 'bg-pink-50' },
             { title: 'إعدادات المتجر', icon: SettingsIcon, color: 'text-gray-500', bg: 'bg-gray-50' }
           ].map((card, i) => (
             <div key={i} className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-xl transition group cursor-pointer">
                <div className={`w-14 h-14 rounded-2xl ${card.bg} ${card.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                   <card.icon className="w-7 h-7" />
                </div>
                <h4 className="text-lg font-bold text-gray-800 mb-2">{card.title}</h4>
                <p className="text-xs text-gray-400 leading-relaxed">تخصيص كامل للمحتوى الظاهر لعملائك لتعزيز هوية العلامة التجارية.</p>
                <div className="mt-6 flex items-center gap-2 text-teal-600 font-bold text-xs">
                   ابدأ التحرير <ChevronRight className="w-4 h-4 rotate-180" />
                </div>
             </div>
           ))}
        </div>
      )}

      {activeTab === 'orders' && (
        <div className="bg-white rounded-[3rem] border border-gray-100 overflow-hidden shadow-sm">
           <div className="p-8 border-b border-gray-50 flex justify-between items-center">
              <h3 className="font-bold text-gray-800">مركز الطلبات وعروض الأسعار</h3>
              <div className="flex gap-2">
                 <button className="px-4 py-2 bg-gray-50 text-gray-400 text-xs font-bold rounded-xl hover:bg-gray-100">بانتظار المراجعة</button>
                 <button className="px-4 py-2 bg-[#1a1c1e] text-white text-xs font-bold rounded-xl shadow-lg">الكل</button>
              </div>
           </div>
           <table className="w-full text-right">
              <thead className="bg-gray-50/50 text-[10px] font-bold text-gray-400 uppercase tracking-widest border-b">
                 <tr>
                    <th className="px-10 py-6">رقم الطلب</th>
                    <th className="px-10 py-6">العميل</th>
                    <th className="px-10 py-6">التاريخ</th>
                    <th className="px-10 py-6">المجموع</th>
                    <th className="px-10 py-6">الحالة</th>
                    <th className="px-10 py-6">التفاصيل</th>
                 </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                 {mockOrders.map(order => (
                    <tr key={order.id} className="hover:bg-gray-50/50 transition">
                       <td className="px-10 py-6 text-sm font-bold text-gray-700">{order.id}</td>
                       <td className="px-10 py-6 text-sm text-gray-600">{order.customerName}</td>
                       <td className="px-10 py-6 text-xs text-gray-400">{order.date}</td>
                       <td className="px-10 py-6 font-bold text-teal-700">{order.total} ر.س</td>
                       <td className="px-10 py-6">
                          <span className={`px-3 py-1 rounded-full text-[10px] font-bold ${
                            order.status === 'delivered' ? 'bg-green-50 text-green-600' :
                            order.status === 'processing' ? 'bg-blue-50 text-blue-600' : 'bg-orange-50 text-orange-600'
                          }`}>
                             {order.status}
                          </span>
                       </td>
                       <td className="px-10 py-6">
                          <button className="text-gray-400 hover:text-teal-600 transition"><MoreHorizontal className="w-5 h-5" /></button>
                       </td>
                    </tr>
                 ))}
              </tbody>
           </table>
        </div>
      )}
    </div>
  );
};
