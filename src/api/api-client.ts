import {
  Client,
  type ApiClient as ApiClientGenerated,
  type QueryParameters,
  type RequestArgs,
} from "~/api/apiClient";
import { HTTPError } from "~/api/CustomErrors/HTTPErrors";

export interface RequestOption {
  timeout?: number;
}

export function decodeParams(
  params: QueryParameters | undefined
): string | undefined {
  if (!params) {
    return;
  }

  const param = new URLSearchParams();
  for (const key in params) {
    const value = params[key].value;
    if (value === undefined || value === null) {
      continue; // ignore undefined/null field
    }
    param.set(key, value);
  }
  return param.toString();
}

const apiClientImpl: ApiClientGenerated<RequestOption> = {
  request: async ({
    httpMethod,
    url,
    headers,
    requestBody,
    queryParameters,
  }: RequestArgs): Promise<any> => {
    // const user = await Auth.currentAuthenticatedUser();
    // const idTokenJWT = user.signInUserSession.idToken.jwtToken;
    const query = decodeParams(queryParameters);
    const requestUrl = `${query ? `${url}?${query}` : url}`;
    const response = await fetch(requestUrl, {
      body: JSON.stringify(requestBody),
      headers: {
        ...headers,
        "x-api-key": import.meta.env.VITE_API_KEY,
      },
      method: httpMethod,
    });

    if (!response.ok) {
      const error = new HTTPError(response);
      await error.parseErrorData();
      throw error;
    }

    if (response.headers.get("Content-Type")?.includes("application/json")) {
      return await response.json();
    } else {
      return response.text();
    }
  },
};

// 認証不要のエンドポイント向け
const apiClientNoAuthImpl: ApiClientGenerated<RequestOption> = {
  request: async ({
    httpMethod,
    url,
    headers = {},
    requestBody,
    queryParameters,
  }: RequestArgs): Promise<any> => {
    const query = decodeParams(queryParameters);
    const requestUrl = `${query ? `${url}?${query}` : url}`;

    const response = await fetch(requestUrl, {
      body: JSON.stringify(requestBody),
      headers: headers,
      method: httpMethod,
    });

    if (!response.ok) {
      const error = new HTTPError(response);
      await error.parseErrorData();
      throw error;
    }

    if (response.headers.get("Content-Type")?.includes("application/json")) {
      return await response.json();
    } else {
      return response.text();
    }
  },
};

const baseUrl = import.meta.env.VITE_API_URL;

export const apiClientNoAuth = new Client<RequestOption>(
  apiClientNoAuthImpl,
  baseUrl
);

export const apiClient = new Client<RequestOption>(apiClientImpl, baseUrl);

export type ApiClient = typeof apiClient;
