import axios, {AxiosRequestConfig, Method} from "axios";

const API_URL: string = import.meta.env.VITE_API_URL;

export type ApiRequestConfig<Req = any> = {
    endpoint: string;
    method?: Method;
    body?: Req;
    headers?: Record<string, string>;
    params?: Record<string, any>;
};

export const apiClient = async <Res = any>({
    endpoint, method = "GET", body, headers, params
}: ApiRequestConfig): Promise<Res> => {
    const axiosConfig: AxiosRequestConfig = {
        url: `${API_URL}${endpoint}`,
        method,
        headers,
        params,
        data: body,
    };

    const response = await axios(axiosConfig);
    if (response.status < 200) {
        // TODO - add global logging here
        throw new Error(`API error: ${response.statusText}`);
    }

    return response.data as Res;
};
