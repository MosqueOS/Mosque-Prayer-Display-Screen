import type {
  DailyPrayerTime,
  UpcomingPrayerTimes,
} from "@/types/DailyPrayerTimeType"
import {
  getJummahTimes,
  getMetaData,
  getPrayerTimesForToday,
  getPrayerTimesForTomorrow,
  getPrayerTimesForUpcomingDays,
} from "@/services/MosqueDataService"
import type { JummahTimes } from "@/types/JummahTimesType"
import type { MosqueMetadataType } from "@/types/MosqueDataType"
import { ConfigurationJson } from "@/types/ConfigurationType"
import SunriseJummahTiles from "@/components/SunriseJummahTiles/SunriseJummahTiles"
import UpcomingPrayerDayTiles from "@/components/UpcomingPrayerDayTiles/UpcomingPrayerDayTiles"
import Date from "@/components/Date/Date"
import PrayerTimes from "@/components/PrayerTimes/PrayerTimes"
import MosqueLogo from "@/components/MosqueMetadata/MosqueLogo"

export default async function MobileScreenLayout({
  config,
}: {
  config: ConfigurationJson
}) {
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
    slides.push(
      <UpcomingPrayerDayTiles times={times} key={times.display_date} />,
    )
  })

  return (
    <div className="bg-mosqueBrand min-h-screen min-w-full cursor-none">
      <main className="md:p-5">
        <div className="md:grid md:grid-cols-8">
          <div className="md:col-span-3">
            <div className="p-1">
              <MosqueLogo metadata={mosqueMetadata} />
            </div>
            <div className="p-1">
              <Date />
            </div>
          </div>

          <div className="p-2">
            <PrayerTimes today={today} tomorrow={tomorrow} />
          </div>
        </div>
      </main>
    </div>
  )
}
