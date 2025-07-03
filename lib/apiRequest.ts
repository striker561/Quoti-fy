type RequestOptions = {
  method: "GET" | "POST" | "DELETE" | "PUT";
  url: string;
  data?: object;
  params?: Record<string, string | number | boolean | null | undefined | []>;
  token?: string;
  isExternal?: boolean;
};

export async function apiRequest<T>({
  method,
  url,
  data,
  params,
  token,
  isExternal = false,
}: RequestOptions): Promise<T> {
  try {
    let fullUrl = isExternal
      ? url
      : `/api${url.startsWith("/") ? url : `/${url}`}`;

    if (params && method === "GET") {
      const filteredParams: Record<string, string> = {};
      Object.entries(params).forEach(([key, value]) => {
        if (value !== null && value !== undefined) {
          if (Array.isArray(value)) {
            filteredParams[key] = value.join(",");
          } else {
            filteredParams[key] = String(value);
          }
        }
      });
      const queryString = new URLSearchParams(filteredParams).toString();
      fullUrl += `${fullUrl.includes("?") ? "&" : "?"}${queryString}`;
    }

    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };

    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    const requestInit: RequestInit = {
      method: method,
      headers: headers,
    };

    if (method !== "GET" && data) {
      requestInit.body = JSON.stringify(data);
    }

    const response = await fetch(fullUrl, requestInit);

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw new Error(errorData?.message || response.statusText);
    }

    return (await response.json()) as T;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("An unknown error occurred");
  }
}
