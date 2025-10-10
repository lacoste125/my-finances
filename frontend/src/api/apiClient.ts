import axios, {AxiosRequestConfig, Method} from "axios";

const API_BASE_URL = "http://localhost:8181/api/";

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
        url: `${API_BASE_URL}${endpoint}`,
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
