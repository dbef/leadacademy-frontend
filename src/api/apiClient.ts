import type { paths } from 'interfaces/interface';
import type { AxiosResponse, AxiosRequestConfig } from 'axios';

import axios from 'axios';

// Modify the apiClient return type to reflect the expected response correctly
const apiClient = async <
  Path extends keyof paths,
  Method extends keyof paths[Path]
>(
  path: Path,
  method: Method,
  options?: {
    pathParams?: Record<string, string | number>; // ✅ Add support for path parameters
    queryParams?: paths[Path][Method] extends { parameters: { query: infer Q } }
    ? Partial<Q>
    : Record<string, string | number | boolean> | undefined; // Query parameters
    body?: paths[Path][Method] extends {
      requestBody: { content: { 'application/json': infer B } };
    }
      ? B
      : undefined;
    headers?: Record<string, string>; // Custom headers (e.g., Authorization)
  }
): Promise<
  paths[Path][Method] extends {
    responses: { 200: { content: { 'application/json': infer R } } };
  }
    ? R
    : unknown
> => {
  let url = `${process.env.NEXT_PUBLIC_API_URL}${path}`;

  // ✅ Replace path parameters dynamically
  if (options?.pathParams) {
    Object.entries(options.pathParams).forEach(([key, value]) => {
      url = url.replace(`{${key}}`, encodeURIComponent(String(value)));
    });
  }

  // Axios configuration
  const config: AxiosRequestConfig = {
    url,
    method: method as AxiosRequestConfig['method'],
    headers: {
      'Content-Type': 'application/json',
      ...(options?.headers || {}), // Merge custom headers
    },
    params: options?.queryParams, // Query parameters
    data: options?.body, // Request body
  };

  try {
    const response: AxiosResponse = await axios(config);
    return response.data as paths[Path][Method] extends {
      responses: { 200: { content: { 'application/json': infer R } } };
    }
      ? R
      : unknown;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response
          ? `API request failed with status ${error.response.status.toString()}`
          : `API request failed: ${error.message}`
      );
    } else {
      throw new Error('An unexpected error occurred');
    }
  }
};

export default apiClient;
