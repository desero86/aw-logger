
interface LoggerPrivate {

    fatal(filename: string, message: string, ...args: any[]);

    error(filename: string, message: string, ...args: any[]);

    warn(filename: string, message: string, ...args: any[]);

    info(filename: string, message: string, ...args: any[]);

    debug(filename: string, message: string, ...args: any[]);

    trace(filename: string, message: string, ...args: any[]);
}

export default LoggerPrivate;
