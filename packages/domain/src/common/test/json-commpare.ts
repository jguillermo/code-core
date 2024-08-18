import { CompareValue } from './compare-process/CompareValue';
import { universalToString } from '../utils/string/universal-to-string';

type JsonValue = string | number | boolean | null | JsonObject | JsonArray;

interface JsonObject {
  [key: string]: JsonValue;
}

type JsonArray = Array<JsonValue>;

export class JsonCompare {
  private _differences: string[] = [];
  private strict: boolean;

  get differences(): string[] {
    return this._differences;
  }

  constructor(data: any, reference: any, strict = false) {
    this.strict = strict;
    this._differences = [];
    this.compareValues(data, reference, '');
  }

  private sortArray(arr: JsonArray): JsonArray {
    return arr
      .map((item) => {
        if (Array.isArray(item)) {
          return this.sortArray(item as JsonArray);
        } else if (typeof item === 'object' && item !== null) {
          return this.sortObject(item as JsonObject);
        }
        return item;
      })
      .sort();
  }

  private sortObject(obj: JsonObject): JsonObject {
    const sortedObj: JsonObject = {};
    Object.keys(obj)
      .sort()
      .forEach((key) => {
        const value = obj[key];
        if (Array.isArray(value)) {
          sortedObj[key] = this.sortArray(value as JsonArray);
        } else if (typeof value === 'object' && value !== null) {
          sortedObj[key] = this.sortObject(value as JsonObject);
        } else {
          sortedObj[key] = value;
        }
      });
    return sortedObj;
  }

  private compareArrays(data: JsonArray, reference: JsonArray, path: string) {
    if (this.strict && data.length !== reference.length) {
      this._differences.push(`${path}: length of ${JSON.stringify(data)} is not equal to length of ${JSON.stringify(reference)}`);
      return;
    }
    for (let i = 0; i < data.length; i++) {
      this.compareValues(data[i], reference[i], `${path}[${i}]`);
    }
  }

  private processPath(path: string, afterPath: string): string {
    if (path === '') {
      return afterPath;
    }
    return `${path}.${afterPath}`;
  }

  private compareObjectContent(data: JsonObject, obj2: JsonObject, path: string): string[] {
    const differences: string[] = [];
    for (const key in data) {
      if (Object.prototype.hasOwnProperty.call(data, key)) {
        if (!Object.prototype.hasOwnProperty.call(obj2, key)) {
          differences.push(`${this.processPath(path, key)}: key not found`);
        } else {
          if (this.isObject(data[key])) {
            differences.push(...this.compareObjectContent(data[key] as JsonObject, obj2[key] as JsonObject, `${this.processPath(path, key)}`));
          } else if (data[key] !== obj2[key]) {
            differences.push(`${this.processPath(path, key)}: ${JSON.stringify(data[key])} !== ${JSON.stringify(obj2[key])}`);
          }
        }
      }
    }
    return differences;
  }

  private compareObjects(data: JsonObject, reference: JsonObject, path: string) {
    if (this.strict) {
      Object.keys(reference).forEach((key) => {
        const processPath = this.processPath(path, key);
        if (!Object.prototype.hasOwnProperty.call(data, key)) {
          this._differences.push(`${processPath}: key not found`);
        } else {
          this.compareValues(data[key], reference[key], `${processPath}`);
        }
      });
      Object.keys(data).forEach((key) => {
        const processPath = this.processPath(path, key);
        if (!Object.prototype.hasOwnProperty.call(reference, key)) {
          this._differences.push(`${processPath}: extra key found`);
        }
      });
    } else {
      Object.keys(data).forEach((key) => {
        const processPath = this.processPath(path, key);
        if (Object.prototype.hasOwnProperty.call(reference, key)) {
          this.compareValues(data[key], reference[key], `${processPath}`);
        } else {
          this._differences.push(`${processPath}: extra key found`);
        }
      });
    }
  }

  private compareValues(data: JsonValue, reference: JsonValue, path: string) {
    if (Array.isArray(data)) {
      if (!Array.isArray(reference)) {
        this._differences.push(`${path}: ${universalToString(data)} is not an array`);
      } else {
        this.compareArrays(data, reference, path);
      }
    } else if (this.isObject(data)) {
      if (!this.isObject(reference)) {
        this._differences.push(`${path}: must not be an object; it must be ${universalToString(reference)}`);
      } else {
        this.compareObjects(data as JsonObject, reference as JsonObject, path);
      }
    } else {
      const isEquals = CompareValue.getInstance().compare(data, reference);
      if (!isEquals) {
        path = path === '' ? path : `${path}: `;
        this._differences.push(`${path}${universalToString(reference)} -> ${universalToString(data)}`);
      }
    }
  }

  private isObject(data: JsonValue): boolean {
    return typeof data === 'object' && data !== null;
  }
}
