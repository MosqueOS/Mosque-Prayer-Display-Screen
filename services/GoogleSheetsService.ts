"use server"

import { AnnouncementData } from "@/types/AnnouncementType"
import { google, sheets_v4 } from "googleapis"
import {
  prayerTimeValuesToPrayerTimesJsonSchema,
  sheetsUtilFlattenedJsonToRows,
  sheetsUtilValuesToJson,
  sheetsUtilValuesToNestedJson,
} from "@/services/GoogleSheetsUtil"
import { ConfigurationJson } from "@/types/ConfigurationType"
import deepmerge from "deepmerge"
import { configurationDefaults } from "@/config/ConfigurationDefaults"
import { MosqueData, MosqueMetadataType } from "@/types/MosqueDataType"
import { DailyPrayerTime } from "@/types/DailyPrayerTimeType"
import { JummahTimes } from "@/types/JummahTimesType"
import { unstable_cache } from "next/cache"
import { dtNowLocale } from "@/lib/datetimeUtils"

const SPREADSHEET_ID = process.env.SPREADSHEET_ID ?? ""
const ADMIN_GOOGLE_SA_PRIVATE_KEY = process.env.ADMIN_GOOGLE_SA_PRIVATE_KEY
const ADMIN_GOOGLE_SA_EMAIL = process.env.ADMIN_GOOGLE_SA_EMAIL

const SHEET_NAMES = {
  PrayerTimes: "PrayerTimes",
  JummahTimes: "JummahTimes",
  Metadata: "Metadata",
  Configuration: "Configuration",
}

let sheetsClient: sheets_v4.Sheets | null = null

export async function getUserSheetsClient() {
  if (sheetsClient) return sheetsClient

  if (!ADMIN_GOOGLE_SA_EMAIL || !ADMIN_GOOGLE_SA_PRIVATE_KEY) {
    throw new Error("Credentials have not been set")
  }

  try {
    const googleAuthJwt = new google.auth.JWT({
      email: ADMIN_GOOGLE_SA_EMAIL,
      key: ADMIN_GOOGLE_SA_PRIVATE_KEY?.replace(/\\n/g, "\n"),
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    })

    sheetsClient = google.sheets({
      version: "v4",
      auth: googleAuthJwt,
    })

    return sheetsClient
  } catch (err: any) {
    throw new Error(`Google Service Account error: ${err.message}`)
  }
}

export async function isSheetsClientReady(): Promise<boolean> {
  try {
    const sheets = await getUserSheetsClient()
    await sheets.spreadsheets.get({
      spreadsheetId: SPREADSHEET_ID,
    })
    return true
  } catch (error: any) {
    console.error(error)
    return false
  }
}

export async function sheetsGetMosqueData(): Promise<MosqueData> {
  try {
    const configurationData = await sheetsGetConfigurationData()
    const prayerTimes = await sheetsGetPrayerData()
    const jummahTimes = await sheetsGetJummahData()
    const metaData = await sheetsGetMetadata()
    return {
      metadata: metaData,
      jummah_times: jummahTimes,
      prayer_times: prayerTimes,
      config: configurationData,
    }
  } catch (error: any) {
    console.error(error)
    return {
      metadata: {},
      jummah_times: [],
      prayer_times: [],
      config: configurationDefaults,
    }
  }
}

const sheetsGetPrayerDataCached = unstable_cache(
  async () => {
    try {
      const sheets = await getUserSheetsClient()
      const prayerData = await sheets.spreadsheets.values.get({
        spreadsheetId: SPREADSHEET_ID,
        range: SHEET_NAMES.PrayerTimes,
      })
      return prayerTimeValuesToPrayerTimesJsonSchema(
        prayerData?.data?.values ?? [],
      )
    } catch (error: any) {
      console.error(error)
      throw new Error(`Google Sheets API request failed: ${error?.message}`)
    }
  },
  ["sheetsGetPrayerDataCached"],
  { revalidate: 60 },
)

export async function sheetsGetPrayerData(): Promise<DailyPrayerTime[]> {
  return sheetsGetPrayerDataCached()
}

const sheetsGetJummahDataCached = unstable_cache(
  async () => {
    try {
      const sheets = await getUserSheetsClient()
      const jummahTimesData = await sheets.spreadsheets.values.get({
        spreadsheetId: SPREADSHEET_ID,
        range: SHEET_NAMES.JummahTimes,
      })
      return sheetsUtilValuesToJson(
        jummahTimesData?.data?.values ?? [],
      ) as JummahTimes
    } catch (error: any) {
      console.error(error)
      throw new Error(`Google Sheets API request failed: ${error?.message}`)
    }
  },
  ["sheetsGetJummahDataCached"],
  { revalidate: 60 },
)

export async function sheetsGetJummahData(): Promise<JummahTimes> {
  return sheetsGetJummahDataCached()
}

const sheetsGetMetadataCached = unstable_cache(
  async () => {
    try {
      const sheets = await getUserSheetsClient()
      const metadata = await sheets.spreadsheets.values.get({
        spreadsheetId: SPREADSHEET_ID,
        range: SHEET_NAMES.Metadata,
      })
      return sheetsUtilValuesToNestedJson(
        metadata?.data?.values ?? [],
      ) as MosqueMetadataType
    } catch (error: any) {
      console.error(error)
      throw new Error(`Google Sheets API request failed: ${error?.message}`)
    }
  },
  ["sheetsGetMetadataCached"],
  { revalidate: 60 },
)

export async function sheetsGetMetadata(): Promise<MosqueMetadataType> {
  return sheetsGetMetadataCached()
}

const sheetsGetConfigurationDataCached = unstable_cache(
  async () => {
    try {
      const sheets = await getUserSheetsClient()
      const configurationData = await sheets.spreadsheets.values.get({
        spreadsheetId: SPREADSHEET_ID,
        range: SHEET_NAMES.Configuration,
      })
      return deepmerge(
        configurationDefaults,
        sheetsUtilValuesToNestedJson(configurationData?.data?.values ?? []),
      ) as ConfigurationJson
    } catch (error: any) {
      console.error(error)
      throw new Error(`Google Sheets API request failed: ${error?.message}`)
    }
  },
  ["sheetsGetConfigurationDataCached"],
  { revalidate: 60 },
)

export async function sheetsGetConfigurationData(): Promise<ConfigurationJson> {
  return sheetsGetConfigurationDataCached()
}

export async function sheetsGetAnnouncement(): Promise<AnnouncementData | null> {
  const data = await sheetsGetConfigurationData()
  let announcement = (data?.announcement as unknown as AnnouncementData) ?? null

  const now = dtNowLocale()
  announcement.is_visible =
    now.isSame(announcement?.date, "day") &&
    now.isSameOrAfter(
      `${announcement?.date} ${announcement?.start_time}`,
      "minutes",
    ) &&
    now.isBefore(`${announcement?.date} ${announcement?.end_time}`, "minutes")
  return announcement
}

export async function sheetsUpdateAnnouncement(
  announcement: AnnouncementData,
): Promise<void> {
  const data = await sheetsGetConfigurationData()
  data.announcement = announcement
  await sheetsUpdateConfigurationData(data)
}

export async function sheetsUpdateConfigurationData(
  data: ConfigurationJson,
): Promise<void> {
  const sheets = await getUserSheetsClient()
  // We need to convert the data from JSON to rows for the Google Sheets API
  const rows = sheetsUtilFlattenedJsonToRows(data)
  await sheets.spreadsheets.values.update({
    spreadsheetId: SPREADSHEET_ID,
    range: SHEET_NAMES.Configuration,
    valueInputOption: "USER_ENTERED",
    requestBody: {
      values: rows,
    },
  })
}
