/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosError } from 'axios';

const useApi = () => {
  const baseURL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';
  const api = axios.create({
    baseURL: `${baseURL}/api`,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const handleError = (error: AxiosError) => {
    const customError: any = new Error(
      (error.response?.data as any)?.error ||
        (error.response?.data as any)?.message ||
        error.message ||
        'Request failed',
    );
    customError.status = error.response?.status;
    customError.data = error.response?.data;
    throw customError;
  };

  return { api, handleError };
};

export default useApi;
