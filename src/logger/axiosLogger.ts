import {AxiosRequestConfig, AxiosResponse} from 'axios';
import * as MaskData from 'maskdata';
import {pinoLogger} from "./pino.ts";

export class AxiosLogger {
    public logRequestConfig(originalConfig: AxiosRequestConfig): void {
        const config = {...originalConfig};

        this.extractIrrelevantHeaders(config);
        const maskedConfig: AxiosRequestConfig = this.maskRequestFields(config);

        pinoLogger.info('Executed Request', {
            requestData: {
                date: new Date().toISOString(),
                method: maskedConfig.method?.toUpperCase(),
                baseURL: maskedConfig.baseURL,
                url: maskedConfig.url,
                body: maskedConfig.data,
                headers: maskedConfig.headers,
            },
        });
    }

    public logResponseConfig(resp: AxiosResponse): void {
        pinoLogger.info('Received Response', {
            responseData: {
                date: new Date().toISOString(),
                status: resp.status,
                body: resp.data,
                headers: resp.headers,
            },
        });
    }

    private extractIrrelevantHeaders(config: AxiosRequestConfig): void {
        const arr = ['common', 'delete', 'get', 'head', 'post', 'put', 'patch'];
        arr.forEach((header) => {
            if (config.headers && config.headers[header]) {
                delete config.headers[header];
            }
        });
    }

    private maskRequestFields(config: AxiosRequestConfig): AxiosRequestConfig {
        return MaskData.maskJSON2(config);
    }
}

export const axiosLogger = new AxiosLogger();