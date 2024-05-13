import {StatusCode} from "./status-code";

export abstract class AbstractException extends Error {
  public readonly code: string;
  public readonly statusCode: StatusCode;
  public readonly timestamp: Date;

  // Construcción dinámica de StatusCodeStrings
  private static readonly StatusCodeStrings: Record<StatusCode, string> = Object.keys(StatusCode)
    .filter((key) => isNaN(Number(key))) // Filtrar las claves no numéricas
    .reduce((acc, key) => {
      const value = StatusCode[key as keyof typeof StatusCode];
      acc[value as StatusCode] = key;
      return acc;
    }, {} as Record<StatusCode, string>);

  constructor(message: string, statusCode: StatusCode) {
    super(message);
    this.name = this.constructor.name;
    this.code = AbstractException.StatusCodeStrings[statusCode];
    this.statusCode = statusCode;
    this.timestamp = new Date();
    Error.captureStackTrace(this, this.constructor);
  }

  logDetails(): void {
    console.error(`[${this.name}] ${this.message} - Code: ${this.code}, Status: ${this.statusCode}, Timestamp: ${this.timestamp}`);
  }

  toJSON(): { code: string; message: string; statusCode: number; timestamp: string } {
    return {
      code: this.code,
      message: this.message,
      statusCode: this.statusCode,
      timestamp: this.timestamp.toISOString(),
    };
  }
}
