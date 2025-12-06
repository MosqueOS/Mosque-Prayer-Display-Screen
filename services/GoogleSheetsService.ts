'use server'

import { AnnouncementData } from '@/types/AnnouncementType'
import { google } from 'googleapis'
import { getSession } from '@/app/auth'
import { Configuration, ConfigurationJson } from '@/types/MosqueDataType'
import moment from 'moment'
import {
  sheetsUtilFlattenedJsonToRows,
  sheetsUtilValuesToNestedJson,
} from '@/services/GoogleSheetsUtil'

const SPREADSHEET_ID = process.env.SPREADSHEET_ID ?? ''
const ADMIN_GOOGLE_SA_PRIVATE_KEY = process.env.ADMIN_GOOGLE_SA_PRIVATE_KEY
const ADMIN_GOOGLE_SA_EMAIL = process.env.ADMIN_GOOGLE_SA_EMAIL

const SHEET_NAME_CONFIGURATION = 'Configuration'

export async function getUserSheetsClient() {
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

export async function isSheetsClientReady(): Promise<boolean> {
  try {
    const sheets = await getUserSheetsClient()
    return sheets != null
  } catch (error: any) {
    console.error(error)
    return false
  }
}

export async function sheetsGetConfigurationData(): Promise<ConfigurationJson> {
  try {
    const sheets = await getUserSheetsClient()
    const configurationData = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: SHEET_NAME_CONFIGURATION,
    })
    return sheetsUtilValuesToNestedJson(configurationData?.data?.values ?? []) as ConfigurationJson
  } catch (error: any) {
    console.error(error)
    throw new Error(`Google Sheets API request failed: ${error?.message}`)
  }
}

export async function sheetsGetAnnouncement(): Promise<AnnouncementData | null> {
  const data = await sheetsGetConfigurationData()
  let announcement = data?.announcement as unknown as AnnouncementData ?? null


  const now = moment()

  announcement.is_visible = (
    now.isSame(announcement?.date, 'day')
    && now.isSameOrAfter(`${announcement?.date} ${announcement?.start_time}`, 'minutes')
    && now.isBefore(`${announcement?.date} ${announcement?.end_time}`, 'minutes')
  )


  return announcement
}

export async function sheetsUpdateAnnouncement(announcement: AnnouncementData): Promise<void> {
  const data = await sheetsGetConfigurationData()
  data.announcement = announcement
  await sheetsUpdateConfigurationData(data)
}

export async function sheetsUpdateConfigurationData(data: Configuration): Promise<void> {
  const sheets = await getUserSheetsClient()
  // We need to convert the data from JSON to rows for the Google Sheets API
  const rows = sheetsUtilFlattenedJsonToRows(data)
  await sheets.spreadsheets.values.update({
    spreadsheetId: SPREADSHEET_ID,
    range: SHEET_NAME_CONFIGURATION,
    valueInputOption: 'USER_ENTERED',
    requestBody: {
      values: rows,
    },
  })
}