import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseURL } from "../utils/constants";
import { secureStorage } from "../utils/secureStorage";

const { getTokens, setTokens } = secureStorage;

const refreshAuthToken = async () => {
    const tokens = await getTokens();
    const response = await fetch(`${baseURL}/user/refreshToken/`, {
        method: "POST",
        body: JSON.stringify({ refreshToken: tokens?.refreshToken }),
        headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
        throw new Error("Unable to refresh token");
    }
    const data = await response.json();

    await setTokens(data?.data?.accessToken, data?.data?.refreshToken);
    return data?.data?.accessToken;
};

// Custom base query
const customBaseQuery = (baseUrl: string) => {
    const baseQuery = fetchBaseQuery({ baseUrl });

    return async (args: any, api: any, extraOptions: any) => {
        const { accessToken: token } = await getTokens();
        if (token) {
            args.headers = {
                ...args.headers,
                Authorization: `Bearer ${token}`,
            };
        }
        let result = await baseQuery(args, api, extraOptions);

        if (result.error && result.error.status === 401) {
            try {
                const newToken = await refreshAuthToken();
                args.headers.set("Authorization", `Bearer ${newToken}`);
                result = await baseQuery(args, api, extraOptions);
            } catch (refreshError) {
                return { error: { status: 401, data: "Unauthorized" } };
            }
        }

        return result;
    };
};

export default customBaseQuery;