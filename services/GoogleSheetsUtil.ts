import { DailyPrayerTime } from '@/types/DailyPrayerTimeType'

/**
 * Generic function to convert spreadsheet row/column data into a json list.
 * The object will use the column headers as json keys.
 * @param values
 */
export function sheetsUtilValuesToJson(values: any[][] = []): Record<string, any>[] {
  if (!values || values.length === 0) return []

  const headers = values[0]
  const rows = values.slice(1)

  return rows.map((row) => {
    const obj: Record<string, any> = {}

    headers.forEach((header, i) => {
      obj[header] = row[i] ?? ''
    })

    return obj
  })
}

export function sheetsUtilValuesToNestedJson(rows: any[][]): Record<string, any> {
  const result: Record<string, any> = {};

  for (const row of rows) {
    // Expect at least [key, value]
    if (!row || row.length < 2) continue;

    const rawKey = row[0];
    const value = row[1];

    // Skip header row if present
    if (rawKey === "key") continue;

    const key = String(rawKey);
    const parts = key.split("."); // Split on dots to handle nested keys
    let current: any = result;

    for (let i = 0; i < parts.length; i++) {
      const part = parts[i];

      if (i === parts.length - 1) {
        // Last segment → assign value
        current[part] = value;
      } else {
        // Ensure nested object exists
        if (current[part] == null || typeof current[part] !== "object") {
          current[part] = {};
        }
        current = current[part];
      }
    }
  }

  return result;
}

/**
 * This function is to convert JSON data into rows for the Google Sheets API.
 * The data is flattened into a list of rows, each row contains a key and a value.
 * e.g. nested JSON data:
 * {
 *   "name": "John",
 *   "age": 30,
 *   "address": {
 *     "street": "123 Main St",
 *     "city": "Anytown",
 *     "state": "CA"
 *   }
 * }
 * will be converted to:
 * [
 *   ["name", "John"],
 *   ["age", 30],
 *   ["address.street", "123 Main St"],
 *   ["address.city", "Anytown"],
 *   ["address.state", "CA"]
 * @param json
 * @returns
 */
export function sheetsUtilFlattenedJsonToRows(json: Record<string, any>): any[][] {
  const rows: any[][] = [["key", "value"]];

  function walk(obj: any, path: string[] = []) {
    if (obj === null || typeof obj !== "object") {
      // Primitive → emit row
      rows.push([path.join("."), obj]);
      return;
    }

    for (const key of Object.keys(obj)) {
      walk(obj[key], [...path, key]);
    }
  }

  walk(json);
  return rows;
}