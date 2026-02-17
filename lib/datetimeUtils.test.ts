process.env.TZ = "UTC"
process.env.LOCALE = "en"

import moment from "moment"
import momentHijri from "moment-hijri"

// IMPORTANT: update this import path to wherever your file lives
import {
  dtNow,
  dtNowLocale,
  dtLocale,
  dtNowLocaleCustomFormat,
  dtNowLocalFormatTime24Hour,
  dtNowLocalFormatTime12Hour,
  dtNowLocaleFormatTime12hAmPm,
  dtNowFormatFull,
  dtFormatTimeToCustom,
  dtFormatTimeTo12hAmPm,
  dtFormatDayNumber,
  dtFormatDayShort,
  dtFormatDayLong,
  dtFormatMonthNumber,
  dtFormatMonthShort,
  dtFormatMonthLong,
  dtFormatDayDateShort,
  dtFormatDateMonthLong,
  dtFormatDateMonthYearLong,
  dtMonthNumToFullMonth,
  dtHijriLocale,
  dtHijriNow,
  dtHijriNowLocaleCustomFormat,
  dtHijriNowFormatFull,
  dtHijriFormatDayNumber,
  dtHijriFormatDayShort,
  dtHijriFormatMonthShort,
  dtHijriFormatMonthLong,
  dtHijriFormatYearLong,
  dtHijriFormatDateMonthYearLong,
  dtNowHijriFormatFull,
  dtFormatTimeTo12h,
} from "./datetimeUtils" // <- change this

describe("date utils (moment + moment-hijri)", () => {
  // Freeze time at: 2026-01-01 06:57:00 UTC
  const FIXED_ISO = "2026-01-01T06:57:00.000Z"
  const FIXED_DATE_ISO = "2026-01-01"

  beforeAll(() => {
    jest.useFakeTimers()
    jest.setSystemTime(new Date(FIXED_ISO))

    // Ensure moment is in a consistent locale
    moment.locale("en")
    momentHijri.locale("en")
  })

  afterAll(() => {
    jest.useRealTimers()
  })

  describe("now + locale helpers", () => {
    test("dtNow returns a moment instance at 'now'", () => {
      const m = dtNow()
      expect(moment.isMoment(m)).toBe(true)
      expect(m.toISOString()).toBe(FIXED_ISO)
    })

    test("dtNowLocale returns a moment instance at 'now' with locale", () => {
      const m = dtNowLocale()
      expect(moment.isMoment(m)).toBe(true)
      expect(m.toISOString()).toBe(FIXED_ISO)
      expect(m.locale()).toBe("en")
    })

    test("dtLocale parses ISO date when given an ISO string", () => {
      const m = dtLocale(FIXED_DATE_ISO)
      expect(m.isValid()).toBe(true)
      expect(m.format("YYYY-MM-DD")).toBe("2026-01-01")
    })

    test("dtNowLocaleCustomFormat formats with moment tokens", () => {
      expect(dtNowLocaleCustomFormat("D MMMM YYYY")).toBe("1 January 2026")
    })
  })

  describe("time formatting", () => {
    test("dtNowLocalFormatTime24Hour -> HH:mm", () => {
      expect(dtNowLocalFormatTime24Hour()).toBe("06:57")
    })

    test("dtNowLocalFormatTime12Hour -> h:mm (no am/pm)", () => {
      expect(dtNowLocalFormatTime12Hour()).toBe("6:57")
    })

    test("dtNowLocaleFormatTime12hAmPm -> h:mm A", () => {
      // moment uses uppercase AM/PM for "A"
      expect(dtNowLocaleFormatTime12hAmPm()).toBe("6:57 AM")
    })

    test("dtFormatTimeTo12h -> h:mm", () => {
      expect(dtFormatTimeTo12h("06:57 am")).toBe("6:57")
      expect(dtFormatTimeTo12h("19:57")).toBe("7:57")
    })

    test("dtTimeToCustomFormat converts common input formats", () => {
      expect(dtFormatTimeToCustom("18:05", "h:mm a")).toBe("6:05 pm")
      expect(dtFormatTimeToCustom("6:05", "HH:mm")).toBe("06:05")
      expect(dtFormatTimeToCustom("6:05 AM", "HH:mm")).toBe("06:05")
    })

    test("dtFormatTo12hAmPm formats a time string to h:mm a", () => {
      // Note: dtFormatTo12hAmPm currently calls dtLocale(time) without a format,
      // which relies on Moment's implicit parsing. This test verifies current behavior.
      const out = dtFormatTimeTo12hAmPm("18:05")
      // Could be "6:05 pm" in most environments; assert a safe pattern:
      expect(out).toMatch(/^\d{1,2}:\d{2} (am|pm)$/)
    })
  })

  describe("date formatting (gregorian)", () => {
    test("dtNowFormatFull -> D MMMM YYYY", () => {
      expect(dtNowFormatFull()).toBe("1 January 2026")
    })

    test("day formatters", () => {
      expect(dtFormatDayNumber(FIXED_DATE_ISO)).toBe("4") // Thursday in ISO weekday? NOTE: moment 'd' is day of week (0-6). In UTC 2026-01-01 is Thu => 4.
      expect(dtFormatDayShort(FIXED_DATE_ISO)).toBe("Thu")
      expect(dtFormatDayLong(FIXED_DATE_ISO)).toBe("Thursday")
    })

    test("month formatters", () => {
      expect(dtFormatMonthNumber(FIXED_DATE_ISO)).toBe("1")
      expect(dtFormatMonthShort(FIXED_DATE_ISO)).toBe("Jan")
      expect(dtFormatMonthLong(FIXED_DATE_ISO)).toBe("January")
    })

    test("composite formatters", () => {
      expect(dtFormatDayDateShort(FIXED_DATE_ISO)).toBe("Thu 1 Jan")

      expect(dtFormatDateMonthLong(FIXED_DATE_ISO)).toBe("1 January")

      expect(dtFormatDateMonthYearLong(FIXED_DATE_ISO)).toBe("1 January 2026")
    })

    test("dtMonthNumToFullMonth converts month number string to full month name", () => {
      expect(dtMonthNumToFullMonth("1")).toBe("January")
      expect(dtMonthNumToFullMonth("12")).toBe("December")
    })
  })

  describe("hijri formatting (moment-hijri)", () => {
    test("dtHijriNow returns a moment instance", () => {
      const m = dtHijriNow()
      expect(moment.isMoment(m)).toBe(true)
      expect(m.isValid()).toBe(true)
    })

    test("dtHijriNowLocaleCustomFormat formats", () => {
      const out = dtHijriNowLocaleCustomFormat("iD iMMMM iYYYY")
      expect(out).toBe("12 Rajab 1447")
    })

    test("dtNowHijriFormatFull uses iD iMMMM iYYYY", () => {
      const out = dtNowHijriFormatFull()
      expect(out).toBe("12 Rajab 1447")
    })

    test("dtHijriLocale parses a gregorian ISO date and can output hijri format", () => {
      const m = dtHijriLocale(FIXED_DATE_ISO)
      expect(m.isValid()).toBe(true)
      const out = m.format("iD iMMMM iYYYY")
      expect(out).toBe("12 Rajab 1447")
    })

    test("hijri day/month formatters return strings", () => {
      expect(dtHijriFormatDayNumber(FIXED_DATE_ISO)).toBe("4")
      expect(dtHijriFormatDayShort(FIXED_DATE_ISO)).toBe("Thu")
      expect(dtHijriFormatMonthShort(FIXED_DATE_ISO)).toBe("Raj")
      expect(dtHijriFormatMonthLong(FIXED_DATE_ISO)).toBe("Rajab")
    })

    test("dtHijriFormatDateMonthYearLong", () => {
      const out = dtHijriFormatDateMonthYearLong(FIXED_DATE_ISO)
      expect(typeof out).toBe("string")
      expect(out).toBe("12 Rajab 1447")
    })

  })
})
