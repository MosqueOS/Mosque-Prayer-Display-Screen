import { DailyPrayerTime } from "@/types/DailyPrayerTimeType"
import moment from "moment"

const blackoutPeriod = process.env.BLACKOUT_PERIOD ?? 7 // defaults to 7 minutes

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
