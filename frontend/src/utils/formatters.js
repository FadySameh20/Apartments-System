/**
 * Format a price to currency format
 * @param {number} price - The price to format
 * @returns {string} Formatted price string
 */
export const formatPrice = (price) => {
  return price.toLocaleString('en-US', {
    style: 'currency',
    currency: 'EGP',
    maximumFractionDigits: 0,
  });
}; 