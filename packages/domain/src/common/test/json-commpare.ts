import { CompareValue } from './compare-process/CompareValue';

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

  constructor(obj1: any, obj2: any, strict = false) {
    this.strict = strict;
    this._differences = [];
    this.compareValues(obj1, obj2, '');
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

  private compareArrays(val1: JsonArray, val2: JsonArray, path: string) {
    if (this.strict) {
      if (val1.length !== val2.length) {
        this._differences.push(`${path}: length of ${JSON.stringify(val1)} is not equal to length of ${JSON.stringify(val2)}`);
        return;
      }
      for (let i = 0; i < val1.length; i++) {
        this.compareValues(val1[i], val2[i], `${path}[${i}]`);
      }
    } else {
      val1.forEach((item, index) => {
        if (this.isObject(item)) {
          const matched = val2.some(
            (val2Item) => this.isObject(val2Item) && this.compareObjectContent(item as JsonObject, val2Item as JsonObject, `${path}[${index}]`).length === 0,
          );
          if (!matched) {
            this._differences.push(`${path}[${index}]: object not found in ${JSON.stringify(val2)}`);
          }
        } else if (!val2.includes(item)) {
          this._differences.push(`${path}[${index}]: ${JSON.stringify(item)} not found in ${JSON.stringify(val2)}`);
        }
      });
    }
  }

  private processPath(path: string, afterPath: string): string {
    if (path === '') {
      return afterPath;
    }
    return `${path}.${afterPath}`;
  }

  private compareObjectContent(obj1: JsonObject, obj2: JsonObject, path: string): string[] {
    const differences: string[] = [];
    for (const key in obj1) {
      if (Object.prototype.hasOwnProperty.call(obj1, key)) {
        if (!Object.prototype.hasOwnProperty.call(obj2, key)) {
          differences.push(`${this.processPath(path, key)}: key not found`);
        } else {
          if (this.isObject(obj1[key])) {
            differences.push(...this.compareObjectContent(obj1[key] as JsonObject, obj2[key] as JsonObject, `${this.processPath(path, key)}`));
          } else if (obj1[key] !== obj2[key]) {
            differences.push(`${this.processPath(path, key)}: ${JSON.stringify(obj1[key])} !== ${JSON.stringify(obj2[key])}`);
          }
        }
      }
    }
    return differences;
  }

  private compareObjects(val1: JsonObject, val2: JsonObject, path: string) {
    for (const key in val1) {
      if (Object.prototype.hasOwnProperty.call(val1, key)) {
        if (!Object.prototype.hasOwnProperty.call(val2, key)) {
          this._differences.push(`${this.processPath(path, key)}: key not found`);
        } else {
          this.compareValues(val1[key], val2[key], `${this.processPath(path, key)}`);
        }
      }
    }
    if (this.strict) {
      for (const key in val2) {
        if (Object.prototype.hasOwnProperty.call(val2, key) && !Object.prototype.hasOwnProperty.call(val1, key)) {
          this._differences.push(`${this.processPath(path, key)}: extra key found`);
        }
      }
    }
  }

  private compareValues(val1: JsonValue, val2: JsonValue, path: string) {
    if (Array.isArray(val1)) {
      if (!Array.isArray(val2)) {
        this._differences.push(`${path}: ${JSON.stringify(val1)} is not an array`);
      } else {
        this.compareArrays(val1, val2, path);
      }
    } else if (this.isObject(val1)) {
      if (!this.isObject(val2)) {
        this._differences.push(`${path}: ${JSON.stringify(val1)} is not an object`);
      } else {
        this.compareObjects(val1 as JsonObject, val2 as JsonObject, path);
      }
    } else {
      const isEquals = CompareValue.getInstance().compare(val1, val2);
      if (!isEquals) {
        this._differences.push(`${path}: ${JSON.stringify(val2)} -> ${JSON.stringify(val1)}`);
      }
    }
  }

  private isObject(val: JsonValue): boolean {
    return typeof val === 'object' && val !== null;
  }
}
