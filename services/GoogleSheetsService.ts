'use server'

import { DailyPrayerTime } from '@/types/DailyPrayerTimeType'
import { AnnouncementData } from '@/types/AnnouncementType'
import { google } from 'googleapis'
import { getSession } from '@/app/auth'

const SPREADSHEET_ID = process.env.SPREADSHEET_ID ?? ''
const ADMIN_GOOGLE_SA_PRIVATE_KEY = process.env.ADMIN_GOOGLE_SA_PRIVATE_KEY
const ADMIN_GOOGLE_SA_EMAIL = process.env.ADMIN_GOOGLE_SA_EMAIL

const SHEET_NAME_PRAYERTIMES = 'PrayerTimes'
const SHEET_NAME_METADATA = 'Metadata'

export async function getUserSheetsClient () {
  const session = await getSession() // next-auth v5 app router helper

  if (!session) {
    throw new Error('Not authenticated with Google')
  }

  try {

    const googleAuthJwt = new google.auth.JWT({
      email: ADMIN_GOOGLE_SA_EMAIL,
      key: ADMIN_GOOGLE_SA_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    })

    return google.sheets({
      version: 'v4',
      auth: googleAuthJwt,
    })
  } catch (err: any) {
    throw new Error(`Google Service Account error: ${err.message}`)
  }
}

export async function sheetsGetAnnouncement (): Promise<AnnouncementData | null> {
  const data = await sheetsGetMetadataValueByKey('announcement')

  if (data) {
    return JSON.parse(data) as AnnouncementData
  }
  return null
}

export async function sheetsUpdateAnnouncement (announcement: AnnouncementData): Promise<void> {
  await sheetsUpdateMetadataValueByKey('announcement',
    JSON.stringify(announcement))
}

async function sheetsGetMetadataValueByKey (key: string): Promise<string> {
  try {
    const sheets = await getUserSheetsClient()
    const metadataValueRange = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: SHEET_NAME_METADATA,    // or your sheet name
    })
    const rows = metadataValueRange.data.values || []
    const targetIndex = rows.findIndex(
      (row) => row[0]?.trim() === key,
    )

    if (targetIndex === -1) {
      throw new Error(
        `Could not find '${key}' row in sheet ${SHEET_NAME_METADATA}`)
    }

    // The value is in column B = column index 1
    const cell = `${SHEET_NAME_METADATA}!B${targetIndex + 1}` // add 1 because Google Sheets is 1-indexed

    const data = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: cell,
    })

    return data?.data?.values?.[0]?.[0] ?? null
  } catch (error: any) {
    console.error(error)
    throw new Error(`Google Sheets API request failed: ${error?.message}`)
  }
}

async function sheetsUpdateMetadataValueByKey (
  key: string, value: string): Promise<void> {
  try {
    const sheets = await getUserSheetsClient()
    const metadataValueRange = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: SHEET_NAME_METADATA,    // or your sheet name
    })
    const rows = metadataValueRange.data.values || []
    const targetIndex = rows.findIndex(
      (row) => row[0]?.trim() === key,
    )

    if (targetIndex === -1) {
      throw new Error(
        `Could not find '${key}' row in sheet ${SHEET_NAME_METADATA}`)
    }

    // The value is in column B = column index 1
    const cell = `${SHEET_NAME_METADATA}!B${targetIndex + 1}` // add 1 because Google Sheets is 1-indexed

    // Update the single cell
    await sheets.spreadsheets.values.update({
      spreadsheetId: SPREADSHEET_ID,
      range: cell,
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [[value]],
      },
    })

  } catch (error: any) {
    console.error(error)
    throw new Error(`Google Sheets API request failed: ${error?.message}`)
  }

}

/**
 * Generic function to convert spreadsheet row/column data into a json list.
 * The object will use the column headers as json keys.
 * @param values
 */
function valuesToJson (values: any[][] = []): Record<string, any>[] {
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

/**
 * Converts the PrayerTimes spreadsheet values into the DailyPrayerTime json schema
 * @param values
 */
function prayerTimeValuesToPrayerTimesJsonSchema (values: any[][] | null = []): DailyPrayerTime[] {
  if (!values || values.length === 0) return []

  const headers = values[0]
  const rows = values.slice(1)

  return rows.map((row) => {
    //@ts-ignore
    const obj: any = { }

    headers.forEach((header, i) => {
      const value = row[i] ?? ''

      // Normal top-level keys (month, day_of_month, sunrise_start, etc.)
      if (header === 'month' ||
        header === 'month_label' ||
        header === 'day_of_month' ||
        header === 'sunrise_start') {
        obj[header] = value
        return
      }


      // fajr_start
      // fajr_congregation_start
      // sunrise_start
      // zuhr_start
      // zuhr_congregation_start
      // asr_first_start
      // asr_second_start
      // asr_congregation_start
      // maghrib_start
      // maghrib_congregation_start
      // isha_start
      // isha_congregation_start

      // Split header by underscores
      const parts = header.split('_')

      // Special case for ASR (first & second)
      if (header.startsWith('asr_first_')) {
        obj.asr = obj.asr || {}
        obj.asr.start = value
        return
      }

      if (header.startsWith('asr_second_')) {
        obj.asr = obj.asr || {}
        obj.asr.start_secondary = value
        return
      }

      // Everything else fits pattern: prayer_attribute
      const [prayer, ...rest] = parts

      obj[prayer] = obj[prayer] || {}

      const key = rest.join('_') // e.g. "start", "congregation_start"
      obj[prayer][key] = value
    })

    return obj as DailyPrayerTime
  })
}
