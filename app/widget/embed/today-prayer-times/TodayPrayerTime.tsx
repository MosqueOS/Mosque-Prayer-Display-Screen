import { DailyPrayerTime } from "@/types/DailyPrayerTimeType"
import "../../widget.css"
import { getNextPrayer } from "@/services/PrayerTimeService"
import {
  getPrayerTimesForToday,
  getPrayerTimesForTomorrow,
} from "@/services/MosqueDataService"
import { cn } from "@/lib/utils"
import {
  dtHijriNow,
  dtNowFormatFull,
  dtNowHijriFormatFull,
  dtNowLocale,
  dtFormatTimeToCustom,
} from "@/lib/datetimeUtils"

type Props = {
  timeFormat?: "h:mm" | "h:mm A" | "HH:mm"
  showSunrise?: boolean
  showDate?: boolean
  showHijri?: boolean
}

export async function TodayPrayerTime({
  timeFormat = "h:mm",
  showSunrise = false,
  showDate = false,
  showHijri = false,
}: Props) {
  const convertTime = (time: string) =>
    dtFormatTimeToCustom(time, timeFormat)

  const today: DailyPrayerTime = await getPrayerTimesForToday()
  const tomorrow: DailyPrayerTime = await getPrayerTimesForTomorrow()
  let currentDailyPrayerTimes = today
  let englishDate = dtNowFormatFull()
  let hijriDate = dtNowHijriFormatFull()

  let nextPrayerTime = getNextPrayer(today)
  if (!nextPrayerTime.today) {
    nextPrayerTime = {
      today: true,
      prayerIndex: 0
    }
    currentDailyPrayerTimes = tomorrow
    englishDate = dtNowLocale().add(1, "day").format("D MMMM YYYY")
    hijriDate = dtHijriNow().add(1, "day").format("iD iMMMM iYYYY")
  }

  let currentSalahTimes: Array<{
    label: string
    start: string
    congregation: string | null
    prayerIndex: number
  }> = [
    {
      label: "Fajr",
      start: currentDailyPrayerTimes.fajr.start,
      congregation: currentDailyPrayerTimes.fajr.congregation_start,
      prayerIndex: 0,
    },
    {
      label: "Zuhr",
      start: currentDailyPrayerTimes.zuhr.start,
      congregation: currentDailyPrayerTimes.zuhr.congregation_start,
      prayerIndex: 1,
    },
    {
      label: "Asr",
      start: currentDailyPrayerTimes.asr.start,
      congregation: currentDailyPrayerTimes.asr.congregation_start,
      prayerIndex: 2,
    },
    {
      label: "Maghrib",
      start: currentDailyPrayerTimes.maghrib.start,
      congregation: currentDailyPrayerTimes.maghrib.congregation_start,
      prayerIndex: 3,
    },
    {
      label: "Isha",
      start: currentDailyPrayerTimes.isha.start,
      congregation: currentDailyPrayerTimes.isha.congregation_start,
      prayerIndex: 4,
    },
  ]

  if (showSunrise) {
    currentSalahTimes = [
      ...currentSalahTimes.slice(0, 1),
      {
        label: "Sunrise",
        start: currentDailyPrayerTimes.sunrise_start,
        congregation: null,
        prayerIndex: -1,
      },
      ...currentSalahTimes.slice(1),
    ]
  }

  return (
    <div className="PrayerTimeWidgetWrapper">
      <table className="w-full ml-0 text-center">
        <thead>
          {(showDate || showHijri) && (
            <tr>
              <th className={"pr-6 text-right text-gray-300"}></th>
              <th
                colSpan={currentSalahTimes?.length}
                className={"text-gray-400 font-normal text-center text-md"}
              >
                {[showDate && englishDate, showHijri && hijriDate]
                  .filter(Boolean)
                  .join(" • ")}
              </th>
            </tr>
          )}
          <tr>
            <th />
            {currentSalahTimes.map((value, index) => (
              <th
                key={index}
                className={cn(
                  "min-w-[10px] w-24",
                  nextPrayerTime.today &&
                    nextPrayerTime.prayerIndex === value.prayerIndex
                    ? "bg-mosqueBrand-primaryAlt text-mosqueBrand-onPrimary rounded-t-md"
                    : "",
                )}
              >
                {value.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            <th className={"text-right text-gray-400 font-medium pr-2"}>
              Begins
            </th>
            {currentSalahTimes.map((value, index) => (
              <td
                key={index}
                className={cn(
                  "min-w-[10px] w-24",
                  nextPrayerTime.today &&
                    nextPrayerTime.prayerIndex === value.prayerIndex
                    ? "bg-mosqueBrand-primaryAlt text-mosqueBrand-onPrimary"
                    : "",
                )}
              >
                {value.start ? convertTime(value.start) : ""}
              </td>
            ))}
          </tr>
          <tr>
            <th className={"text-right text-gray-400 font-medium pr-2"}>
              Jama&apos;ah
            </th>

            {currentSalahTimes.map((value, index) => (
              <td
                key={index}
                className={cn(
                  "min-w-[10px] w-24",
                  nextPrayerTime.today &&
                    nextPrayerTime.prayerIndex === value.prayerIndex
                    ? "bg-mosqueBrand-primaryAlt text-mosqueBrand-onPrimary rounded-b-md"
                    : "",
                )}
              >
                {value.congregation ? convertTime(value.congregation) : ""}
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  )
}
