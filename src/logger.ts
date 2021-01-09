// Simple Logger for server app, defaults to weekly file rotation

import winston, {format} from 'winston';
import DailyRotateFile = require('winston-daily-rotate-file')

interface Log{
    info(msg: string): void;
    debug(msg: string): void;
    error(msg: string): void;
    warn(msg: string): void;
}

const formatter = format.printf(info => {
    return `${info.timestamp} [${info.label}] ${info.level}: ${info.message}`;
});

class DailyLogger implements Log {
    private logger: winston.Logger
    private label: string
    constructor(label: string){
        this.label = label;
        this.logger = winston.createLogger({
            level: 'info',
            format: format.combine(
                format.label({ label: this.label}),
                format.timestamp(),
                formatter
            ),
            transports: [
                new DailyRotateFile({
                    filename: `logs/${this.label}/logs_${this.label}_%DATE%.log`,
                    datePattern: 'YYYY-MM-DD',
                    maxFiles: '7d',
                    zippedArchive: true,
                })
            ],
        });
        // IN PROD MAKE USE OF CONSOLE
        if (process.env.NODE_ENV !== 'production') {
            this.logger.add(new winston.transports.Console({
                format: formatter,
            }));
        }
    }
    info(msg: string){
        this.logger.info(msg);
    }
    debug(msg: string){
        this.logger.debug(msg);
    }
    error(msg: string){
        this.logger.error(msg);
    }
    warn(msg: string){
        this.logger.warn(msg);
    }
}

export default DailyLogger;