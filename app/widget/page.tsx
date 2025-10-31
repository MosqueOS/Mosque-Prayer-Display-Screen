import { getPrayerTimesForToday } from "@/services/MosqueDataService"
import { DailyPrayerTime } from "@/types/DailyPrayerTimeType"
import "./widget.css"
import moment from "moment"

export default async function Widget() {
  const today: DailyPrayerTime = await getPrayerTimesForToday()

  const convertTime = (time: string) => {
    return moment(time, ["HH:mm"]).format("h:mm")
  }

  return (
    <div className="PrayerTimeWidgetWrapper">
      <table className="PrayerTimesWidget">
        <thead>
          <tr>
            <th />
            <th>Fajr</th>
            <th>Zuhr</th>
            <th>&apos;Asr</th>
            <th>Maghrib</th>
            <th>Isha</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>Begins</th>
            <td>{convertTime(today.fajr.start)}</td>
            <td>{convertTime(today.zuhr.start)}</td>
            <td>{convertTime(today.asr.start)}</td>
            <td>{convertTime(today.maghrib.start)}</td>
            <td>{convertTime(today.isha.start)}</td>
          </tr>
          <tr>
            <th>Jama&apos;ah</th>
            <td>{convertTime(today.fajr.congregation_start)}</td>
            <td>{convertTime(today.zuhr.congregation_start)}</td>
            <td>{convertTime(today.asr.congregation_start)}</td>
            <td>{convertTime(today.maghrib.congregation_start)}</td>
            <td>{convertTime(today.isha.congregation_start)}</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}
