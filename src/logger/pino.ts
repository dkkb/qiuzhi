import pino, {Logger} from 'pino';

const env = import.meta.env;

export class PinoLogger {
    private readonly logger: Logger;

    constructor() {
        this.logger = pino({
                level: env.LOG_LEVEL || 'info',
            },
        );
    }

    public info(message: string, obj?: object): void {
        this.logger.info(obj, message);
    }

    public error(message: string, obj?: object): void {
        this.logger.error(obj, message);
    }
}

export const pinoLogger = new PinoLogger();