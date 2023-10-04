import Clock from "@/components/Clock/Clock"
import Date from "@/components/Date/Date"
import MosqueMetadata from "@/components/MosqueMetadata/MosqueMetadata"
import Notice from "@/components/Notice/Notice"
import PrayerTimeTiles from "@/components/PrayerTimeTiles/PrayerTimeTiles"
import PrayerTimes from "@/components/PrayerTimes/PrayerTimes"
import {
  getJummahTimes,
  getMetaData,
  getPrayerTimesForToday,
  getPrayerTimesForTomorrow,
} from "@/services/MosqueDataService"
import type { DailyPrayerTime } from "@/types/DailyPrayerTimeType"
import type { JummahTimes } from "@/types/JummahTimesType"
import type { MosqueMetadataType } from "@/types/MosqueDataType"
import type { Metadata } from "next"

// Opt out of caching for all data requests in the route segment
//export const dynamic = 'force-dynamic'
//export const revalidate = 300

export async function generateMetadata(): Promise<Metadata> {
  const mosqueMetadata: MosqueMetadataType = await getMetaData()

  return {
    title: `Prayer times for ${mosqueMetadata.name} | MosqueScreen Project by MosqueOS`,
    description: `${mosqueMetadata.address} | ${mosqueMetadata.name} | MosqueScreen Project by MosqueOS`,
  }
}

export default async function Home() {
  const today: DailyPrayerTime = await getPrayerTimesForToday()
  const tomorrow: DailyPrayerTime = await getPrayerTimesForTomorrow()
  const jummahTimes: JummahTimes = await getJummahTimes()
  const mosqueMetadata: MosqueMetadataType = await getMetaData()

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
          <div className="p-4 md:p-6">
            <MosqueMetadata metadata={mosqueMetadata} />
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
