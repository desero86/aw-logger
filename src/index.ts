import LoggerFactory from './LoggerFactory';

const configureLogger = LoggerFactory.configure.bind(LoggerFactory);

export { configureLogger, LoggerFactory };

export default LoggerFactory.getLogger.bind(LoggerFactory);
