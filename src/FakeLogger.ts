import LoggerPlugin from "./LoggerPlugin";
import LogLevel from "./LogLevel";

class LoggerFake implements LoggerPlugin {

    constructor() {
        // do nothing
    }

    public writeLog(filename: string, logLevel: LogLevel, message: string, timestamp: Date) {
        // Do nothing
    }
}

export default LoggerFake;
