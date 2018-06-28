import Logger from "./Logger";
import LoggerPrivate from "./LoggerPrivate";

class LoggerProxy implements Logger {

    private filename: string;
    private proxied: LoggerPrivate;

    public constructor(filename: string, proxied: LoggerPrivate) {
        this.filename = filename;
        this.proxied = proxied;
    }

    public fatal(message: string, ...args: any[]) {
        this.proxied.fatal(this.filename, message, args);
    }

    public error(message: string, ...args: any[]) {
        this.proxied.error(this.filename, message, args);
    }

    public warn(message: string, ...args: any[]) {
        this.proxied.warn(this.filename, message, args);
    }

    public info(message: string, ...args: any[]) {
        this.proxied.info(this.filename, message, args);
    }

    public debug(message: string, ...args: any[]) {
        this.proxied.debug(this.filename, message, args);
    }

    public trace(message: string, ...args: any[]) {
        this.proxied.trace(this.filename, message, args);
    }
}

export default LoggerProxy;
