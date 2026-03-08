import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, Search, ShoppingBag, User as UserIcon, LogOut, Settings, LayoutDashboard, Database, Palette, Users, ChevronDown, Facebook, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react';
import { COLORS } from '../constants';

export default function Footer() {
  return (
    
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
  );
}
