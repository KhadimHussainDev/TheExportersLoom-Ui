/**
 * Utility functions for handling images
 */

/**
 * Checks if a string is a base64 encoded image
 * @param {string} str - The string to check
 * @returns {boolean} - True if the string is a base64 image, false otherwise
 */
export const isBase64Image = (str) => {
  if (!str) return false;
  try {
    // Check if it's a base64 string (should be a long string of characters)
    return str.length > 100 && /^[A-Za-z0-9+/=]+$/.test(str);
  } catch (e) {
    return false;
  }
};

/**
 * Checks if a string is a data URI (e.g., data:image/jpeg;base64,...)
 * @param {string} str - The string to check
 * @returns {boolean} - True if the string is a data URI, false otherwise
 */
export const isDataUri = (str) => {
  if (!str) return false;
  return str.startsWith('data:');
};

/**
 * Extracts the base64 part from a data URI
 * @param {string} dataUri - The data URI
 * @returns {string} - The base64 part of the data URI
 */
export const extractBase64FromDataUri = (dataUri) => {
  if (!dataUri) return null;
  if (!isDataUri(dataUri)) return dataUri;
  return dataUri.replace(/^data:image\/\w+;base64,/, '');
};

/**
 * Adds the data URI prefix to a base64 string if it doesn't already have it
 * @param {string} base64String - The base64 string
 * @returns {string} - The base64 string with the data URI prefix
 */
export const addDataUriPrefix = (base64String) => {
  if (!base64String) return null;
  if (isDataUri(base64String)) return base64String;
  return `data:image/jpeg;base64,${base64String}`;
}; 