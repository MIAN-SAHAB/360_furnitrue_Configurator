
import React, { useState } from 'react';
import { 
  Globe, Layout, Layers, Box as CubeIcon, Settings, 
  BarChart3, Users, Plus, LogIn, Trash2, StopCircle, 
  Play, CreditCard, Activity, Search, 
  Download, Image as ImageIcon, Smartphone,
  ExternalLink, ShieldCheck, Upload, Palette, MoreHorizontal,
  ChevronRight, CheckCircle, AlertTriangle, TrendingUp, DollarSign,
  Briefcase, History, FileText, Lock
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell } from 'recharts';
import { COLORS, MOCK_TENANTS, MOCK_THEMES } from '../constants';

const performanceData = [
  { name: 'يناير', stores: 20, revenue: 12000, interactions: 4500 },
  { name: 'فبراير', stores: 35, revenue: 18000, interactions: 5200 },
  { name: 'مارس', stores: 48, revenue: 25000, interactions: 7800 },
  { name: 'أبريل', stores: 62, revenue: 32000, interactions: 12000 },
  { name: 'مايو', stores: 85, revenue: 45000, interactions: 18500 },
];

export const SuperAdmin = () => {
  const [activeSubTab, setActiveSubTab] = useState<'dashboard' | 'tenants' | 'billing' | 'logs'>('dashboard');

  const stats = [
    { label: 'إجمالي الجهات المسجلة', value: '1,248', change: '+12%', icon: Globe, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'إيرادات الاشتراكات', value: '45,850 ر.س', change: '+8%', icon: DollarSign, color: 'text-green-600', bg: 'bg-green-50' },
    { label: 'تفاعل AR الكلي', value: '100k+', change: '+24%', icon: Smartphone, color: 'text-purple-600', bg: 'bg-purple-50' },
    { label: 'النماذج 3D المرفوعة', value: '3,120', change: '+5%', icon: CubeIcon, color: 'text-orange-600', bg: 'bg-orange-50' },
  ];

  return (
    <div className="space-y-10 animate-in fade-in duration-500 pb-12">
      {/* Sub Navigation */}
      <div className="flex gap-4 p-1.5 bg-white border border-gray-100 rounded-2xl w-fit shadow-sm">
         {[
           { id: 'dashboard', label: 'اللوحة الرئيسية', icon: Activity },
           { id: 'tenants', label: 'إدارة الجهات', icon: Briefcase },
           { id: 'billing', label: 'المالية والدفع', icon: CreditCard },
           { id: 'logs', label: 'السجلات Logs', icon: History }
         ].map(tab => (
           <button 
             key={tab.id}
             onClick={() => setActiveSubTab(tab.id)}
             className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-bold transition-all ${activeSubTab === tab.id ? 'bg-[#1a1c1e] text-white shadow-xl' : 'text-gray-400 hover:bg-gray-50'}`}
           >
             <tab.icon className="w-4 h-4" /> {tab.label}
           </button>
         ))}
      </div>

      {activeSubTab === 'dashboard' && (
        <div className="space-y-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <div key={i} className="bg-white p-8 rounded-[3rem] border border-gray-100 shadow-sm hover:shadow-xl transition-all group">
                <div className="flex justify-between items-start mb-6">
                  <div className={`p-4 rounded-[1.5rem] ${stat.bg} ${stat.color} shadow-sm`}>
                    <stat.icon className="w-8 h-8" />
                  </div>
                  <span className="text-[11px] font-bold text-green-600 bg-green-50 px-3 py-1.5 rounded-full flex items-center gap-1">
                    <TrendingUp className="w-4 h-4" /> {stat.change}
                  </span>
                </div>
                <h3 className="text-sm font-bold text-gray-400 mb-1 uppercase tracking-widest">{stat.label}</h3>
                <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2 bg-white p-10 rounded-[3rem] border border-gray-100 shadow-sm">
              <div className="flex justify-between items-center mb-10">
                <h3 className="text-xl font-bold text-gray-800 flex items-center gap-3">
                  <BarChart3 className="w-6 h-6 text-teal-600" /> نمو المنصة الموحد
                </h3>
              </div>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={performanceData}>
                    <defs>
                      <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#309ca8" stopOpacity={0.1}/>
                        <stop offset="95%" stopColor="#309ca8" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#9ca3af', fontWeight: 'bold'}} />
                    <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#9ca3af', fontWeight: 'bold'}} />
                    <Tooltip contentStyle={{borderRadius: '24px', border: 'none', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)', padding: '16px'}} />
                    <Area type="monotone" dataKey="revenue" stroke="#309ca8" strokeWidth={4} fillOpacity={1} fill="url(#colorRevenue)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-[#1a1c1e] p-10 rounded-[3rem] text-white flex flex-col justify-between">
              <div>
                 <h3 className="text-xl font-bold mb-6 flex items-center gap-3">
                    <ShieldCheck className="w-6 h-6 text-teal-400" /> المتاجر قيد الانتظار
                 </h3>
                 <div className="space-y-6">
                    {MOCK_TENANTS.filter(t => t.status === 'pending').map((tenant, i) => (
                       <div key={i} className="flex items-center gap-4 group">
                          <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center font-bold text-teal-400 group-hover:bg-teal-400 group-hover:text-black transition">
                             {tenant.storeName[0]}
                          </div>
                          <div className="flex-grow">
                             <p className="text-sm font-bold text-white">{tenant.storeName}</p>
                             <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{tenant.registrationDate}</p>
                          </div>
                          <button className="p-2 bg-white/5 hover:bg-white/20 rounded-lg transition"><ChevronRight className="w-4 h-4 rotate-180" /></button>
                       </div>
                    ))}
                    {MOCK_TENANTS.filter(t => t.status === 'pending').length === 0 && (
                       <p className="text-gray-500 text-sm">لا يوجد طلبات انتظار حالياً.</p>
                    )}
                 </div>
              </div>
              <button className="w-full py-4 bg-teal-500 text-black font-bold rounded-2xl shadow-xl hover:bg-teal-400 transition-all flex items-center justify-center gap-2">
                 مشاهدة جميع الطلبات <ChevronRight className="w-4 h-4 rotate-180" />
              </button>
            </div>
          </div>
        </div>
      )}

      {activeSubTab === 'tenants' && (
        <div className="bg-white rounded-[3rem] border border-gray-100 overflow-hidden shadow-sm">
           <div className="p-8 border-b border-gray-50 flex flex-col md:flex-row justify-between items-center gap-4">
              <h3 className="font-bold text-gray-800">إدارة المستأجرين (Tenants)</h3>
              <div className="relative w-full md:w-80">
                 <Search className="absolute right-3 top-3 w-4 h-4 text-gray-400" />
                 <input type="text" placeholder="بحث باسم المنشأة أو الرقم الضريبي..." className="w-full pr-10 pl-4 py-2.5 bg-gray-50 border-none rounded-xl outline-none focus:ring-2 focus:ring-teal-500/10 transition" />
              </div>
           </div>
           <table className="w-full text-right">
              <thead className="bg-gray-50/50 text-[10px] font-bold text-gray-400 uppercase tracking-widest border-b">
                 <tr>
                    <th className="px-10 py-6">المنشأة</th>
                    <th className="px-10 py-6">الرقم الموحد / CR</th>
                    <th className="px-10 py-6">البيانات الضريبية</th>
                    <th className="px-10 py-6">المنتجات</th>
                    <th className="px-10 py-6">الحالة</th>
                    <th className="px-10 py-6">الإجراءات</th>
                 </tr>
              </thead>
              <tbody className="divide-y divide-gray-50 text-sm">
                 {MOCK_TENANTS.map(t => (
                    <tr key={t.id} className="hover:bg-gray-50/50 transition">
                       <td className="px-10 py-6">
                          <div>
                             <p className="font-bold text-gray-800">{t.name}</p>
                             <p className="text-[10px] text-gray-400">{t.email}</p>
                          </div>
                       </td>
                       <td className="px-10 py-6 font-mono text-xs">
                          <p>{t.unifiedNumber}</p>
                          <p className="text-gray-400">{t.crNumber}</p>
                       </td>
                       <td className="px-10 py-6 text-xs text-gray-500 font-bold">{t.vatNumber}</td>
                       <td className="px-10 py-6">{t.productsCount}</td>
                       <td className="px-10 py-6">
                          <span className={`px-3 py-1 rounded-full text-[10px] font-bold ${
                            t.status === 'active' ? 'bg-green-50 text-green-600' :
                            t.status === 'pending' ? 'bg-orange-50 text-orange-600' : 'bg-red-50 text-red-600'
                          }`}>
                             {t.status === 'active' ? 'نشط' : t.status === 'pending' ? 'بانتظار الموافقة' : 'معطل'}
                          </span>
                       </td>
                       <td className="px-10 py-6">
                          <div className="flex gap-2">
                             <button className="p-2.5 bg-white border border-gray-100 rounded-xl hover:bg-blue-50 hover:text-blue-600 transition shadow-sm"><Settings className="w-4 h-4" /></button>
                             <button className="p-2.5 bg-white border border-gray-100 rounded-xl hover:bg-red-50 hover:text-red-600 transition shadow-sm"><Lock className="w-4 h-4" /></button>
                          </div>
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
