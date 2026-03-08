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
      <main className="flex-grow">{children}</main>
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
