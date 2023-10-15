import { DailyPrayerTime } from "@/types/DailyPrayerTimeType"
import moment from "moment"

const blackoutPeriod = process.env.BLACKOUT_PERIOD ?? 13 // defaults to 13 minutes

export function isBlackout(prayerTimes: DailyPrayerTime) {
  const currentTime = moment()
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
      currentTime >= moment(time, ["HH:mm"]) &&
      currentTime <= moment(time, ["HH:mm"]).add(blackoutPeriod, "m")
    ) {
      setBlackoutMode = true
    }
  })

  return setBlackoutMode
}

export function getNextPrayer(today: DailyPrayerTime) {
  const currentTime = moment()

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
    if (currentTime < moment(time, ["HH:mm"]) && !nextPrayertime.today) {
      nextPrayertime = {
        today: true,
        prayerIndex: index,
      }
    }
  })

  return nextPrayertime
}
