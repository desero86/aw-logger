import LoggerPlugin from './LoggerPlugin';
import LogLevel from './LogLevel';

class ConsoleLogger implements LoggerPlugin {

    private static func(logLevel: LogLevel): (string) => void { // tslint:disable-line variable-name
        let logFunction;
        switch (logLevel) {
            case LogLevel.FATAL:
            case LogLevel.ERROR:
                logFunction = console.error;
            case LogLevel.WARN:
                logFunction = console.warn;
            case LogLevel.INFO:
                logFunction = console.info;
            case LogLevel.DEBUG:
                logFunction = console.log;
            case LogLevel.TRACE:
                logFunction = console.trace;
        }
        return logFunction || console.log;
    }

    public writeLog(filename: string, logLevel: LogLevel, message: string, timestamp: Date) {
        const logFunction = ConsoleLogger.func(logLevel);
        logFunction(`${filename} - ${timestamp} - ${logLevel} - ${message}`);
    }
}

export default ConsoleLogger;
