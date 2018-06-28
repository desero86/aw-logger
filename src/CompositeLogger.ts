import LoggerPlugin from "./LoggerPlugin";
import LoggerPrivate from "./LoggerPrivate";
import LogLevel from "./LogLevel";
import Util from "./Util";

class CompositeLogger implements LoggerPrivate {

    private loggers: LoggerPlugin[];
    private currentLogLevel: LogLevel;
    private format: (filename: string, logLevel: LogLevel, message: string, timestamp: Date) => string;

    public constructor(
        logLevel: LogLevel = LogLevel.TRACE,
        format: (filename: string, logLevel: LogLevel, message: string, timestamp: Date) => string) {

        this.currentLogLevel = logLevel;
        this.format = format;
    }

    public addLogger(logger: LoggerPlugin) {
        this.loggers.push(logger);
    }

    public log(filename: string, logLevel: LogLevel, message: string = '', ...args: any[]) {
        if (this.currentLogLevel >= logLevel) {
            const timestamp = new Date();
            const formattedMessage = Util.format(message, args);
            this.loggers.forEach((logger) => {
                logger.writeLog(filename, logLevel, formattedMessage, timestamp);
            });
        }
    }

    public fatal(filename: string, message: string, ...args: any[]) {
        this.log(filename, LogLevel.FATAL, message, args);
    }

    public error(filename: string, message: string, ...args: any[]) {
        this.log(filename, LogLevel.ERROR, message, args);
    }

    public warn(filename: string, message: string, ...args: any[]) {
        this.log(filename, LogLevel.WARN, message, args);
    }

    public info(filename: string, message: string, ...args: any[]) {
        this.log(filename, LogLevel.INFO, message, args);
    }

    public debug(filename: string, message: string, ...args: any[]) {
        this.log(filename, LogLevel.DEBUG, message, args);
    }

    public trace(filename: string, message: string, ...args: any[]) {
        this.log(filename, LogLevel.TRACE, message, args);
    }
}

export default CompositeLogger;
