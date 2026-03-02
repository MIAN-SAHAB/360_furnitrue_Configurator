import React, { useState } from 'react';
import { Menu, Search, ShoppingBag, User as UserIcon, LogOut, Settings, LayoutDashboard, Database, Palette, Users, ChevronDown, Facebook, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react';
import { COLORS } from '../constants';
import { AppView, UserRole } from '../types';

/**
 * @typedef {Object} LayoutProps
 * @property {React.ReactNode} children - The content to render inside the layout
 * @property {string} activeView - The currently active view
 * @property {Function} onNavigate - Navigation handler function
 * @property {Object} [user] - The current user object (optional)
 * @property {Function} [onLogout] - Logout handler function (optional)
 */

export const PublicLayout = ({ children, activeView, onNavigate, user, onLogout }) => {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const handleNavigate = (view) => {
    onNavigate(view);
    setShowMobileMenu(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#fcfaf7]">
      <header className="bg-white/80 backdrop-blur-md border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3 md:py-4 flex items-center justify-between gap-2 md:gap-4">
          <div className="flex items-center gap-3 md:gap-8 min-w-0">
            <div className="flex items-center gap-2 cursor-pointer w-[110px] sm:w-[150px] shrink-0" onClick={() => handleNavigate(AppView.PUBLIC)}>
              <img src="assets/360 logo.png" alt="" />
            </div>
            <nav className="hidden xl:flex gap-6 text-sm font-bold text-gray-600">
              <button onClick={() => handleNavigate(AppView.PUBLIC)} className="cursor-pointer hover:text-teal-600 transition">الرئيسية</button>
              <button onClick={() => handleNavigate(AppView.THEMES_GALLERY)} className="cursor-pointer hover:text-teal-600 transition">الثيمات</button>
              <button onClick={() => handleNavigate(AppView.CONFIGUTATOR)} className="cursor-pointer hover:text-teal-600 transition">مكون</button>
              <a href="#" className="hover:text-teal-600 transition">المنتجات</a>
              <a href="#" className="hover:text-teal-600 transition">عن المنصة</a>
            </nav>
          </div>
          <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
            <div className="relative hidden xl:block">
              <input type="text" placeholder="بحث عن منتج أو متجر..." className="bg-gray-100 border-none rounded-full px-4 py-2 pr-10 text-xs focus:ring-2 focus:ring-teal-500 w-64 transition-all" />
              <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
            </div>
            
            <button className="hidden sm:block p-2 hover:bg-gray-100 rounded-full relative transition">
              <ShoppingBag className="w-5 h-5 text-gray-700" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
            </button>

            {user ? (
              <div className="relative">
                <button 
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center gap-2 pl-2 pr-4 py-1.5 bg-gray-50 rounded-full border border-gray-100 hover:bg-gray-100 transition shadow-sm"
                >
                  <div className="w-8 h-8 bg-teal-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                    {user.name[0]}
                  </div>
                  <span className="text-xs font-bold text-gray-700 hidden md:block">{user.name}</span>
                  <ChevronDown className="w-3 h-3 text-gray-400" />
                </button>
                
                {showUserMenu && (
                  <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-gray-100 p-2 z-[60] animate-in fade-in zoom-in duration-200">
                    <div className="px-4 py-3 border-b border-gray-50 mb-1">
                      <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">صلاحية</p>
                      <p className="text-xs font-bold text-teal-600">{user.role.replace('_', ' ')}</p>
                    </div>
                    {user.role !== UserRole.CUSTOMER && (
                      <button 
                        onClick={() => {
                          if (user.role === UserRole.SUPER_ADMIN) onNavigate(AppView.SUPER_ADMIN);
                          else if (user.role === UserRole.ORG_ADMIN) onNavigate(AppView.ORG_ADMIN);
                          else onNavigate(AppView.THEME_CUSTOMIZER);
                          setShowUserMenu(false);
                        }}
                        className="w-full flex items-center gap-3 p-3 text-xs font-bold text-gray-700 hover:bg-gray-50 rounded-xl transition"
                      >
                        <LayoutDashboard className="w-4 h-4" /> لوحة التحكم
                      </button>
                    )}
                    <button className="w-full flex items-center gap-3 p-3 text-xs font-bold text-gray-700 hover:bg-gray-50 rounded-xl transition">
                      <Settings className="w-4 h-4" /> الإعدادات
                    </button>
                    <div className="my-1 border-t border-gray-50"></div>
                    <button 
                      onClick={() => { onLogout?.(); setShowUserMenu(false); }}
                      className="w-full flex items-center gap-3 p-3 text-xs font-bold text-red-500 hover:bg-red-50 rounded-xl transition"
                    >
                      <LogOut className="w-4 h-4" /> تسجيل الخروج
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="hidden sm:flex items-center gap-1.5 sm:gap-2">
                <button onClick={() => handleNavigate(AppView.AUTH)} className="px-3 sm:px-4 md:px-6 py-2 rounded-full text-xs font-bold text-gray-700 hover:bg-gray-100 transition whitespace-nowrap">
                  دخول
                </button>
                <button onClick={() => handleNavigate(AppView.ONBOARDING)} className="px-3 sm:px-4 md:px-6 py-2.5 rounded-full text-xs font-bold transition shadow-lg shadow-gold-900/10 hover:scale-105 active:scale-95 whitespace-nowrap" style={{ backgroundColor: COLORS.gold, color: 'white' }}>
                  سجل جهتك
                </button>
              </div>
            )}

            <button
              onClick={() => setShowMobileMenu((prev) => !prev)}
              className="xl:hidden p-2 rounded-xl hover:bg-gray-100 transition"
              aria-label="Toggle menu"
            >
              <Menu className="w-5 h-5 text-gray-700" />
            </button>
          </div>
        </div>

        {showMobileMenu && (
          <div className="xl:hidden border-t border-gray-100 bg-white/95 backdrop-blur-md">
            <div className="container mx-auto px-4 py-4 space-y-4">
              <div className="relative">
                <input type="text" placeholder="بحث عن منتج أو متجر..." className="w-full bg-gray-100 border-none rounded-full px-4 py-2.5 pr-10 text-xs focus:ring-2 focus:ring-teal-500" />
                <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
              </div>

              <nav className="flex flex-col gap-2 text-sm font-bold text-gray-700">
                <button onClick={() => handleNavigate(AppView.PUBLIC)} className="text-right p-3 rounded-xl hover:bg-gray-50 transition">الرئيسية</button>
                <button onClick={() => handleNavigate(AppView.THEMES_GALLERY)} className="text-right p-3 rounded-xl hover:bg-gray-50 transition">الثيمات</button>
                <button onClick={() => handleNavigate(AppView.CONFIGUTATOR)} className="text-right p-3 rounded-xl hover:bg-gray-50 transition">مكون</button>
                <a href="#" className="text-right p-3 rounded-xl hover:bg-gray-50 transition">المنتجات</a>
                <a href="#" className="text-right p-3 rounded-xl hover:bg-gray-50 transition">عن المنصة</a>
              </nav>

              {!user && (
                <div className="flex gap-2">
                  <button onClick={() => handleNavigate(AppView.AUTH)} className="flex-1 px-4 py-2.5 rounded-xl text-xs font-bold text-gray-700 bg-gray-100 hover:bg-gray-200 transition">
                    دخول
                  </button>
                  <button onClick={() => handleNavigate(AppView.ONBOARDING)} className="flex-1 px-4 py-2.5 rounded-xl text-xs font-bold text-white transition" style={{ backgroundColor: COLORS.gold }}>
                    سجل جهتك
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </header>

      <main className="flex-grow">{children}</main>

      <footer className="bg-white border-t pt-20 pb-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            <div className="space-y-6">
              <div className="flex items-center gap-2">
                 <span className="text-2xl font-bold tracking-tighter" style={{ color: COLORS.petrolBlue }}>360</span>
                 <div className="w-6 h-6 bg-current" style={{ color: COLORS.petrolBlue, clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%, 0 0, 40% 40%, 40% 60%, 60% 60%, 60% 40%, 40% 40%)' }}></div>
                 <span className="text-xl font-bold text-gray-800">Furniture</span>
              </div>
              <p className="text-sm text-gray-500 leading-relaxed">
                المنصة الرائدة للأثاث الفاخر في الشرق الأوسط. نجمع بين عراقة التصميم وأحدث تقنيات الواقع المعزز (AR) لنقدم لك تجربة تسوق لا مثيل لها.
              </p>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center text-gray-400 hover:bg-teal-50 hover:text-teal-600 transition"><Facebook className="w-5 h-5" /></a>
                <a href="#" className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center text-gray-400 hover:bg-teal-50 hover:text-teal-600 transition"><Instagram className="w-5 h-5" /></a>
                <a href="#" className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center text-gray-400 hover:bg-teal-50 hover:text-teal-600 transition"><Twitter className="w-5 h-5" /></a>
              </div>
            </div>

            <div>
              <h4 className="font-bold text-gray-900 mb-6">روابط سريعة</h4>
              <ul className="space-y-4 text-sm text-gray-500">
                <li><button onClick={() => onNavigate(AppView.PUBLIC)} className="hover:text-teal-600 transition">الرئيسية</button></li>
                <li><button onClick={() => onNavigate(AppView.THEMES_GALLERY)} className="hover:text-teal-600 transition">معرض الثيمات</button></li>
                <li><a href="#" className="hover:text-teal-600 transition">المنتجات الرائجة</a></li>
                <li><a href="#" className="hover:text-teal-600 transition">عن المنصة</a></li>
                <li><a href="#" className="hover:text-teal-600 transition">الأسئلة الشائعة</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-gray-900 mb-6">المعلومات القانونية</h4>
              <ul className="space-y-4 text-sm text-gray-500">
                <li><a href="#" className="hover:text-teal-600 transition">سياسة الخصوصية</a></li>
                <li><a href="#" className="hover:text-teal-600 transition">شروط الخدمة</a></li>
                <li><a href="#" className="hover:text-teal-600 transition">حقوق الملكية الفكرية</a></li>
                <li><a href="#" className="hover:text-teal-600 transition">سياسة الاسترجاع</a></li>
                <li><a href="#" className="hover:text-teal-600 transition">تراخيص الاستخدام</a></li>
              </ul>
            </div>

            <div className="space-y-6">
              <h4 className="font-bold text-gray-900 mb-6">تواصل معنا</h4>
              <ul className="space-y-4 text-sm text-gray-500">
                <li className="flex items-center gap-3"><Mail className="w-4 h-4 text-teal-600" /> support@360furniture.com</li>
                <li className="flex items-center gap-3"><Phone className="w-4 h-4 text-teal-600" /> +966 500 000 000</li>
                <li className="flex items-center gap-3"><MapPin className="w-4 h-4 text-teal-600" /> الرياض، المملكة العربية السعودية</li>
              </ul>
              <div className="pt-4 border-t border-gray-100 flex flex-col gap-2">
                 <button onClick={() => onNavigate(AppView.SUPER_ADMIN)} className="text-[10px] text-gray-400 hover:text-gray-600 text-right uppercase tracking-widest font-bold">بوابة المدير العام (Super)</button>
                 <button onClick={() => onNavigate(AppView.ORG_ADMIN)} className="text-[10px] text-gray-400 hover:text-gray-600 text-right uppercase tracking-widest font-bold">بوابة المنظمات (Partner)</button>
              </div>
            </div>
          </div>
          
          <div className="pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs text-gray-400 font-medium">جميع الحقوق محفوظة © 2024 لشركة 360 Furniture</p>
            <div className="flex items-center gap-4">
               <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" className="h-4 grayscale opacity-50" alt="PayPal" />
               <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" className="h-3 grayscale opacity-50" alt="Visa" />
               <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" className="h-4 grayscale opacity-50" alt="Mastercard" />
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

/**
 * @typedef {Object} AdminLayoutProps
 * @property {React.ReactNode} children - The content to render inside the layout
 * @property {string} title - The page title
 * @property {any} sidebar - The sidebar content/component
 * @property {string} activeView - The currently active view
 * @property {Function} onNavigate - Navigation handler function
 * @property {Object} [user] - The current user object (optional)
 * @property {Function} [onLogout] - Logout handler function (optional)
 */

export const AdminLayout = ({ children, title, sidebar, onNavigate, user, onLogout }) => {
  return (
    <div className="min-h-screen flex bg-[#fcfaf7]">
      <aside className="w-72 bg-white border-l flex flex-col hidden lg:flex shadow-2xl z-40">
        <div className="p-8 flex items-center justify-between border-b">
           <div className="flex items-center gap-2 cursor-pointer" onClick={() => onNavigate(AppView.PUBLIC)}>
               <span className="text-2xl font-bold tracking-tighter" style={{ color: COLORS.petrolBlue }}>360</span>
               <div className="w-5 h-5 bg-current" style={{ color: COLORS.petrolBlue, clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%, 0 0, 40% 40%, 40% 60%, 60% 60%, 60% 40%, 40% 40%)' }}></div>
            </div>
        </div>
        
        <div className="p-6 border-b bg-gray-50/50">
           <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gray-900 rounded-2xl flex items-center justify-center text-white font-bold shadow-lg">
                {user?.name[0]}
              </div>
              <div>
                 <p className="text-sm font-bold text-gray-800">{user?.name}</p>
                 <p className="text-[10px] font-bold text-teal-600 uppercase tracking-widest">{user?.role.replace('_', ' ')}</p>
              </div>
           </div>
        </div>

        <div className="flex-grow p-4 py-8 space-y-2 overflow-y-auto custom-scrollbar">
          {sidebar}
        </div>

        <div className="p-6 border-t mt-auto">
          <button onClick={() => onLogout?.()} className="flex items-center gap-3 w-full p-4 text-red-500 hover:bg-red-50 rounded-2xl transition group font-bold">
            <LogOut className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm">تسجيل الخروج</span>
          </button>
        </div>
      </aside>
      
      <div className="flex-grow flex flex-col h-screen overflow-hidden">
        <header className="bg-white/80 backdrop-blur-md border-b px-4 md:px-8 py-4 md:py-5 flex items-center justify-between z-30 shadow-sm gap-3">
          <h1 className="text-xl font-bold text-gray-800 flex items-center gap-2">
            <span className="w-1.5 h-6 bg-teal-500 rounded-full"></span>
            {title}
          </h1>
          <div className="flex items-center gap-6">
            <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-green-50 border border-green-100 rounded-full">
               <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
               <span className="text-[10px] font-bold text-green-700">النظام يعمل بشكل مثالي</span>
            </div>
            <div className="flex items-center gap-2">
               <button className="p-2 text-gray-400 hover:bg-gray-100 rounded-xl transition"><Search className="w-5 h-5" /></button>
               <button className="p-2 text-gray-400 hover:bg-gray-100 rounded-xl transition"><Settings className="w-5 h-5" /></button>
            </div>
          </div>
        </header>
        <main className="flex-grow overflow-y-auto p-4 md:p-8 custom-scrollbar bg-[#fcfaf7]">
          {children}
        </main>
      </div>
    </div>
  );
};
