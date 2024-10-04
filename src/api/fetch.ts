const BASE_URL = '';

interface ApiResponse<T> {
  data: T | null;
  error: string | null;
}

export const fetchData = async <T>(): Promise<ApiResponse<T>> => {
  try {
    const response = await fetch(BASE_URL);

    if (!response.ok) {
      throw new Error(`Network response was not ok (status: ${response.status})`);
    }

    const data: T = await response.json();
    return { data, error: null };
  } catch (error: any) {
    return { data: null, error: error.message || 'Failed to fetch data' };
  }
};
