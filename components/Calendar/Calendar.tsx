import { DailyPrayerTime } from "@/types/DailyPrayerTimeType"
import { MosqueMetadataType } from "@/types/MosqueDataType"
import moment from "moment"

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
  const today = moment().format("D MMMM")
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
    <div className="mt-10 px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-semibold leading-6 text-gray-900">
            {metadata.name} Prayer Times
          </h1>
          <p className="mt-2 text-sm text-gray-700">{metadata.address}</p>
        </div>
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
                    moment(prayerTime.fajr.start, ["HH:mm"]).format("h:mm a"),
                    moment(prayerTime.fajr.congregation_start, [
                      "HH:mm",
                    ]).format("h:mm a"),

                    moment(prayerTime.sunrise_start, ["HH:mm"]).format(
                      "h:mm a",
                    ),

                    moment(prayerTime.zuhr.start, ["HH:mm"]).format("h:mm a"),
                    moment(prayerTime.zuhr.congregation_start, [
                      "HH:mm",
                    ]).format("h:mm a"),

                    <>
                      <p>
                        {moment(prayerTime.asr.start, ["HH:mm"]).format(
                          "h:mm a",
                        )}
                      </p>
                      <p>
                        {moment(prayerTime.asr.start_secondary, [
                          "HH:mm",
                        ]).format("h:mm a")}
                      </p>
                    </>,
                    moment(prayerTime.asr.congregation_start, ["HH:mm"]).format(
                      "h:mm a",
                    ),

                    moment(prayerTime.maghrib.start, ["HH:mm"]).format(
                      "h:mm a",
                    ),
                    moment(prayerTime.maghrib.congregation_start, [
                      "HH:mm",
                    ]).format("h:mm a"),

                    moment(prayerTime.isha.start, ["HH:mm"]).format("h:mm a"),
                    moment(prayerTime.isha.congregation_start, [
                      "HH:mm",
                    ]).format("h:mm a"),
                  ]

                  return (
                    <>
                      {prayerTime.day_of_month === "1" ? (
                        <tr
                          className="border-t border-gray-200"
                          key={`month_${prayerTime.month_label}`}
                        >
                          <th
                            colSpan={12}
                            scope="colgroup"
                            className="bg-mosqueGreen py-2 pl-4 text-left text-sm font-semibold text-white"
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
                            ? `!bg-mosqueGreen-highlight text-white`
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
                        >
                          <a
                            href={`#${prayerTime.day_of_month}_${prayerTime.month_label}`}
                          >
                            {prayerTime.day_of_month} {prayerTime.month_label}
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
                    </>
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
