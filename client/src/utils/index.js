/**
 * Simple utility function to conditionally join class names.
 * @param  {...string} classes
 * @returns {string}
 */
export function cls(...classes) {
  return classes.filter(Boolean).join(' ');
}

/**
 * Formats a number as INR (Indian Rupee) currency format.
 * @param {number} amount
 * @returns {string}
 */
export function formatCurrency(amount) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount);
}

/**
 * Formats an ISO date string to a human-readable local date.
 * @param {string} dateString
 * @returns {string}
 */
export function formatDate(dateString) {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}
