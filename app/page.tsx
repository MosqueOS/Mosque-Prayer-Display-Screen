import Clock from "@/components/Clock/Clock"
import Date from "@/components/Date/Date"
import PrayerTimeTiles from "@/components/PrayerTimeTiles/PrayerTimeTiles"
import PrayerTimes from "@/components/PrayerTimes/PrayerTimes"
import {
  getJummahTimes,
  getMetaData,
  getPrayerTimesForToday,
  getPrayerTimesForTomorrow,
} from "@/services/ApiService"
import { DailyPrayerTime } from "@/types/DailyPrayerTimeType"
import { JummahTimes } from "@/types/JummahTimesType"
import { Metadata } from "@/types/MosqueDataType"

export default async function Home() {
  const today: DailyPrayerTime = await getPrayerTimesForToday()
  const tomorrow: DailyPrayerTime = await getPrayerTimesForTomorrow()
  const jummahTimes: JummahTimes = await getJummahTimes()
  const metadata: Metadata = await getMetaData()

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
          jummahTimes={jummahTimes}
        />
      </div>
    </main>
  )
}
