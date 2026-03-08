import React, { useState, useEffect } from 'react';
import { AppView, UserRole } from '../types';
import { PublicLayout, AdminLayout } from './Layout';
import { Home } from '../views/Home';
import { ThemesGallery } from '../views/ThemesGallery';
import { Onboarding } from '../views/Onboarding';
import { OrgAdmin } from '../views/OrgAdmin';
import { SuperAdmin } from '../views/SuperAdmin';
import { ThemeCustomizer } from '../views/ThemeCustomizer';
import { Auth } from '../views/Auth';
import { ProductView } from '../views/ProductView';
import { StoreSettings } from '../views/StoreSettings';
import { ModelManagement } from '../views/ModelManagement';
import { LayoutDashboard, Package, Users, Palette, ShieldCheck, Database, CreditCard, Activity, Globe, MessageSquare, LogOut, Layout as LayoutIcon, Layers, Box as CubeIcon, Settings } from 'lucide-react';
import { MOCK_PRODUCTS } from '../constants';
import Configurator from './Configurator';

const Homepage = ({ onNavigateToView }) => {
  const [view, setView] = useState(AppView.PUBLIC);
  const [currentUser, setCurrentUser] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(MOCK_PRODUCTS[0]);

  useEffect(() => {
    if (currentUser) {
      if (currentUser.role === UserRole.SUPER_ADMIN) setView(AppView.SUPER_ADMIN);
      else if (currentUser.role === UserRole.ORG_ADMIN) setView(AppView.ORG_ADMIN);
      else if (currentUser.role === UserRole.THEME_ADMIN) setView(AppView.THEME_CUSTOMIZER);
      else setView(AppView.PUBLIC);
    }
  }, [currentUser]);

  const navigate = (newView) => {
    window.scrollTo(0, 0);

    if (onNavigateToView) {
      onNavigateToView(newView);
      return;
    }

    setView(newView);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setView(AppView.PUBLIC);
  };

  const renderContent = () => {
    switch (view) {
      case AppView.PUBLIC:
        return (
          <PublicLayout activeView={view} onNavigate={navigate} user={currentUser} onLogout={handleLogout}>
            <Home onNavigate={navigate} />
          </PublicLayout>
        );
      case AppView.THEMES_GALLERY:
        return (
          <PublicLayout activeView={view} onNavigate={navigate} user={currentUser} onLogout={handleLogout}>
            <ThemesGallery onNavigate={navigate} />
          </PublicLayout>
        );
      case AppView.PRODUCT_DETAIL:
        return (
          <PublicLayout activeView={view} onNavigate={navigate} user={currentUser} onLogout={handleLogout}>
            {selectedProduct && <ProductView product={selectedProduct} onNavigate={navigate} />}
          </PublicLayout>
        );
      case AppView.AUTH:
        return (
          <PublicLayout activeView={view} onNavigate={navigate} user={currentUser} onLogout={handleLogout}>
            <Auth onLogin={setCurrentUser} onNavigate={navigate} />
          </PublicLayout>
        );
      case AppView.ONBOARDING:
        return (
          <PublicLayout activeView={view} onNavigate={navigate} user={currentUser} onLogout={handleLogout}>
            <Onboarding onComplete={() => navigate(AppView.PUBLIC)} />
          </PublicLayout>
        );
      case AppView.ORG_ADMIN:
      case AppView.STORE_SETTINGS:
      case AppView.MODEL_MANAGEMENT:
        if (!currentUser || currentUser.role !== UserRole.ORG_ADMIN) {
           navigate(AppView.AUTH);
           console.log(currentUser)
           return null;
        }
        return (
          <AdminLayout 
            activeView={view} 
            onNavigate={navigate} 
            user={currentUser}
            onLogout={handleLogout}
            title={view === AppView.ORG_ADMIN ? "إدارة المتجر" : view === AppView.STORE_SETTINGS ? "إعدادات المتجر" : "إدارة النماذج 3D"} 
            sidebar={
              <>
                <button onClick={() => navigate(AppView.ORG_ADMIN)} className={`w-full flex items-center gap-3 p-3 rounded-xl transition font-bold text-sm ${view === AppView.ORG_ADMIN ? 'bg-teal-50 text-teal-700' : 'text-gray-600 hover:bg-gray-50'}`}>
                  <LayoutDashboard className="w-5 h-5" /> نظرة عامة
                </button>
                <button onClick={() => navigate(AppView.MODEL_MANAGEMENT)} className={`w-full flex items-center gap-3 p-3 rounded-xl transition font-bold text-sm ${view === AppView.MODEL_MANAGEMENT ? 'bg-teal-50 text-teal-700' : 'text-gray-600 hover:bg-gray-50'}`}>
                  <CubeIcon className="w-5 h-5" /> النماذج 3D
                </button>
                <button onClick={() => navigate(AppView.THEME_CUSTOMIZER)} className="w-full flex items-center gap-3 p-3 text-gray-600 hover:bg-gray-50 rounded-xl transition text-sm">
                  <Palette className="w-5 h-5" /> تخصيص الثيم
                </button>
                <button onClick={() => navigate(AppView.STORE_SETTINGS)} className={`w-full flex items-center gap-3 p-3 rounded-xl transition font-bold text-sm ${view === AppView.STORE_SETTINGS ? 'bg-teal-50 text-teal-700' : 'text-gray-600 hover:bg-gray-50'}`}>
                  <Settings className="w-5 h-5" /> الإعدادات
                </button>
              </>
            }
          >
            {view === AppView.ORG_ADMIN && <OrgAdmin onNavigate={navigate} />}
            {view === AppView.STORE_SETTINGS && <StoreSettings />}
            {view === AppView.MODEL_MANAGEMENT && <ModelManagement />}
          </AdminLayout>
        );
      case AppView.SUPER_ADMIN:
        if (!currentUser || currentUser.role !== UserRole.SUPER_ADMIN) {
           navigate(AppView.AUTH);
           return null;
        }
        return (
          <AdminLayout 
            activeView={view} 
            onNavigate={navigate} 
            user={currentUser}
            onLogout={handleLogout}
            title="الإدارة العليا للمنصة" 
            sidebar={
              <>
                <button onClick={() => navigate(AppView.SUPER_ADMIN)} className={`w-full flex items-center gap-3 p-3 rounded-xl transition font-bold text-sm ${view === AppView.SUPER_ADMIN ? 'bg-gray-900 text-white shadow-lg' : 'text-gray-600 hover:bg-gray-50'}`}>
                  <Activity className="w-5 h-5" /> داشبورد الإدارة
                </button>
                <button className="w-full flex items-center gap-3 p-3 text-gray-600 hover:bg-gray-50 rounded-xl transition text-sm">
                  <Globe className="w-5 h-5" /> إدارة المتاجر
                </button>
                <button onClick={() => navigate(AppView.THEMES_GALLERY)} className="w-full flex items-center gap-3 p-3 text-gray-600 hover:bg-gray-50 rounded-xl transition text-sm">
                   <Palette className="w-5 h-5" /> مكتبة الثيمات
                </button>
                <button className="w-full flex items-center gap-3 p-3 text-gray-600 hover:bg-gray-50 rounded-xl transition text-sm">
                   <Layers className="w-5 h-5" /> القوالب الجاهزة
                </button>
              </>
            }
          >
            <SuperAdmin />
          </AdminLayout>
        );
        case AppView.CONFIGUTATOR:
        return (
            <PublicLayout activeView={view} onNavigate={navigate} user={currentUser} onLogout={handleLogout}>
                <Configurator />
            </PublicLayout>
        );
      default:
        return <Home onNavigate={navigate} />;
    }
  };

  return <div className="antialiased select-none">{renderContent()}</div>;
};

export default Homepage;