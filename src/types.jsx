/**
 * @typedef {'PUBLIC' | 'THEMES_GALLERY' | 'ONBOARDING' | 'SUPER_ADMIN' | 'ORG_ADMIN' | 'THEME_CUSTOMIZER' | 'AUTH' | 'PRODUCT_DETAIL' | 'STORE_SETTINGS' | 'MODEL_MANAGEMENT'} AppViewType
 */

/**
 * Enum for application views
 * @readonly
 * @enum {string}
 */
export const AppView = Object.freeze({
  PUBLIC: 'PUBLIC',
  THEMES_GALLERY: 'THEMES_GALLERY',
  ONBOARDING: 'ONBOARDING',
  SUPER_ADMIN: 'SUPER_ADMIN',
  ORG_ADMIN: 'ORG_ADMIN',
  THEME_CUSTOMIZER: 'THEME_CUSTOMIZER',
  AUTH: 'AUTH',
  PRODUCT_DETAIL: 'PRODUCT_DETAIL',
  STORE_SETTINGS: 'STORE_SETTINGS',
  MODEL_MANAGEMENT: 'MODEL_MANAGEMENT',
  CONFIGUTATOR: 'CONFIGUTATOR'
});

/**
 * @typedef {'SUPER_ADMIN' | 'ORG_ADMIN' | 'THEME_ADMIN' | 'CUSTOMER'} UserRoleType
 */

/**
 * Enum for user roles
 * @readonly
 * @enum {string}
 */
export const UserRole = Object.freeze({
  SUPER_ADMIN: 'SUPER_ADMIN',
  ORG_ADMIN: 'ORG_ADMIN',
  THEME_ADMIN: 'THEME_ADMIN',
  CUSTOMER: 'CUSTOMER'
});

/**
 * @typedef {Object} User
 * @property {string} id
 * @property {string} email
 * @property {string} name
 * @property {UserRoleType} role
 * @property {string} [orgId]
 * @property {boolean} [isVerified]
 */

/**
 * @typedef {Object} ProductDimensions
 * @property {number} l
 * @property {number} w
 * @property {number} h
 */

/**
 * @typedef {Object} Product
 * @property {string} id
 * @property {string} name
 * @property {string} category
 * @property {number} price
 * @property {string} description
 * @property {string} image
 * @property {string} [threeDModel]
 * @property {boolean} arEnabled
 * @property {boolean} is360Enabled
 * @property {string} [sku]
 * @property {number} [stock]
 * @property {ProductDimensions} [dimensions]
 */

/**
 * Added ThreeDModel interface for the Model Management functionality
 * @typedef {Object} ThreeDModel
 * @property {string} id
 * @property {string} name
 * @property {string} format
 * @property {string} size
 */

/**
 * @typedef {Object} StoreThemeFeatures
 * @property {boolean} ar
 * @property {boolean} threeD
 * @property {boolean} responsive
 */

/**
 * @typedef {Object} StoreThemeStyles
 * @property {string[]} colors
 * @property {string[]} fonts
 */

/**
 * @typedef {Object} StoreTheme
 * @property {string} id
 * @property {string} name
 * @property {string} description
 * @property {string} previewImage
 * @property {'Modern' | 'Classic' | 'Minimal' | 'Luxury' | 'Dark' | 'Light'} category
 * @property {number} price
 * @property {boolean} isPremium
 * @property {StoreThemeFeatures} features
 * @property {StoreThemeStyles} styles
 * @property {number} [usageCount]
 * @property {boolean} [isActive]
 */

/**
 * @typedef {Object} Tenant
 * @property {string} id
 * @property {string} name
 * @property {string} email
 * @property {'pending' | 'active' | 'suspended'} status
 * @property {string} registrationDate
 * @property {string} storeName
 * @property {string} vatNumber
 * @property {string} crNumber
 * @property {string} unifiedNumber
 * @property {number} productsCount
 * @property {number} visitsCount
 */

/**
 * @typedef {Object} Order
 * @property {string} id
 * @property {string} customerName
 * @property {number} total
 * @property {'pending' | 'processing' | 'shipped' | 'delivered'} status
 * @property {string} date
 */
