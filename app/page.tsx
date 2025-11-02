import Blackout from "@/components/Blackout/Blackout"
import Clock from "@/components/Clock/Clock"
import Date from "@/components/Date/Date"
import MosqueMetadata from "@/components/MosqueMetadata/MosqueMetadata"
import Notice from "@/components/Notice/Notice"
import SunriseJummahTiles from "@/components/SunriseJummahTiles/SunriseJummahTiles"
import PrayerTimes from "@/components/PrayerTimes/PrayerTimes"
import ServiceWorker from "@/components/ServiceWorker/ServiceWorker"
import SlidingBanner from "@/components/SlidingBanner/SlidingBanner"
import {
  getJummahTimes,
  getMetaData,
  getPrayerTimesForUpcomingDays,
  getPrayerTimesForToday,
  getPrayerTimesForTomorrow,
} from "@/services/MosqueDataService"
import type {
  DailyPrayerTime,
  UpcomingPrayerTimes,
} from "@/types/DailyPrayerTimeType"
import type { JummahTimes } from "@/types/JummahTimesType"
import type { MosqueMetadataType } from "@/types/MosqueDataType"
import type { Metadata } from "next"
import UpcomingPrayerDayTiles from "@/components/UpcomingPrayerDayTiles/UpcomingPrayerDayTiles"
import "./prayer-times.css"

export async function generateMetadata(): Promise<Metadata> {
  const mosqueMetadata: MosqueMetadataType = await getMetaData()

  return {
    title: `${mosqueMetadata.name} Prayer Times | MosqueScreen Project by MosqueOS`,
    description: `${mosqueMetadata.address} | ${mosqueMetadata.name} | MosqueScreen Project by MosqueOS`,
  }
}

export default async function Home() {
  const today: DailyPrayerTime = await getPrayerTimesForToday()
  const tomorrow: DailyPrayerTime = await getPrayerTimesForTomorrow()
  const jummahTimes: JummahTimes = await getJummahTimes()
  const mosqueMetadata: MosqueMetadataType = await getMetaData()
  const upcomingPrayerDays: UpcomingPrayerTimes[] =
    await getPrayerTimesForUpcomingDays()

  let slides = [
    <SunriseJummahTiles
      sunrise={today.sunrise_start}
      jummahTimes={jummahTimes}
      key={"sunrise_jummah_times"}
    />,
  ]

  upcomingPrayerDays.forEach((times) => {
    slides.push(<UpcomingPrayerDayTiles times={times} />)
  })

  return (
    <div className="bg-mosqueBrand min-h-screen min-w-full">
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
          <SlidingBanner slides={slides} />
        </div>
        <ServiceWorker />
      </main>
      <Blackout prayerTimeToday={today} />
    </div>
  )
}
