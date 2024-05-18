import {ExceptionCode} from "./exception-code";

export abstract class AbstractException extends Error {
  public readonly exceptionCodes: ExceptionCode[];
  public readonly timestamp: Date;

  constructor(message: string, exceptionCodess: ExceptionCode[]) {
    super(message);
    this.name = this.constructor.name;
    this.exceptionCodes = exceptionCodess;
    this.timestamp = new Date();
    Error.captureStackTrace(this, this.constructor);
  }

  static readonly ExceptionCodeStrings: Record<ExceptionCode, string> = Object.keys(ExceptionCode)
    .filter((key) => isNaN(Number(key))) // Filtrar las claves no numéricas
    .reduce((acc, key) => {
      const value = ExceptionCode[key as keyof typeof ExceptionCode];
      acc[value as ExceptionCode] = key.replace(/([A-Z])/g, ' $1').trim(); // Convertir a mensaje de error legible
      return acc;
    }, {} as Record<ExceptionCode, string>);

  public get exceptionMessage(): string {
    return this.exceptionCodes.map(code => `${AbstractException.ExceptionCodeStrings[code]} (${code})`).join(', ');
  }

  logDetails(): void {
    console.error(`[${this.exceptionMessage}]: ${this.message}, ${this.timestamp}`);
  }

  toJSON(): { name: string; message: string; exceptionCodess: string[]; exceptionMessages: string; timestamp: string } {
    return {
      name: this.name,
      message: this.message,
      exceptionCodess: this.exceptionCodes,
      exceptionMessages: this.exceptionMessage,
      timestamp: this.timestamp.toISOString(),
    };
  }
}
