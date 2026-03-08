import React from 'react';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import Configurator from './components/Configurator';
import { Home } from './views/Home';
import { ThemesGallery } from './views/ThemesGallery';
import { Onboarding } from './views/Onboarding';
import { Auth } from './views/Auth';
import { OrgAdmin } from './views/OrgAdmin';
import { SuperAdmin } from './views/SuperAdmin';
import { ThemeCustomizer } from './views/ThemeCustomizer';
import { ProductView } from './views/ProductView';
import { StoreSettings } from './views/StoreSettings';
import { ModelManagement } from './views/ModelManagement';
import { AppView, UserRole } from './types';
import { MOCK_PRODUCTS } from './constants';
import Header from './components/Header';
import Footer from './components/Footer';

const PATH_BY_VIEW = {
  [AppView.PUBLIC]: '/home',
  [AppView.THEMES_GALLERY]: '/themes-gallery',
  [AppView.ONBOARDING]: '/onboarding',
  [AppView.SUPER_ADMIN]: '/super-admin',
  [AppView.ORG_ADMIN]: '/org-admin',
  [AppView.THEME_CUSTOMIZER]: '/theme-customizer',
  [AppView.AUTH]: '/auth',
  [AppView.PRODUCT_DETAIL]: '/product-view',
  [AppView.STORE_SETTINGS]: '/store-settings',
  [AppView.MODEL_MANAGEMENT]: '/model-management',
  [AppView.CONFIGUTATOR]: '/configurator',
};

function App() {
  const navigate = useNavigate();

  const handleNavigate = (view) => {
    navigate(PATH_BY_VIEW[view] || '/');
  };

  const handleLogin = (user) => {
    if (!user) {
      navigate('/auth');
      return;
    }

    if (user.role === UserRole.SUPER_ADMIN) {
      navigate('/super-admin');
      return;
    }

    if (user.role === UserRole.ORG_ADMIN) {
      navigate('/org-admin');
      return;
    }

    if (user.role === UserRole.THEME_ADMIN) {
      navigate('/theme-customizer');
      return;
    }

    navigate('/home');
  };

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="/configurator" element={<Configurator />} />
        <Route path="/home" element={<Home onNavigate={handleNavigate} />} />
        <Route path="/themes-gallery" element={<ThemesGallery onNavigate={handleNavigate} />} />
        <Route path="/onboarding" element={<Onboarding onComplete={() => navigate('/home')} />} />
        <Route path="/login" element={<Auth onLogin={handleLogin} onNavigate={handleNavigate} />} />
        <Route path="/org-admin" element={<OrgAdmin onNavigate={handleNavigate} />} />
        <Route path="/super-admin" element={<SuperAdmin />} />
        <Route path="/theme-customizer" element={<ThemeCustomizer />} />
        <Route path="/product-view" element={<ProductView product={MOCK_PRODUCTS[0]} onNavigate={handleNavigate} />} />
        <Route path="/store-settings" element={<StoreSettings />} />
        <Route path="/model-management" element={<ModelManagement />} />
        <Route path="*" element={<Navigate to="/home" replace />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;