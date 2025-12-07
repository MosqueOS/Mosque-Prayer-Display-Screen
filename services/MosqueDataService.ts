import {
  DailyPrayerTime,
  UpcomingPrayerTimes,
} from '@/types/DailyPrayerTimeType'
import { JummahTimes } from '@/types/JummahTimesType'
import { MosqueData, MosqueMetadataType } from '@/types/MosqueDataType'
import { AnnouncementData } from '@/types/AnnouncementType'
import { find } from 'lodash'
import moment from 'moment'
import {
  sheetsGetAnnouncement,
  sheetsUpdateAnnouncement,
} from '@/services/GoogleSheetsService'
import { CalendarPrintMonthlyPrayerTimes } from '@/types/CalendarPrintType'


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


export async function getCalendarPrintMonthlyPrayerTimesForYear(year: string): Promise<CalendarPrintMonthlyPrayerTimes[]> {
  const prayer_times = await getAllPrayerTimes()
  const map = new Map<string, CalendarPrintMonthlyPrayerTimes>();

  for (const prayer_time of prayer_times) {
    if (!map.has(prayer_time.month)) {
      map.set(prayer_time.month, {
        month: prayer_time.month,
        month_label: prayer_time.month_label,
        prayer_times: [],
      });
    }

    // We want to validate the date as we are generating the calendar, this will avoid leap year issues and other date validation issues
    const date = moment(`${year}-${prayer_time.month}-${prayer_time.day_of_month}`, "YYYY-M-D", true)

    if (!date.isValid()) {
      continue
    }

    map.get(prayer_time.month)!.prayer_times.push({
      ...prayer_time,
      date: date.format("YYYY-MM-DD"),
    });
  }

  return Array.from(map.values());
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

export async function getAnnouncement(): Promise<AnnouncementData|null> {
  const { configuration } = await getMosqueData()
  const announcement = configuration?.announcement ?? null

  if (announcement?.date == null) {
    return null
  }

  const now = moment()

  announcement.is_visible = (
    now.isSame(announcement?.date, 'day')
    && now.isSameOrAfter(`${announcement?.date} ${announcement?.start_time}`, 'minutes')
    && now.isBefore(`${announcement?.date} ${announcement?.end_time}`, 'minutes')
  )

  return announcement
}

export async function createAnnouncement(announcement: AnnouncementData): Promise<void> {
  await sheetsUpdateAnnouncement(announcement)
}