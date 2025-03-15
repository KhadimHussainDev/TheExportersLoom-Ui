/**
 * Module descriptions for various product modules
 * These descriptions are used in the CostEstimationBreakdown screen
 * and potentially other places where module descriptions are needed
 */

export const MODULE_DESCRIPTIONS = {
  /**
   * Fabric module description
   * @param {string} category - Fabric category (e.g., Cotton, Polyester)
   * @param {string} subCategory - Fabric sub-category (e.g., Cotton Lawn)
   * @returns {string} - Formatted description
   */
  fabric: (category, subCategory) =>
    `High-quality ${category} (${subCategory}) fabric selected for optimal comfort and durability.`,

  /**
   * Cutting module description
   * @param {string} style - Cutting style (e.g., regular, sublimation)
   * @returns {string} - Formatted description
   */
  cutting: (style) =>
    `Professional ${style} cutting technique applied for precise dimensions and fit.`,

  /**
   * Stitching module description
   * @param {number} quantity - Number of pieces to be stitched
   * @returns {string} - Formatted description
   */
  stitching: (quantity) =>
    `Expert stitching service for ${quantity} pieces with attention to detail and quality finish.`,

  /**
   * Logo printing module description
   * @param {string} method - Printing method (e.g., DTF, Screen Printing)
   * @param {string} position - Logo position (e.g., Front, Back, Sleeves)
   * @returns {string} - Formatted description
   */
  logoPrinting: (method, position) =>
    `Premium ${method} applied on ${position} with high-resolution output and color accuracy.`,

  /**
   * Packaging module description
   * @param {string|null} type - Packaging type (e.g., Box, Polybag)
   * @returns {string} - Formatted description
   */
  packaging: (type) =>
    type ? `Custom ${type} packaging solution for product protection and brand presentation.`
      : `Standard packaging solution for product protection.`
}; 