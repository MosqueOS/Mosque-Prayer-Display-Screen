import { UpcomingPrayerTimes } from "@/types/DailyPrayerTimeType"
import moment from "moment"

export default function UpcomingPrayerDayTiles({
  times,
}: {
  times: UpcomingPrayerTimes
}) {
  return (
    <dl
      className={`grid justify-items-stretch lg:grid-cols-6 text-center gap-0 md:gap-3`}
    >
      <div className="bg-mosqueGreen-dark text-white p-4 lg:p-6 lg:col-auto">
        <dt className="text-sm lg:text-2xl font-medium">
          Jama&apos;ah times for
        </dt>
        <dd className="mt-2 text-xl lg:text-3xl font-bold tracking-tight">
          {times.display_date}
        </dd>
      </div>
      <div className="bg-mosqueGreen-dark text-white p-4 lg:p-6 lg:col-auto">
        <dt className="text-sm lg:text-2xl font-medium">Fajr</dt>
        <dd className="mt-2 text-xl lg:text-3xl font-bold tracking-tight">
          {moment(times.fajr.congregation_start, ["HH:mm"]).format("h:mm")}
        </dd>
      </div>
      <div className="bg-mosqueGreen-dark text-white p-4 lg:p-6 lg:col-auto">
        <dt className="text-sm lg:text-2xl font-medium">Zuhr</dt>
        <dd className="mt-2 text-xl lg:text-3xl font-bold tracking-tight">
          {moment(times.zuhr.congregation_start, ["HH:mm"]).format("h:mm")}
        </dd>
      </div>
      <div className="bg-mosqueGreen-dark text-white p-4 lg:p-6 lg:col-auto">
        <dt className="text-sm lg:text-2xl font-medium">Asr</dt>
        <dd className="mt-2 text-xl lg:text-3xl font-bold tracking-tight">
          {moment(times.asr.congregation_start, ["HH:mm"]).format("h:mm")}
        </dd>
      </div>
      <div className="bg-mosqueGreen-dark text-white p-4 lg:p-6 lg:col-auto">
        <dt className="text-sm lg:text-2xl font-medium">Maghrib</dt>
        <dd className="mt-2 text-xl lg:text-3xl font-bold tracking-tight">
          {moment(times.maghrib.congregation_start, ["HH:mm"]).format("h:mm")}
        </dd>
      </div>
      <div className="bg-mosqueGreen-dark text-white p-4 lg:p-6 lg:col-auto">
        <dt className="text-sm lg:text-2xl font-medium">Isha</dt>
        <dd className="mt-2 text-xl lg:text-3xl font-bold tracking-tight">
          {moment(times.isha.congregation_start, ["HH:mm"]).format("h:mm")}
        </dd>
      </div>
    </dl>
  )
}
