import { DailyPrayerTime } from "@/types/DailyPrayerTimeType"
import { JummahTimes } from "@/types/JummahTimesType"
import { Metadata, MosqueData } from "@/types/MosqueDataType"
import axios from "axios"
import { find } from "lodash"
import moment from "moment"

const endpoint = process.env.MOSQUE_API_ENDPOINT ?? ""
let mosqueDataCache: MosqueData

export async function getMosqueData(): Promise<MosqueData> {
  mosqueDataCache = mosqueDataCache ?? (await axios.get(endpoint)).data

  return mosqueDataCache
}

export async function getPrayerTimesForToday(): Promise<DailyPrayerTime> {
  const { prayer_times } = await getMosqueData()

  return (
    find(prayer_times, {
      day_of_month: moment().format("D"),
      month_label: moment().format("MMMM"),
    }) ?? prayer_times[0]
  )
}

export async function getPrayerTimesForTomorrow(): Promise<DailyPrayerTime> {
  const { prayer_times } = await getMosqueData()

  return (
    find(prayer_times, {
      day_of_month: moment().add(1, "day").format("D"),
      month_label: moment().add(1, "day").format("MMMM"),
    }) ?? prayer_times[0]
  )
}

export async function getJummahTimes(): Promise<JummahTimes> {
  const { jummah_times } = await getMosqueData()

  return jummah_times
}

export async function getMetaData(): Promise<Metadata> {
  const { metadata } = await getMosqueData()

  return metadata
}
