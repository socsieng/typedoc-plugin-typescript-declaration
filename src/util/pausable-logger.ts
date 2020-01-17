import { ConsoleLogger, LogLevel } from 'typedoc/dist/lib/utils'

type Message = {message: string, level?: LogLevel, newLine?: boolean};

export default class PausableLogger extends ConsoleLogger {
  private _isLogging: boolean;
  private _logBuffer: Array<Message>;

  constructor(startLogging: boolean = false) {
    super();
    this._isLogging = startLogging;
    this._logBuffer = [];
  }

  pause() {
    this._isLogging = false;
  }

  resume() {
    this.flushLogs();
    this._isLogging = true;
  }

  private flushLogs() {
    let message: Message | undefined;
    while ((message = this._logBuffer.shift())) {
      this.logForReal(message.message, message.level, message.newLine);
    }
  }

  log(message: string, level?: LogLevel, newLine?: boolean): void {
    if (level === LogLevel.Error) {
      this.errorCount++;
    }

    if (this._isLogging) {
      this.logForReal(message, level, newLine);
    } else {
      this._logBuffer.push({ message, level, newLine });
    }
  }

  private logForReal(message: string, level?: LogLevel, newLine?: boolean): void {
    this.errorCount--; // error count already incremented before this call.
    super.log(message, level, newLine);
  }
}
