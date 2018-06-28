import LogLevel from "./LogLevel";

interface LoggerPlugin {
    writeLog?(filename: string, logLevel: LogLevel, message: string, timestamp: Date): void;

    writeLog?(message: string): void;
}

export default LoggerPlugin;
