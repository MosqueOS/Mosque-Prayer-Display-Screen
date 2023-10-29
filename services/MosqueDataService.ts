import {
  DailyPrayerTime,
  UpcomingPrayerTimes,
} from "@/types/DailyPrayerTimeType"
import { JummahTimes } from "@/types/JummahTimesType"
import { MosqueMetadataType, MosqueData } from "@/types/MosqueDataType"
import { find } from "lodash"
import moment from "moment"

const MOSQUE_API_ENDPOINT = process.env.MOSQUE_API_ENDPOINT ?? ""
const DAY_FOR_UPCOMING = parseInt(process.env?.UPCOMING_PRAYER_DAY ?? "3")

export async function getMosqueData(): Promise<MosqueData> {
  const response = await fetch(MOSQUE_API_ENDPOINT, {
    next: { revalidate: 30 },
  })

  return response.json()
}

export async function getPrayerTimeForDayMonth(
  day_of_month: string,
  month: string,
): Promise<DailyPrayerTime> {
  const { prayer_times } = await getMosqueData()

  return (
    find(prayer_times, {
      day_of_month,
      month,
    }) ?? prayer_times[0]
  )
}

export async function getPrayerTimesForToday(): Promise<DailyPrayerTime> {
  const date = moment()

  return getPrayerTimeForDayMonth(date.format("D"), date.format("M"))
}

export async function getPrayerTimesForTomorrow(): Promise<DailyPrayerTime> {
  const date = moment().add(1, "day")

  return getPrayerTimeForDayMonth(date.format("D"), date.format("M"))
}

export async function getPrayerTimesForUpcomingDays(
  days: number = DAY_FOR_UPCOMING,
): Promise<UpcomingPrayerTimes[]> {
  let data = []

  for (let index = 1; index <= days; index++) {
    let times: UpcomingPrayerTimes = {
      ...(await getPrayerTimeForDayMonth(
        moment().add(index, "day").format("D"),
        moment().add(index, "day").format("M"),
      )),
      display_date: moment().add(index, "day").format("ddd D MMM"),
      display_day_label: moment().add(index, "day").format("ddd"),
    }

    data.push(times)
  }

  return data
}

export async function getAllPrayerTimes(): Promise<DailyPrayerTime[]> {
  const { prayer_times } = await getMosqueData()

  return prayer_times
}

export async function getJummahTimes(): Promise<JummahTimes> {
  const { jummah_times } = await getMosqueData()

  return jummah_times
}

export async function getMetaData(): Promise<MosqueMetadataType> {
  const { metadata } = await getMosqueData()

  return metadata
}
