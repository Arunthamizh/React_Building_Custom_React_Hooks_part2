import { useState } from "react";

/**
 * Custom hook for making HTTP requests.
 * 
 * @param {object} requestConfig - The configuration for the HTTP request.
 * @param {function} applyData - The function to apply the fetched data.
 * @returns {object} - An object containing isLoading, error, and sendRequest.
 */
const useHttp = async (requestConfig, applyData) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  /**
   * Sends an HTTP request using the provided configuration.
   */
  const sendRequest = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(requestConfig.url, {
        method: requestConfig.method ? requestConfig.method : "GET",
        headers: requestConfig.headers ? requestConfig.headers : {},
        body: requestConfig.body ? JSON.stringify(requestConfig.body) : null,
      });

      if (!response.ok) {
        throw new Error("Request failed!");
      }

      const data = await response.json();
      applyData(data);
    } catch (err) {
      setError(err.message || "Something went wrong!");
    }
    setIsLoading(false);
  };

  return {
    isLoading,
    error,
    sendRequest,
  };
};

export default useHttp;
