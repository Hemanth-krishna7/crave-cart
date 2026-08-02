/**
 * Category Normalization Utility
 * Maps Home page category IDs/names to normalized cuisine filter terms used in the discovery pipeline.
 */

const CATEGORY_CUISINE_MAP = {
  pizza: 'Pizza',
  burgers: 'Burgers',
  biryani: 'Biryani',
  'north-indian': 'North Indian',
  'south-indian': 'South Indian',
  chinese: 'Chinese',
  mexican: 'Mexican',
  desserts: 'Desserts',
  healthy: 'Healthy Food',
  cafe: 'Cafe',
  'street-food': 'Street Food',
  seafood: 'Seafood',
  sushi: 'Japanese',
  asian: 'Asian',
  italian: 'Italian',
  continental: 'Continental',
};

/**
 * Normalizes a category ID or category name to its corresponding discovery cuisine string.
 *
 * @param {string} categoryInput - Category ID or raw category name.
 * @returns {string} Normalized cuisine string.
 */
export function normalizeCategoryToCuisine(categoryInput = '') {
  if (!categoryInput) return 'All';

  const key = categoryInput.toLowerCase().trim();

  if (CATEGORY_CUISINE_MAP[key]) {
    return CATEGORY_CUISINE_MAP[key];
  }

  // Fallback mappings for display labels
  if (key.includes('coffee') || key.includes('cafe')) return 'Cafe';
  if (key.includes('healthy') || key.includes('salad')) return 'Healthy Food';
  if (key.includes('street')) return 'Street Food';
  if (key.includes('south')) return 'South Indian';
  if (key.includes('north')) return 'North Indian';

  // Default capitalizer fallback
  return categoryInput.charAt(0).toUpperCase() + categoryInput.slice(1);
}

/**
 * Generates the discovery URL for a given category object.
 *
 * @param {Object} category - Category data object from categories dataset.
 * @returns {string} URL string (e.g., '/restaurants?cuisine=Pizza').
 */
export function getCategoryDiscoveryUrl(category) {
  if (!category) return '/restaurants';
  const cuisine = normalizeCategoryToCuisine(category.id || category.name);
  return `/restaurants?cuisine=${encodeURIComponent(cuisine)}`;
}
