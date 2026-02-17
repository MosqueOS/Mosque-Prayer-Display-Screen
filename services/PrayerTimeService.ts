import { DailyPrayerTime } from "@/types/DailyPrayerTimeType"
import { dtLocale, dtNowLocale } from "@/lib/datetimeUtils"

const blackoutPeriod = process.env.BLACKOUT_PERIOD ?? 13 // defaults to 13 minutes

export function isBlackout(prayerTimes: DailyPrayerTime) {
  const currentTime = dtNowLocale()
  const congregationTimes = [
    prayerTimes.fajr.congregation_start,
    prayerTimes.zuhr.congregation_start,
    prayerTimes.asr.congregation_start,
    prayerTimes.maghrib.congregation_start,
    prayerTimes.isha.congregation_start,
  ]

  let setBlackoutMode = false

  congregationTimes.forEach((time) => {
    if (
      currentTime >= dtLocale(time, ["HH:mm"]) &&
      currentTime <= dtLocale(time, ["HH:mm"]).add(blackoutPeriod, "m")
    ) {
      setBlackoutMode = true
    }
  })

  return setBlackoutMode
}

export function getNextPrayer(today: DailyPrayerTime) {
  const currentTime = dtNowLocale()

  const todaysTimes = [
    today.fajr.congregation_start,
    today.zuhr.congregation_start,
    today.asr.congregation_start,
    today.maghrib.congregation_start,
    today.isha.congregation_start,
  ]

  let nextPrayertime = {
    today: false,
    prayerIndex: 0,
  }

  todaysTimes.forEach((time, index) => {
    if (currentTime < dtLocale(time, ["HH:mm"]) && !nextPrayertime.today) {
      nextPrayertime = {
        today: true,
        prayerIndex: index,
      }
    }
  })

  return nextPrayertime
}
