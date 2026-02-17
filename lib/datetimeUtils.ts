import moment from "moment"
import momentHijri from "moment-hijri"

const LOCALE = process.env.LOCALE || "en"

export function dtNow(): moment.Moment {
  return moment()
}

export function dtNowLocale(): moment.Moment {
  return moment().locale(LOCALE)
}

export function dtLocale(date: moment.MomentInput, format?: moment.MomentFormatSpecification, strict?: boolean): moment.Moment {
  return moment(date, format, LOCALE, strict)
}

export function dtNowLocaleCustomFormat(format: string): string {
  return dtNowLocale().format(format)
}

export function dtNowLocalFormatTime24Hour(): string {
  return dtNowLocale().format("HH:mm")
}

export function dtNowLocalFormatTime12Hour(): string {
  return dtNowLocale().format("h:mm")
}

export function dtNowLocaleFormatTime12hAmPm(): string {
  return dtNowLocale().format("h:mm A")
}

export function dtNowFormatFull(): string {
  return dtNowLocale().format("D MMMM YYYY")
}

export function dtFormatTimeToCustom(time?: string, format?: string): string {
  if (!time) {
    return ""
  }
  if (!format) {
    return time
  }
  return dtLocale(time, ["HH:mm", "h:mm", "h:mm a", "h:mm A"]).format(format)
}

export function dtFormatTimeTo12hAmPm(time?: string): string {
  return dtFormatTimeToCustom(time, "h:mm a")
}

export function dtFormatTimeTo12h(time?: string): string {
  return dtFormatTimeToCustom(time, "h:mm")
}

export function dtFormatDayNumber(date?: string | moment.Moment): string {
  if (!date) {
    return ""
  }
  return dtLocale(date).format("d")
}

export function dtFormatDayShort(date?: string | moment.Moment): string {
  if (!date) {
    return ""
  }
  return dtLocale(date).format("ddd")
}

export function dtFormatDayLong(date?: string | moment.Moment): string {
  if (!date) {
    return ""
  }
  return dtLocale(date).format("dddd")
}

export function dtFormatMonthNumber(date?: string | moment.Moment): string {
  if (!date) {
    return ""
  }
  return dtLocale(date).format("M")
}

export function dtFormatMonthShort(date?: string | moment.Moment): string {
  if (!date) {
    return ""
  }
  return dtLocale(date).format("MMM")
}

export function dtFormatMonthLong(date?: string | moment.Moment): string {
  if (!date) {
    return ""
  }
  return dtLocale(date).format("MMMM")
}

export function dtFormatDayDateShort(date?: string | moment.Moment): string {
  if (!date) {
    return ""
  }
  return dtLocale(date).format("ddd D MMM")
}

export function dtFormatDateMonthLong(date?: string | moment.Moment): string {
  if (!date) {
    return ""
  }
  return dtLocale(date).format("D MMMM")
}

export function dtFormatDateMonthYearLong(date?: string | moment.Moment): string {
  if (!date) {
    return ""
  }
  return dtLocale(date).format("D MMMM YYYY")
}

export function dtMonthNumToFullMonth(monthNum: string) {
  return dtNowLocale()
    .set('month', Number(monthNum) - 1)
    .format("MMMM")
}

// Hijri funcs

export function dtHijriLocale(
  date: moment.MomentInput,
  format?: moment.MomentFormatSpecification,
  strict?: boolean,
): moment.Moment {
  return momentHijri(date, format, LOCALE, strict)
}

export function dtHijri(
  date: moment.MomentInput,
  format?: moment.MomentFormatSpecification,
  strict?: boolean,
): moment.Moment {
  return momentHijri(date, format, strict)
}

export function dtHijriNow(): moment.Moment {
  return momentHijri().locale(LOCALE)
}

export function dtHijriNowLocaleCustomFormat(format: string): string {
  return dtHijriNow().format(format)
}

export function dtHijriNowFormatFull(): string {
  return dtHijriFormatDateMonthYearLong(dtHijriNow())
}

export function dtHijriFormatDayNumber(date?: string | moment.Moment): string {
  if (!date) {
    return ""
  }
  return dtHijriLocale(date).format("d")
}

export function dtHijriFormatDayShort(date?: string | moment.Moment): string {
  if (!date) {
    return ""
  }
  return dtHijriLocale(date).format("ddd")
}

export function dtHijriFormatMonthShort(date?: string | moment.Moment): string {
  if (!date) {
    return ""
  }
  return dtHijriLocale(date).format("iMMM")
}

export function dtHijriFormatMonthLong(date?: string | moment.Moment): string {
  if (!date) {
    return ""
  }
  return dtHijriLocale(date).format("iMMMM")
}

export function dtHijriFormatYearLong(date?: string | moment.Moment): string {
  if (!date) {
    return ""
  }
  return dtHijriLocale(date).format("iMMMM")
}

export function dtHijriFormatDateMonthYearLong(
  date?: string | moment.Moment,
): string {
  if (!date) {
    return ""
  }
  return dtHijriLocale(date).format("iD iMMMM iYYYY")
}

export function dtNowHijriFormatFull(): string {
  return dtHijriNow().format("iD iMMMM iYYYY")
}