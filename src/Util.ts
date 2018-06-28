
class Util {
    public static get isProduction(): boolean {
        return process.env.NODE_ENV === 'production';
    }

    public static get isDevelopment(): boolean {
        return !this.isProduction;
    }

    public static get activeEnvironment(): 'development' | 'production' {
        return this.isDevelopment ? 'development' : 'production';
    }

    public static format(message: string, ...args: any[]): string {

        const processedArgs = args.map((arg) => {
            if (typeof arg === 'undefined' || arg === null) {
                return arg;
            } else if (Object.prototype.hasOwnProperty.call(arg, 'toString') && typeof arg.toString === 'function') {
                return arg.toString();
            } else if (typeof arg === 'function') {
                return arg();
            } else {
                return arg;
            }
        });

        return processedArgs.reduce((p, c) => p.replace('{}', c), message);
    }
}

export default Util;
