import Clock from "@/components/Clock/Clock"
import Date from "@/components/Date/Date"
import PrayerTimeTiles from "@/components/PrayerTimeTiles/PrayerTimeTiles"
import PrayerTimes from "@/components/PrayerTimes/PrayerTimes"
import {
  getPrayerTimesForToday,
  getPrayerTimesForTomorrow,
} from "@/services/ApiService"
import { DailyPrayerTime } from "@/types/DailyPrayerTimeType"

export default async function Home() {
  const today: DailyPrayerTime = await getPrayerTimesForToday()
  const tomorrow: DailyPrayerTime = await getPrayerTimesForTomorrow()

  return (
    <main className="bg-mosqueGreen min-h-screen">
      <div className="p-4">
        <Clock />
      </div>
      <div className="p-4">
        <Date />
      </div>
      <div className="p-4">
        <PrayerTimes today={today} tomorrow={tomorrow} />
      </div>
      <div className="p-4">
        <PrayerTimeTiles
          sunrise={today.sunrise_start}
          zawaal={"N/A"}
          jummah={"N/A"}
        />
      </div>
    </main>
  )
}
