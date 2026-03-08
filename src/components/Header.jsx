import React from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, Search, ShoppingBag, User as UserIcon, LogOut, Settings, LayoutDashboard, Database, Palette, Users, ChevronDown, Facebook, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react';
import { COLORS } from '../constants';
/**
 * @typedef {Object} LayoutProps
 * @property {React.ReactNode} children - The content to render inside the layout
 * @property {string} activeView - The currently active view
 * @property {Function} onNavigate - Navigation handler function
 * @property {Object} [user] - The current user object (optional)
 * @property {Function} [onLogout] - Logout handler function (optional)
 */

export default function Header({ user }) {
  return (
    <header className="bg-white/80 backdrop-blur-md border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3 md:py-4 flex items-center justify-between gap-2 md:gap-4">
          <div className="flex items-center gap-3 md:gap-8 min-w-0">
            <div className="flex items-center gap-2 cursor-pointer w-[110px] sm:w-[150px] shrink-0">
              <a href="/">
                <img src="assets/360 logo.png" alt="" />
              </a>
            </div>
            <nav className="hidden xl:flex gap-6 text-sm font-bold text-gray-600">
              <a href="/" className="cursor-pointer hover:text-teal-600 transition">الرئيسية</a>
              <a href="/themes" className="cursor-pointer hover:text-teal-600 transition">الثيمات</a>
              <a href="/configurator" className="cursor-pointer hover:text-teal-600 transition">مكون</a>
              <a href="/products" className="hover:text-teal-600 transition">المنتجات</a>
              <a href="/about" className="hover:text-teal-600 transition">عن المنصة</a>
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
                        // onClick={() => {
                        //   if (user.role === UserRole.SUPER_ADMIN) onNavigate(AppView.SUPER_ADMIN);
                        //   else if (user.role === UserRole.ORG_ADMIN) onNavigate(AppView.ORG_ADMIN);
                        //   else onNavigate(AppView.THEME_CUSTOMIZER);
                        //   setShowUserMenu(false);
                        // }}
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
                    //   onClick={() => { onLogout?.(); setShowUserMenu(false); }}
                      className="w-full flex items-center gap-3 p-3 text-xs font-bold text-red-500 hover:bg-red-50 rounded-xl transition"
                    >
                      <LogOut className="w-4 h-4" /> تسجيل الخروج
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="hidden sm:flex items-center gap-1.5 sm:gap-2">
                <a href="/login" className="px-3 sm:px-4 md:px-6 py-2 rounded-full text-xs font-bold text-gray-700 hover:bg-gray-100 transition whitespace-nowrap">
                  دخول
                </a>
                <a href="/register" className="px-3 sm:px-4 md:px-6 py-2.5 rounded-full text-xs font-bold transition shadow-lg shadow-gold-900/10 hover:scale-105 active:scale-95 whitespace-nowrap" style={{ backgroundColor: COLORS.gold, color: 'white' }}>
                  سجل جهتك
                </a>
              </div>
            )}

            <button
            //   onClick={() => setShowMobileMenu((prev) => !prev)}
              className="xl:hidden p-2 rounded-xl hover:bg-gray-100 transition"
              aria-label="Toggle menu"
            >
              <Menu className="w-5 h-5 text-gray-700" />
            </button>
          </div>
        </div>

        {/* {showMobileMenu && (
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
                  <button className="flex-1 px-4 py-2.5 rounded-xl text-xs font-bold text-gray-700 bg-gray-100 hover:bg-gray-200 transition">
                    دخول
                  </button>
                  <button className="flex-1 px-4 py-2.5 rounded-xl text-xs font-bold text-white transition" style={{ backgroundColor: COLORS.gold }}>
                    سجل جهتك
                  </button>
                </div>
              )}
            </div>
          </div>
        )} */}
      </header>
  );
}
