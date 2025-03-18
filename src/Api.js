/**
 * Makes a GET request to the provided URL and returns the JSON response.
 * @param {string} url - The URL to fetch data from.
 * @returns {Object} - JSON response from the API or an empty object in case of an error.
 */
export const getApiResponse = async url => {
  try {
    let result = await fetch(url);
    let response = await result.json();
    return response;
  } catch (error) {
    return {};
  }
};

/**
 * Base URL for the Star Wars API (SWAPI) endpoint for fetching characters.
 */
export const BaseURL = "https://swapi.dev/api/people/";
