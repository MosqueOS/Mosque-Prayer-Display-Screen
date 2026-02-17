type FlatObject = Record<string, unknown>
type NestedObject = Record<string, any>

function parseValue(value: unknown): unknown {
  if (typeof value !== "string") return value
  if (value === "true") return true
  if (value === "false") return false
  if (value !== "" && !isNaN(Number(value))) return Number(value)
  return value
}

export function unflattenObject<T extends NestedObject = NestedObject>(
  flatObj: FlatObject,
): T {
  const result: NestedObject = {}

  for (const [flatKey, rawValue] of Object.entries(flatObj)) {
    const keys = flatKey.split(".")
    let current: NestedObject = result

    keys.forEach((key, index) => {
      if (index === keys.length - 1) {
        current[key] = parseValue(rawValue)
      } else {
        current[key] ??= {}
        current = current[key]
      }
    })
  }

  return result as T
}
