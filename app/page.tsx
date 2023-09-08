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
    <main className="md:p-5">
      <div className="md:grid md:grid-cols-8">
        <div className="md:col-span-3">
          <div className="p-4 md:p-6">
            <Clock />
          </div>
          <div className="p-4 md:p-6">
            <Date />
          </div>
        </div>
        <div className="p-4 md:p-6 md:col-span-5">
          <PrayerTimes today={today} tomorrow={tomorrow} />
        </div>
      </div>
      <div className="p-4 md:p-6">
        <PrayerTimeTiles
          sunrise={today.sunrise_start}
          zawaal={"12:00"}
          jummah={["13:00", "13:30", "14:00"]}
        />
      </div>
    </main>
  )
}
