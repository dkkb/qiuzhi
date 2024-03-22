import axios, {
    AxiosError,
    AxiosInstance,
    AxiosRequestConfig,
    AxiosResponse, InternalAxiosRequestConfig,
} from 'axios';
import {axiosLogger} from "../logger/axiosLogger.ts";
import {pinoLogger} from "../logger/pino.ts";

class ResponseError extends Error {
    constructor(statusText: string, readonly status: number, readonly data: unknown,) {
        super(statusText);
    }

    toString(): string {
        return `${super.toString()} ${this.status} ${JSON.stringify(this.data)}`;
    }
}

function buildResponseError(axiosError: AxiosError): ResponseError {
    return new ResponseError(
        axiosError?.response?.statusText ?? 'Unknown Error',
        axiosError?.response?.status ?? -1,
        axiosError?.response?.data ?? {},
    );
}

function handleErrorResponse(error: AxiosError,): void {
    const responseError = buildResponseError(error);
    const statusCode = error?.response?.status;
    switch (statusCode) {
        case 400:
            pinoLogger.error('Bad request');
            break;
        case 401:
            pinoLogger.error('Unauthorized');
            break;
        case 403:
            pinoLogger.error('Forbidden');
            break;
        case 404:
            pinoLogger.error('Not found');
            break;
        default:
            pinoLogger.error('Unhandled server error');
    }
    throw responseError;
}


interface HttpClient {
    delete<T>(path: string): Promise<T>;

    get<T>(path: string): Promise<T>;

    post<T>(path: string, data: object): Promise<T>;

    put<T>(path: string, data: object): Promise<T>;

    request<T>(data: object): Promise<T>;
}

type Config = Omit<AxiosRequestConfig, 'url' | 'method' | 'data'>;

export class AxiosHttpClient implements HttpClient {
    private readonly axios: AxiosInstance;

    constructor(config: Config) {
        this.axios = axios.create(config);
        this.setupRequestInterceptors();
        this.setupResponseInterceptors();
    }

    async get<T>(path: string): Promise<T> {
        return this.axios.get(path);
    }

    async request<T>(data: object): Promise<T> {
        return this.axios.request(data);
    }

    async delete<T>(path: string, data: object = {}): Promise<T> {
        return this.axios.delete(path, data);
    }

    async post<T>(path: string, data: object): Promise<T> {
        return this.axios.post(path, data);
    }

    async put<T>(path: string, data: object): Promise<T> {
        return this.axios.put(path, data);
    }

    private setupRequestInterceptors(): void {
        this.axios.interceptors.request.use(
            (request) => this.onFulfilledRequest(request)
        );
    }

    private onFulfilledRequest = async (request: InternalAxiosRequestConfig) => {
        axiosLogger.logRequestConfig(request);
        return request;
    };

    private setupResponseInterceptors(): void {
        this.axios.interceptors.response.use(
            this.onFulfilledResponse,
            this.onRejectedResponse,
        );
    }

    public onFulfilledResponse(resp: AxiosResponse): AxiosResponse {
        axiosLogger.logResponseConfig(resp);
        return resp;
    }

    public onRejectedResponse(error: AxiosError): void {
        handleErrorResponse(error);
    }
}

const initAxiosClient = (): AxiosHttpClient => {
    const settings: AxiosRequestConfig = {
        // baseURL: `http://localhost:1105/api`,
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json,*/*',
        },
    };
    return new AxiosHttpClient(settings);
}
export const axiosClient = initAxiosClient();