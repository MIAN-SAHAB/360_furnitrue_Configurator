
import React, { useState } from 'react';
import { Mail, Lock, User as UserIcon, ArrowRight, Github, Chrome, AlertCircle, Briefcase, CheckCircle2, RefreshCcw, Loader2 } from 'lucide-react';
import { COLORS } from '../constants';
import { UserRole } from '../types';

export const Auth = ({ onLogin, onNavigate }) => {
  const [mode, setMode] = useState<'login' | 'register' | 'reset' | 'verification_sent'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState<UserRole>(UserRole.CUSTOMER);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isResending, setIsResending] = useState(false);

  const handleAuth = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Simulate network delay for a "World Class" feel
    await new Promise(resolve => setTimeout(resolve, 1200));

    if (mode === 'register') {
      setIsLoading(false);
      setMode('verification_sent');
      return;
    }

    if (mode === 'reset') {
      setIsLoading(false);
      alert('تم إرسال رابط استعادة كلمة المرور إلى بريدك الإلكتروني');
      setMode('login');
      return;
    }

    // Role Simulation Logic based on Email Keywords (Domain-like check)
    const lowerEmail = email.toLowerCase();
    let simulatedUser;

    if (lowerEmail.includes('super')) {
      simulatedUser = { id: 'sa-1', name: 'المدير العام', email, role: UserRole.SUPER_ADMIN, isVerified: true };
    } else if (lowerEmail.includes('org')) {
      simulatedUser = { id: 'oa-1', name: 'مدير المنظمة', email, role: UserRole.ORG_ADMIN, orgId: 'tenant-001', isVerified: true };
    } else if (lowerEmail.includes('theme')) {
      simulatedUser = { id: 'ta-1', name: 'مسؤول الهوية', email, role: UserRole.THEME_ADMIN, orgId: 'tenant-001', isVerified: true };
    } else {
      simulatedUser = { id: 'c-1', name: name || 'عميل مميز', email, role: UserRole.CUSTOMER, isVerified: true };
    }

    setIsLoading(false);
    onLogin(simulatedUser);
  };

  const handleMockVerify = async () => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 800));
    
    onLogin({ 
      id: Math.random().toString(36).substr(2, 9), 
      name: name || 'مستخدم جديد', 
      email, 
      role: role,
      isVerified: true
    });
  };

  const handleResend = () => {
    setIsResending(true);
    setTimeout(() => {
      setIsResending(false);
      alert('تم إعادة إرسال رابط التحقق');
    }, 1500);
  };

  const roleLabels = {
    [UserRole.SUPER_ADMIN]: 'مدير النظام (Super Admin)',
    [UserRole.ORG_ADMIN]: 'مدير منظمة (Organization Admin)',
    [UserRole.THEME_ADMIN]: 'مسؤول الهوية (Theme Admin)',
    [UserRole.CUSTOMER]: 'عميل (Customer)'
  };

  if (mode === 'verification_sent') {
    return (
      <div className="min-h-[80vh] flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-[2.5rem] shadow-2xl border border-gray-100 overflow-hidden animate-in zoom-in duration-300">
          <div className="p-8 md:p-12 text-center">
            <div className="w-20 h-20 bg-teal-50 rounded-full flex items-center justify-center mx-auto mb-8">
              <Mail className="w-10 h-10 text-teal-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">تحقق من بريدك الإلكتروني</h2>
            <p className="text-gray-500 text-sm mb-8 leading-relaxed">
              لقد أرسلنا رابط تحقق فريد إلى <span className="font-bold text-gray-800">{email}</span>. يرجى النقر على الرابط لتفعيل حسابك والبدء في استخدام المنصة.
            </p>
            
            <div className="space-y-4">
              <button 
                onClick={handleMockVerify}
                disabled={isLoading}
                className="w-full py-4 bg-teal-600 text-white rounded-xl font-bold shadow-xl hover:bg-teal-700 transition flex items-center justify-center gap-2 group disabled:opacity-70"
              >
                {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <CheckCircle2 className="w-5 h-5 group-hover:scale-110 transition" />}
                {isLoading ? 'جاري التحقق...' : 'محاكاة: تفعيل الحساب الآن'}
              </button>
              
              <button 
                onClick={handleResend}
                disabled={isResending}
                className="w-full py-4 bg-gray-50 text-gray-700 rounded-xl font-bold hover:bg-gray-100 transition flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <RefreshCcw className={`w-5 h-5 ${isResending ? 'animate-spin' : ''}`} />
                {isResending ? 'جاري الإرسال...' : 'إعادة إرسال الرابط'}
              </button>
            </div>

            <button 
              onClick={() => setMode('login')} 
              className="mt-8 text-sm text-teal-600 font-bold hover:underline"
            >
              العودة لتسجيل الدخول
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-[2.5rem] shadow-2xl border border-gray-100 overflow-hidden transition-all duration-500 hover:shadow-teal-900/5">
        <div className="p-8 md:p-12">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              {mode === 'login' && 'مرحباً بك مجدداً'}
              {mode === 'register' && 'إنشاء حساب جديد'}
              {mode === 'reset' && 'استعادة كلمة المرور'}
            </h2>
            <p className="text-gray-500 text-sm">
              {mode === 'login' && 'سجل دخولك للوصول إلى لوحة التحكم'}
              {mode === 'register' && 'اختر نوع الحساب المناسب لك وابدأ فوراً'}
              {mode === 'reset' && 'أدخل بريدك الإلكتروني لتلقي رابط الاستعادة'}
            </p>
          </div>

          <form onSubmit={handleAuth} className="space-y-5">
            {mode === 'register' && (
              <>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-400 uppercase mr-1">الاسم الكامل</label>
                  <div className="relative group">
                    <UserIcon className="absolute left-3 top-3 w-5 h-5 text-gray-400 group-focus-within:text-teal-600 transition" />
                    <input 
                      type="text" 
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full p-3 bg-gray-50 border border-gray-100 rounded-xl pl-10 focus:ring-2 focus:ring-teal-500 outline-none transition" 
                      placeholder="عبدالله محمد" 
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-400 uppercase mr-1">نوع الحساب (الصلاحيات)</label>
                  <div className="relative group">
                    <Briefcase className="absolute left-3 top-3 w-5 h-5 text-gray-400 group-focus-within:text-teal-600 transition" />
                    <select 
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      className="w-full p-3 bg-gray-50 border border-gray-100 rounded-xl pl-10 appearance-none focus:ring-2 focus:ring-teal-500 outline-none transition text-sm text-gray-700"
                    >
                      <option value={UserRole.CUSTOMER}>{roleLabels[UserRole.CUSTOMER]}</option>
                      <option value={UserRole.THEME_ADMIN}>{roleLabels[UserRole.THEME_ADMIN]}</option>
                      <option value={UserRole.ORG_ADMIN}>{roleLabels[UserRole.ORG_ADMIN]}</option>
                      <option value={UserRole.SUPER_ADMIN}>{roleLabels[UserRole.SUPER_ADMIN]}</option>
                    </select>
                  </div>
                </div>
              </>
            )}

            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase mr-1">البريد الإلكتروني</label>
              <div className="relative group">
                <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400 group-focus-within:text-teal-600 transition" />
                <input 
                  type="email" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-3 bg-gray-50 border border-gray-100 rounded-xl pl-10 focus:ring-2 focus:ring-teal-500 outline-none transition" 
                  placeholder="name@company.com" 
                />
              </div>
            </div>

            {mode !== 'reset' && (
              <div className="space-y-2">
                <div className="flex justify-between items-center px-1">
                  <label className="text-xs font-bold text-gray-400 uppercase">كلمة المرور</label>
                  {mode === 'login' && (
                    <button type="button" onClick={() => setMode('reset')} className="text-[10px] text-teal-600 font-bold hover:underline">نسيت كلمة المرور؟</button>
                  )}
                </div>
                <div className="relative group">
                  <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400 group-focus-within:text-teal-600 transition" />
                  <input 
                    type="password" 
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-3 bg-gray-50 border border-gray-100 rounded-xl pl-10 focus:ring-2 focus:ring-teal-500 outline-none transition" 
                    placeholder="••••••••" 
                  />
                </div>
              </div>
            )}

            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full py-4 bg-gray-900 text-white rounded-xl font-bold shadow-xl hover:bg-black transition flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed group"
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  {mode === 'login' && 'تسجيل الدخول'}
                  {mode === 'register' && 'إنشاء الحساب'}
                  {mode === 'reset' && 'إرسال رابط الاستعادة'}
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          {mode === 'login' && (
            <div className="mt-8">
              <div className="relative flex items-center justify-center mb-6">
                <div className="flex-grow border-t border-gray-100"></div>
                <span className="flex-shrink mx-4 text-xs text-gray-400 font-medium">أو عبر</span>
                <div className="flex-grow border-t border-gray-100"></div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <button className="flex items-center justify-center gap-2 p-3 border border-gray-100 rounded-xl hover:bg-gray-50 transition text-sm font-medium">
                  <Chrome className="w-4 h-4 text-red-500" /> Google
                </button>
                <button className="flex items-center justify-center gap-2 p-3 border border-gray-100 rounded-xl hover:bg-gray-50 transition text-sm font-medium">
                  <Github className="w-4 h-4 text-gray-900" /> Github
                </button>
              </div>
            </div>
          )}

          <div className="mt-8 text-center text-sm">
            {mode === 'login' ? (
              <p className="text-gray-500">ليس لديك حساب؟ <button onClick={() => setMode('register')} className="text-teal-600 font-bold hover:underline">إنشاء حساب</button></p>
            ) : (
              <p className="text-gray-500">لديك حساب بالفعل؟ <button onClick={() => setMode('login')} className="text-teal-600 font-bold hover:underline">تسجيل الدخول</button></p>
            )}
          </div>

          <div className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-100 flex gap-3">
             <AlertCircle className="w-5 h-5 text-blue-500 shrink-0" />
             <div className="text-[10px] text-blue-700 leading-relaxed">
               <strong>دليل المحاكاة:</strong> لتسجيل الدخول بأدوار مختلفة:
               <ul className="list-disc list-inside mt-1">
                 <li>Super Admin: بريد يحتوي على <b>super</b></li>
                 <li>Org Admin: بريد يحتوي على <b>org</b></li>
                 <li>Theme Admin: بريد يحتوي على <b>theme</b></li>
               </ul>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};
