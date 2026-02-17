import { DailyPrayerTime } from "@/types/DailyPrayerTimeType"
import { MosqueMetadataType } from "@/types/MosqueDataType"
import React, { Fragment } from "react"
import Link from "next/link"
import {
  dtLocale,
  dtNowLocaleCustomFormat,
  dtFormatTimeTo12hAmPm,
} from "@/lib/datetimeUtils"

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ")
}

export default function Calendar({
  prayerTimes,
  metadata,
}: {
  prayerTimes: DailyPrayerTime[]
  metadata: MosqueMetadataType
}) {
  const today = dtNowLocaleCustomFormat("D MMMM")
  const headers = [
    "Fajr Starts",
    "Fajr Jama'ah",
    "Sunrise",
    "Zuhr Starts",
    "Zuhr Jama'ah",
    "Asr Starts",
    "Asr Jama'ah",
    "Maghrib Starts",
    "Maghrib Jama'ah",
    "Isha Starts",
    "Isha Jama'ah",
  ]

  return (
    <div className="py-10 px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-semibold leading-6 text-gray-900">
            {metadata.name} Prayer Times
          </h1>
          <p className="mt-2 text-sm text-gray-700">{metadata.address}</p>
        </div>
        <nav className="mt-4 sm:mt-0 flex gap-2 sm:gap-4">
          <Link
            href="/calendar-prints"
            className="inline-block px-4 py-2 rounded-md bg-mosqueBrand-primary text-mosqueBrand-onPrimary hover:bg-mosqueBrand-primary/90 focus:outline-none focus:bg-mosqueBrand-primary/80 transition"
          >
            Print Calendar
          </Link>
        </nav>
      </div>
      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle">
            <table className="min-w-full border-separate border-spacing-0">
              <thead>
                <tr>
                  <th
                    scope="col"
                    className="sticky top-0 z-10 border-b border-gray-300 bg-white bg-opacity-75 py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter"
                    key={`header_date`}
                  >
                    Date
                  </th>
                  <th
                    scope="col"
                    className="sticky top-0 z-10 border-b border-gray-300 bg-white bg-opacity-75 py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter"
                    key={`header_day`}
                  >
                    Day
                  </th>

                  {headers.map((header, i) => (
                    <th
                      scope="col"
                      className="sticky top-0 z-10 border-b border-gray-300 bg-white bg-opacity-75 px-3 py-3.5 text-center text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter sm:table-cell"
                      key={`header_${i}`}
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {prayerTimes.map((prayerTime, prayerTimeIdx) => {
                  const times = [
                    dtFormatTimeTo12hAmPm(prayerTime.fajr.start),
                    dtFormatTimeTo12hAmPm(prayerTime.fajr.congregation_start),
                    dtFormatTimeTo12hAmPm(prayerTime.sunrise_start),
                    dtFormatTimeTo12hAmPm(prayerTime.zuhr.start),
                    dtFormatTimeTo12hAmPm(prayerTime.zuhr.congregation_start),

                    <>
                      <p>
                        {dtFormatTimeTo12hAmPm(prayerTime.asr.start)}
                      </p>
                      <p>
                        {dtFormatTimeTo12hAmPm(prayerTime.asr.start_secondary)}
                      </p>
                    </>,
                    dtFormatTimeTo12hAmPm(prayerTime.asr.congregation_start),
                    dtFormatTimeTo12hAmPm(prayerTime.maghrib.start),
                    dtFormatTimeTo12hAmPm(prayerTime.maghrib.congregation_start),
                    dtFormatTimeTo12hAmPm(prayerTime.isha.start),
                    dtFormatTimeTo12hAmPm(prayerTime.isha.congregation_start),
                  ]
                  const todayDayNumAndMonth = `${prayerTime.day_of_month} ${prayerTime.month_label}`
                  const todayDayName = dtLocale(
                    `${todayDayNumAndMonth}`,
                    "D MMMM",
                  ).format("ddd")

                  return (
                    <Fragment
                      key={`prayerTime_${prayerTime.day_of_month}_${prayerTime.month_label}_fragment`}
                    >
                      {prayerTime.day_of_month === "1" ? (
                        <tr
                          className="border-t border-gray-200"
                          key={`month_${prayerTime.month_label}`}
                        >
                          <th
                            colSpan={13}
                            scope="colgroup"
                            className="bg-mosqueBrand py-2 pl-4 text-left text-sm font-semibold text-white"
                          >
                            {prayerTime.month_label}
                          </th>
                        </tr>
                      ) : null}
                      <tr
                        key={`prayerTime_${prayerTime.day_of_month}_${prayerTime.month_label}`}
                        className={`${
                          `${prayerTime.day_of_month} ${prayerTime.month_label}` ===
                          today
                            ? `!bg-mosqueBrand-highlight text-white`
                            : "text-gray-900"
                        }`}
                        id={`${prayerTime.day_of_month}_${prayerTime.month_label}`}
                      >
                        <td
                          className={classNames(
                            prayerTimeIdx !== prayerTimes.length - 1
                              ? "border-b border-gray-200"
                              : "",
                            "whitespace-nowrap pl-4 text-left text-sm font-medium",
                          )}
                          key={`prayerTime_${prayerTime.day_of_month}_${prayerTime.month_label}_date`}
                        >
                          <a
                            href={`#${prayerTime.day_of_month}_${prayerTime.month_label}`}
                          >
                            {todayDayNumAndMonth}
                          </a>
                        </td>
                        <td
                          className={classNames(
                            prayerTimeIdx !== prayerTimes.length - 1
                              ? "border-b border-gray-200"
                              : "",
                            "whitespace-nowrap pl-4 text-left text-sm font-medium",
                          )}
                          key={`prayerTime_${prayerTime.day_of_month}_${prayerTime.month_label}_day`}
                        >
                          <a
                            href={`#${prayerTime.day_of_month}_${prayerTime.month_label}_day`}
                          >
                            {todayDayName}
                          </a>
                        </td>
                        {times.map((columnData, i) => (
                          <td
                            className={classNames(
                              prayerTimeIdx !== prayerTimes.length - 1
                                ? "border-b border-gray-200"
                                : "",
                              "whitespace-nowrap p-2 text-center text-sm font-medium",
                            )}
                            key={`prayerTime_${prayerTime.day_of_month}_${prayerTime.month_label}_${i}`}
                          >
                            {columnData}
                          </td>
                        ))}
                      </tr>
                    </Fragment>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
