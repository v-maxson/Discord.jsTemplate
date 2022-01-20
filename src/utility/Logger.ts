import IDebugData from '../models/IDebugData';
import * as path from 'path';

export enum LogSeverity {
    /**
     * For critical errors.
     */
    CRITICAL = "CRITICAL",
    
    /**
     * For errors.
     */
    ERROR = "ERROR",

    /**
     * For Warnings.
     */
    WARNING = "WARNING",

    /**
     * For basic information.
     */
    INFO= "INFO",

    /**
     * For more detailed information.
     */
    VERBOSE = "VERBOSE",

    /**
     * For the most detailed information.
     */
    DEBUG = "DEBUG"
}

export default class Logger {
    public static LogFormat: string = "[{source}][{severity}] {message}{error}{error_stack}"

    // This is modified code from the 'tracer for node.js' logging library. Found here: https://github.com/baryon/tracer
    private static getCaller(): IDebugData {
        var stackReg = /at\s+(.*)\s+\((.*):(\d*):(\d*)\)/i;
        var stackReg2 = /at\s+()(.*):(\d*):(\d*)/i;

        var data: IDebugData = {
            function: "",
            module: "",
            line: "",
            column: ""
        }

		var stacklist = (new Error()).stack!.split('\n').slice(3);
		var s = stacklist[1] || stacklist[0],
			sp = stackReg.exec(s) || stackReg2.exec(s);
		if (sp && sp.length === 5) {
			data.function = sp[1].length < 1 ? 'Anonymous' : sp[1].replace('Function.', '');
			data.module = path.basename(sp[2]).replace('.js', '');
			data.line = sp[3];
			data.column = sp[4];
		}

        return data;
    }

    /**
     * Logs to `process.stdout`.
     * @param message The message to log.
     * @param severity The severity of the message.
     * @param source The source of the message.
     * @param error The error to accompany the message.
     */
    public static Log(message: string, severity: LogSeverity, error: Error | null = null) {
        const lineData = this.getCaller();
        let toLog = this.LogFormat.replaceAll("{message}", message);
        toLog = toLog.replaceAll("{severity}", severity);
        toLog = toLog.replaceAll("{source}", `${lineData ? `${lineData.module}-${lineData.function}:${lineData.line}:${lineData.column}` : "-"}`);
        toLog = toLog.replaceAll("{error}", error ? `${error.name}: ${error.message}` : "");
        toLog = toLog.replaceAll("{error_stack}", error ? `\n${error.stack}` : "");

        if (severity === LogSeverity.CRITICAL || severity === LogSeverity.ERROR || severity === LogSeverity.WARNING) return console.error(toLog);
        else return console.log(toLog);
    }

    /**
     * Logs to `process.stderr` with a severity of LogSeverity.CRITICAL.
     * @param message The message to log.
     * @param source The source of the message.
     * @param error The error to accompany the message.
     */
    public static Critical(message: string, error: Error | null = null) {
        this.Log(message, LogSeverity.CRITICAL, error);
    }

    /**
     * Logs to `process.stderr` with a severity of LogSeverity.ERROR.
     * @param message The message to log.
     * @param source The source of the message.
     * @param error The error to accompany the message.
     */
     public static Error(message: string, error: Error | null = null) {
        this.Log(message, LogSeverity.ERROR, error);
    }

    /**
     * Logs to `process.stderr` with a severity of LogSeverity.WARNING.
     * @param message The message to log.
     * @param source The source of the message.
     * @param error The error to accompany the message.
     */
     public static Warning(message: string, error: Error | null = null) {
        this.Log(message, LogSeverity.WARNING, error);
    }

    /**
     * Logs to `process.stdout` with a severity of LogSeverity.INFO.
     * @param message The message to log.
     * @param source The source of the message.
     * @param error The error to accompany the message.
     */
     public static Info(message: string, error: Error | null = null) {
        this.Log(message, LogSeverity.INFO, error);
    }

    /**
     * Logs to `process.stdout` with a severity of LogSeverity.VERBOSE.
     * @param message The message to log.
     * @param source The source of the message.
     * @param error The error to accompany the message.
     */
     public static Verbose(message: string, error: Error | null = null) {
        this.Log(message, LogSeverity.VERBOSE, error);
    }

    /**
     * Logs to `process.stdout` with a severity of LogSeverity.DEBUG.
     * @param message The message to log.
     * @param source The source of the message.
     * @param error The error to accompany the message.
     */
     public static Debug(message: string, error: Error | null = null) {
        this.Log(message, LogSeverity.DEBUG, error);
    }
}