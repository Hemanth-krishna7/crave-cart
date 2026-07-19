/**
 * Generates a unique, frontend-only order reference ID.
 * Standard format: CC-XXXXXX where X represents an uppercase alphanumeric char.
 *
 * @returns {string} The simulated order reference ID.
 */
export function generateOrderReference() {
  const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let rand = '';
  for (let i = 0; i < 6; i++) {
    rand += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `CC-${rand}`;
}
