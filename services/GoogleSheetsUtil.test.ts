import { describe, expect, it } from '@jest/globals';
import {
  sheetsUtilFlattenedJsonToRows,
  sheetsUtilValuesToJson, sheetsUtilValuesToNestedJson,
} from './GoogleSheetsUtil'

describe("GoogleSheetsUtil", () => {
  it("should convert JSON data into rows for the Google Sheets API", () => {
    const json = {
      name: "John",
      age: 30,
      address: {
        street: "123 Main St",
        city: "Anytown",
        state: "CA"
      }
    }
    const rows = sheetsUtilFlattenedJsonToRows(json)
    expect(rows).toEqual([
      ["key", "value"],
      ["name", "John"],
      ["age", 30],
      ["address.street", "123 Main St"],
      ["address.city", "Anytown"],
      ["address.state", "CA"]
    ])
  })

  it("should convert flattened rows into JSON schema", () => {
    const values = [
      ["key", "value"],
      ["name", "John"],
      ["age", 30],
      ["address.street", "123 Main St"],
      ["address.city", "Anytown"],
      ["address.state", "CA"]
    ]
    const result = sheetsUtilValuesToNestedJson(values)
    expect(result).toEqual({
      name: "John",
      age: 30,
      address: {
        street: "123 Main St",
        city: "Anytown",
        state: "CA"
      }
    });
  })
})