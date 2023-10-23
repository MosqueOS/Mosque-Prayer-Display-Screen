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
  return (
    <div className="mt-10 px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold leading-6 text-gray-900">
            Prayer times for {metadata.name}
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
                    className="sticky top-0 z-10 border-b border-gray-300 bg-white bg-opacity-75 py-3.5 pl-4 pr-3 text-center text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter"
                  >
                    Date
                  </th>
                  <th
                    scope="col"
                    className="sticky top-0 z-10 border-b border-gray-300 bg-white bg-opacity-75 px-3 py-3.5 text-center text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter sm:table-cell"
                  >
                    Fajr starts
                  </th>
                  <th
                    scope="col"
                    className="sticky top-0 z-10 border-b border-gray-300 bg-white bg-opacity-75 px-3 py-3.5 text-center text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter sm:table-cell"
                  >
                    Fajr jama&apos;ah
                  </th>
                  <th
                    scope="col"
                    className="sticky top-0 z-10 border-b border-gray-300 bg-white bg-opacity-75 px-3 py-3.5 text-center text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter lg:table-cell"
                  >
                    Sunrise
                  </th>
                  <th
                    scope="col"
                    className="sticky top-0 z-10 border-b border-gray-300 bg-white bg-opacity-75 px-3 py-3.5 text-center text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter sm:table-cell"
                  >
                    Zuhr starts
                  </th>
                  <th
                    scope="col"
                    className="sticky top-0 z-10 border-b border-gray-300 bg-white bg-opacity-75 px-3 py-3.5 text-center text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter sm:table-cell"
                  >
                    Zuhr jama&apos;ah
                  </th>
                  <th
                    scope="col"
                    className="sticky top-0 z-10 border-b border-gray-300 bg-white bg-opacity-75 px-3 py-3.5 text-center text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter sm:table-cell"
                  >
                    Asr starts
                  </th>
                  <th
                    scope="col"
                    className="sticky top-0 z-10 border-b border-gray-300 bg-white bg-opacity-75 px-3 py-3.5 text-center text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter sm:table-cell"
                  >
                    Asr jama&apos;ah
                  </th>
                  <th
                    scope="col"
                    className="sticky top-0 z-10 border-b border-gray-300 bg-white bg-opacity-75 px-3 py-3.5 text-center text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter sm:table-cell"
                  >
                    Maghrib starts
                  </th>
                  <th
                    scope="col"
                    className="sticky top-0 z-10 border-b border-gray-300 bg-white bg-opacity-75 px-3 py-3.5 text-center text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter sm:table-cell"
                  >
                    Maghrib jama&apos;ah
                  </th>
                  <th
                    scope="col"
                    className="sticky top-0 z-10 border-b border-gray-300 bg-white bg-opacity-75 px-3 py-3.5 text-center text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter sm:table-cell"
                  >
                    Isha starts
                  </th>
                  <th
                    scope="col"
                    className="sticky top-0 z-10 border-b border-gray-300 bg-white bg-opacity-75 px-3 py-3.5 text-center text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter sm:table-cell"
                  >
                    Isha jama&apos;ah
                  </th>
                </tr>
              </thead>
              <tbody>
                {prayerTimes.map((prayerTime, prayerTimeIdx) => (
                  <tr key={prayerTimeIdx}>
                    <td
                      className={classNames(
                        prayerTimeIdx !== prayerTimes.length - 1
                          ? "border-b border-gray-200"
                          : "",
                        "whitespace-nowrap p-2 text-center text-sm font-medium text-gray-900",
                      )}
                    >
                      {prayerTime.day_of_month} {prayerTime.month_label}
                    </td>
                    <td
                      className={classNames(
                        prayerTimeIdx !== prayerTimes.length - 1
                          ? "border-b border-gray-200"
                          : "",
                        "whitespace-nowrap p-2 text-center text-sm font-medium text-gray-900",
                      )}
                    >
                      {moment(prayerTime.fajr.start, ["HH:mm"]).format(
                        "h:mm a",
                      )}
                    </td>
                    <td
                      className={classNames(
                        prayerTimeIdx !== prayerTimes.length - 1
                          ? "border-b border-gray-200"
                          : "",
                        "whitespace-nowrap p-2 text-center text-sm font-medium text-gray-900",
                      )}
                    >
                      {moment(prayerTime.fajr.congregation_start, [
                        "HH:mm",
                      ]).format("h:mm a")}
                    </td>
                    <td
                      className={classNames(
                        prayerTimeIdx !== prayerTimes.length - 1
                          ? "border-b border-gray-200"
                          : "",
                        "whitespace-nowrap p-2 text-center text-sm font-medium text-gray-900",
                      )}
                    >
                      {moment(prayerTime.sunrise_start, ["HH:mm"]).format(
                        "h:mm a",
                      )}
                    </td>
                    <td
                      className={classNames(
                        prayerTimeIdx !== prayerTimes.length - 1
                          ? "border-b border-gray-200"
                          : "",
                        "whitespace-nowrap p-2 text-center text-sm font-medium text-gray-900",
                      )}
                    >
                      {moment(prayerTime.zuhr.start, ["HH:mm"]).format(
                        "h:mm a",
                      )}
                    </td>
                    <td
                      className={classNames(
                        prayerTimeIdx !== prayerTimes.length - 1
                          ? "border-b border-gray-200"
                          : "",
                        "whitespace-nowrap p-2 text-center text-sm font-medium text-gray-900",
                      )}
                    >
                      {moment(prayerTime.zuhr.congregation_start, [
                        "HH:mm",
                      ]).format("h:mm a")}
                    </td>
                    <td
                      className={classNames(
                        prayerTimeIdx !== prayerTimes.length - 1
                          ? "border-b border-gray-200"
                          : "",
                        "whitespace-nowrap p-2 text-center text-sm font-medium text-gray-900",
                      )}
                    >
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
                    </td>
                    <td
                      className={classNames(
                        prayerTimeIdx !== prayerTimes.length - 1
                          ? "border-b border-gray-200"
                          : "",
                        "whitespace-nowrap p-2 text-center text-sm font-medium text-gray-900",
                      )}
                    >
                      {moment(prayerTime.asr.congregation_start, [
                        "HH:mm",
                      ]).format("h:mm a")}
                    </td>
                    <td
                      className={classNames(
                        prayerTimeIdx !== prayerTimes.length - 1
                          ? "border-b border-gray-200"
                          : "",
                        "whitespace-nowrap p-2 text-center text-sm font-medium text-gray-900",
                      )}
                    >
                      {moment(prayerTime.maghrib.start, ["HH:mm"]).format(
                        "h:mm a",
                      )}
                    </td>
                    <td
                      className={classNames(
                        prayerTimeIdx !== prayerTimes.length - 1
                          ? "border-b border-gray-200"
                          : "",
                        "whitespace-nowrap p-2 text-center text-sm font-medium text-gray-900",
                      )}
                    >
                      {moment(prayerTime.maghrib.congregation_start, [
                        "HH:mm",
                      ]).format("h:mm a")}{" "}
                    </td>
                    <td
                      className={classNames(
                        prayerTimeIdx !== prayerTimes.length - 1
                          ? "border-b border-gray-200"
                          : "",
                        "whitespace-nowrap p-2 text-center text-sm font-medium text-gray-900",
                      )}
                    >
                      {moment(prayerTime.isha.start, ["HH:mm"]).format(
                        "h:mm a",
                      )}
                    </td>
                    <td
                      className={classNames(
                        prayerTimeIdx !== prayerTimes.length - 1
                          ? "border-b border-gray-200"
                          : "",
                        "whitespace-nowrap p-2 text-center text-sm font-medium text-gray-900",
                      )}
                    >
                      {moment(prayerTime.isha.congregation_start, [
                        "HH:mm",
                      ]).format("h:mm a")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
