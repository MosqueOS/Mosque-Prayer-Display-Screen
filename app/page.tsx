import Clock from "@/components/Clock/Clock"
import Date from "@/components/Date/Date"
import Metadata from "@/components/Metadata/Metadata"
import Notice from "@/components/Notice/Notice"
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
import { MosqueMetadata } from "@/types/MosqueDataType"

export const revalidate = 300

export default async function Home() {
  const today: DailyPrayerTime = await getPrayerTimesForToday()
  const tomorrow: DailyPrayerTime = await getPrayerTimesForTomorrow()
  const jummahTimes: JummahTimes = await getJummahTimes()
  const metadata: MosqueMetadata = await getMetaData()

  return (
    <main className="md:p-5">
      <div className="md:grid md:grid-cols-8">
        <div className="md:col-span-3">
          {/*  <div className="p-4 md:mt-2 md:p-0 md:absolute md:left-1/2 md:-translate-x-1/2">
            <img
              className="px-3 max-w-full lg:max-w-lg max-h-16 mx-auto"
              src={metadata.logo_url}
              alt=""
            />
          </div> */}
          <div className="p-4 md:p-6">
            <Clock />
          </div>
          <div className="p-4 md:p-6">
            <Date />
          </div>
          <div className="p-4 md:p-6">
            <Metadata metadata={metadata} />
          </div>
          <div className="hidden md:p-6 md:block">
            <Notice />
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
