import LoggerPlugin from "./LoggerPlugin";
import LogLevel from "./LogLevel";

interface LoggerPluginConstructable {
    new (settings?: object): LoggerPlugin;
}

interface LoggerPluginSettings {
    logger: LoggerPluginConstructable;
    settings?: object;
}

interface LoggerEnvironmentSettings {
    plugins: LoggerPluginSettings[] | LoggerPluginSettings | LoggerPluginConstructable;
}

function isArrayOfLoggerPluginSettings(
    setting: LoggerPluginSettings[] | LoggerPluginSettings | LoggerPluginConstructable):
        setting is LoggerPluginSettings[] {
    return (setting as LoggerPluginSettings[]).length !== undefined;
}

function isLoggerPluginSettings(
    setting: LoggerPluginSettings[] | LoggerPluginSettings | LoggerPluginConstructable):
        setting is LoggerPluginSettings {
    return (setting as LoggerPluginSettings).logger !== undefined;
}

function isLoggerPluginConstructable(
    setting: LoggerPluginSettings[] | LoggerPluginSettings | LoggerPluginConstructable):
        setting is LoggerPluginConstructable {
    return (setting as LoggerPluginConstructable).call !== undefined;
}

interface LoggerFactorySettings {
    logLevel: LogLevel;
    format: (filename: string, logLevel: LogLevel, message: string, timestamp: Date) => string;
    envs: {
        development: LoggerEnvironmentSettings,
        production: LoggerEnvironmentSettings,
    };
    activeEnv: 'development' | 'production' | 'detect';
}

export {
    LoggerEnvironmentSettings,
    LoggerPluginSettings,
    LoggerPluginConstructable,
    isArrayOfLoggerPluginSettings,
    isLoggerPluginSettings,
    isLoggerPluginConstructable
};

export default LoggerFactorySettings;
