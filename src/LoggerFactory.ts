import CompositeLogger from './CompositeLogger';
import ConsoleLogger from './ConsoleLogger';
import FakeLogger from './FakeLogger';
import Logger from './Logger';
import LoggerFactorySettings, {
    isArrayOfLoggerPluginSettings,
    isLoggerPluginConstructable,
    isLoggerPluginSettings,
    LoggerEnvironmentSettings
} from './LoggerFactorySettings';
import LoggerProxy from './LoggerProxy';
import LogLevel from './LogLevel';

import Util from './Util';

const defaultSettings: LoggerFactorySettings = {
    logLevel: LogLevel.INFO,
    format: (filename: string, logLevel: LogLevel, message: string, timestamp: Date) =>
        `${filename} - ${timestamp} - ${logLevel} - ${message}`,
    envs: {
        development: {
            plugins: [{
                logger: ConsoleLogger,
                settings: {}
            }]
        },
        production: {
            plugins: [{
                logger: FakeLogger,
                settings: {}
            }]
        }
    },
    activeEnv: 'detect'
};

class LoggerFactory {

    public static configure(settings: LoggerFactorySettings = defaultSettings) {
        if (!this.configured) {
            this.sharedLogger = new CompositeLogger(settings.logLevel, settings.format);

            const environmentSettings = this.getEnvironmentSettings(settings);
            const plugins = environmentSettings.plugins;

            if (isArrayOfLoggerPluginSettings(plugins)) {

                plugins.forEach((plugin) => {
                    const loggerPlugin = new plugin.logger(plugin.settings);
                    this.sharedLogger.addLogger(loggerPlugin);
                });

            } else if (isLoggerPluginSettings(plugins)) {

                const loggerPlugin = new plugins.logger(plugins.settings);
                this.sharedLogger.addLogger(loggerPlugin);

            } else if (isLoggerPluginConstructable(plugins)) {

                this.sharedLogger.addLogger(new plugins());
            }

            this.configured = true;
        }
    }

    /**
     * Gets a logger.
     * @param {string} file file of the logger
     * @returns {Logger} logger instance
     */
    public static getLogger(filename = ''): Logger {

        return new LoggerProxy(filename, this.sharedLogger);
    }

    private static configured: boolean = false;
    private static sharedLogger: CompositeLogger;

    private static getEnvironmentSettings(settings: LoggerFactorySettings): LoggerEnvironmentSettings {
        let env;

        if (settings.activeEnv === 'detect') {
            env = Util.activeEnvironment;
        } else {
            env = settings.activeEnv;
        }

        return settings.envs[env];
    }

    private constructor() {}
}

export default LoggerFactory;
