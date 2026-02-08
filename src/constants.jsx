export const COLORS = {
  petrolBlue: '#1a394f',
  teal: '#309ca8',
  gold: '#cc943c',
  warmGray: '#8c8070',
  sand: '#efe3d2',
  background: '#fcfaf7',
};

export const CATEGORIES = [
  { id: 'bedroom', name: 'غرف نوم', icon: '🛏️' },
  { id: 'living', name: 'مجالس', icon: '🛋️' },
  { id: 'office', name: 'مكاتب', icon: '🖥️' },
  { id: 'decor', name: 'ديكور', icon: '🖼️' },
];

export const MOCK_TENANTS = [
  { 
    id: 't1', 
    name: 'مفروشات المطلق', 
    storeName: 'Almutlaq Store', 
    email: 'info@almutlaq.com', 
    status: 'active', 
    registrationDate: '2024-01-10', 
    productsCount: 145, 
    visitsCount: 12500, 
    vatNumber: '310123456700003',
    crNumber: '1010123456',
    unifiedNumber: '7001234567'
  },
  { 
    id: 't2', 
    name: 'إيكيا الرياض', 
    storeName: 'IKEA Riyadh', 
    email: 'support@ikea.sa', 
    status: 'active', 
    registrationDate: '2024-02-15', 
    productsCount: 2200, 
    visitsCount: 85000, 
    vatNumber: '310987654300003',
    crNumber: '1010987654',
    unifiedNumber: '7009876543'
  },
];

export const MOCK_THEMES = [
  {
    id: 't1',
    name: 'لوكس فنتشر (LuxVenture)',
    description: 'ثيم فاخر مخصص للماركات العالمية مع دعم كامل للـ 3D والواقع المعزز.',
    previewImage: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=1200',
    category: 'Luxury',
    price: 1850,
    isPremium: true,
    features: { ar: true, threeD: true, responsive: true },
    styles: { colors: ['#1a1c1e', '#309ca8', '#cc943c'], fonts: ['Tajawal'] },
    usageCount: 45,
    isActive: true
  },
  {
    id: 't2',
    name: 'سكاندي (Scandi Minimal)',
    description: 'بسيط، مستوحى من الطراز الاسكندنافي، يركز على المساحات البيضاء والوضوح.',
    previewImage: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&q=80&w=1200',
    category: 'Light',
    price: 1100,
    isPremium: false,
    features: { ar: false, threeD: true, responsive: true },
    styles: { colors: ['#fcfaf7', '#8c8070', '#efe3d2'], fonts: ['Tajawal'] },
    usageCount: 128,
    isActive: true
  }
];

export const MOCK_PRODUCTS = [
  {
    id: '1',
    name: 'كنبة مودرن بيج',
    category: 'living',
    price: 2400,
    description: 'تصميم إيطالي عصري بأقمشة فاخرة متوافقة مع جميع أنواع المجالس.',
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=800',
    arEnabled: true,
    is360Enabled: true,
    sku: 'SOF-2024-001',
    stock: 12,
    dimensions: { l: 220, w: 95, h: 85 }
  },
  {
    id: '2',
    name: 'سرير كينج مخملي',
    category: 'bedroom',
    price: 4500,
    description: 'سرير واسع مع خلفية مبطنة فاخرة تمنحك الراحة القصوى.',
    image: 'https://images.unsplash.com/photo-1505693314120-0d443867891c?auto=format&fit=crop&q=80&w=800',
    arEnabled: true,
    is360Enabled: true,
    sku: 'BED-KNG-774',
    stock: 5,
    dimensions: { l: 200, w: 200, h: 120 }
  }
];

// Added MOCK_MODELS to resolve the import error in ModelManagement.tsx
export const MOCK_MODELS = [
  { id: 'm1', name: 'Modern Sofa Model', format: 'GLB', size: '4.2 MB' },
  { id: 'm2', name: 'King Bed Frame High Poly', format: 'GLB', size: '12.5 MB' },
  { id: 'm3', name: 'Minimalist Chair', format: 'USDZ', size: '2.8 MB' },
  { id: 'm4', name: 'Luxury Table Set', format: 'GLB', size: '6.1 MB' },
  { id: 'm5', name: 'Ottoman Pouf', format: 'USDZ', size: '1.4 MB' },
];
