"use client"

import { useEffect, useState } from "react"
import { getNextPrayer } from "@/services/PrayerTimeService"
import { DailyPrayerTime } from "@/types/DailyPrayerTimeType"
import { useConfiguration } from "@/hooks/useConfiguration"
import { dtFormatTimeTo12h } from "@/lib/datetimeUtils"

export default function PrayerTimes({
  today,
  tomorrow,
}: {
  today: DailyPrayerTime
  tomorrow: DailyPrayerTime
}) {
  const PrayerTimesArray = [
    {
      label: "Fajr",
      data: today.fajr,
      tomorrow: tomorrow.fajr,
    },
    {
      label: "Zuhr",
      data: today.zuhr,
      tomorrow: tomorrow.zuhr,
    },
    {
      label: "Asr",
      data: today.asr,
      tomorrow: tomorrow.asr,
    },
    {
      label: "Maghrib",
      data: today.maghrib,
      tomorrow: tomorrow.maghrib,
    },
    {
      label: "Isha",
      data: today.isha,
      tomorrow: tomorrow.isha,
    },
  ]

  const config = useConfiguration()
  const [nextPrayerTime, setNextPrayerTime] = useState(getNextPrayer(today))
  const isTomorrowEnabled = config.feature.prayer_time_tomorrow.enabled

  useEffect(() => {
    const interval = setInterval(() => {
      setNextPrayerTime(getNextPrayer(today))
    }, 60 * 1000)

    return () => clearInterval(interval)
  }, [today])

  return (
    <table className="text-mosqueBrand-onPrimary mx-auto table-auto border-collapse border-none w-full">
      <thead>
        <tr
          className="text-center [&>*]:p-2 md:[&>*]:p-8
          md:[&>*]:border [&>*]:border-mosqueBrand-primaryAlt
          [&>th]:border-t-0 [&>th:last-of-type]:border-r-0"
        >
          <th className="sr-only">Prayer time</th>
          <th className="md:text-5xl">Begins</th>
          <th className="md:text-5xl">Jama&apos;ah</th>
          {isTomorrowEnabled && <th className={"md:text-5xl"}>Tomorrow</th>}
        </tr>
      </thead>
      <tbody>
        {PrayerTimesArray.map((prayer, index) => {
          return (
            <tr
              key={prayer.label}
              className="
              text-center
              [&>*]:p-4
              md:[&>*]:p-8
              md:[&>*]:border md:[&>*]:border-b-0 [&>*]:border-mosqueBrand-primaryAlt
              md:[&>th]:w-20
              [&>th]:border-l-0
              [&>td:last-of-type]:border-r-0
              border border-mosqueBrand-primaryAlt border-l-0 border-r-0
              last-of-type:border-b-0"
            >
              <th className="text-left text-xl md:text-5xl md:text-right">
                {prayer.label}
              </th>
              <td className="text-xl md:text-6xl">
                {dtFormatTimeTo12h(prayer.data.start)}
                {prayer.data?.start_secondary ? (
                  <div className="block mt-1 md:mt-2">
                    {dtFormatTimeTo12h(prayer.data.start_secondary)}
                  </div>
                ) : null}
              </td>
              <td className={`font-bold text-xl md:text-6xl`}>
                <span
                  className={
                    nextPrayerTime.today === true &&
                    nextPrayerTime.prayerIndex === index
                      ? "underline decoration-mosqueBrand-highlight underline-offset-8"
                      : ""
                  }
                >
                  {dtFormatTimeTo12h(prayer.data.congregation_start)}
                </span>
              </td>
              {isTomorrowEnabled && (
                <td className={`text-xl md:text-6xl`}>
                  <span
                    className={
                      nextPrayerTime.today === false &&
                      nextPrayerTime.prayerIndex === index
                        ? "underline decoration-mosqueBrand-highlight underline-offset-8"
                        : ""
                    }
                  >
                    {dtFormatTimeTo12h(prayer.tomorrow.congregation_start)}
                  </span>
                </td>
              )}
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}
