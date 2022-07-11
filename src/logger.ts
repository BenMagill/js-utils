export enum LogLevels {
  trace = 'TRACE',
  debug = 'DEBUG',
  info = 'INFO',
  warn = 'WARN',
  error = 'ERROR',
  fatal = 'FATAL',
}

type LogInternalArgs = [
  string, // message
] | [
  any, // data
  string, // message
] | [
  any, // data
] | any[];

export class Logger {
  // Hack until I can work out how to automate this 
  trace = (...args: LogInternalArgs) => this.log(LogLevels.trace, ...args);

  debug = (...args: LogInternalArgs) => this.log(LogLevels.debug, ...args);

  info = (...args: LogInternalArgs) => this.log(LogLevels.info, ...args);

  warn = (...args: LogInternalArgs) => this.log(LogLevels.warn, ...args);

  error = (...args: LogInternalArgs) => this.log(LogLevels.error, ...args);

  fatal = (...args: LogInternalArgs) => this.log(LogLevels.fatal, ...args);
    
  log(level: LogLevels = LogLevels.info, ...args: LogInternalArgs) {
    let data, messageText;
    if (typeof args[0] === 'string' && !args[1]) {
      // just a message
      messageText = args[0];
    } else if (typeof args[1] === 'string' && args.length === 2) {
      // data then a message
      [data, messageText] = args;
    } else if (args.length === 1) {
      // just data
      data = args[0];
    } else {
      data = args;
    }

    const log: Record<string, any> = {
      date: new Date().toISOString(),
      level,
    };

    if (messageText) log.message = messageText;
    if (data) log.data = data;

    console.log(JSON.stringify(log));
  }
}
