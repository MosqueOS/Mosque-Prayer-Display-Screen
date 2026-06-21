import { UpcomingPrayerTimes } from "@/types/DailyPrayerTimeType"
import { dtFormatTimeTo12h } from "@/lib/datetimeUtils"
import { InfoTile } from "@/components/ui/mosque-screen/InfoTile"

export default function UpcomingPrayerDayTiles({
  times,
}: {
  times: UpcomingPrayerTimes
}) {
  return (
    <dl
      className={`grid justify-items-stretch lg:grid-cols-6 text-center gap-0 md:gap-3`}
    >
      <InfoTile label="Jama'ah times for">{times.display_date}</InfoTile>

      <InfoTile label={`Fajr (${times.display_day_label})`}>
        {dtFormatTimeTo12h(times.fajr.congregation_start)}
      </InfoTile>

      <InfoTile label={`Zuhr (${times.display_day_label})`}>
        {dtFormatTimeTo12h(times.zuhr.congregation_start)}
      </InfoTile>

      <InfoTile label={`Asr (${times.display_day_label})`}>
        {dtFormatTimeTo12h(times.asr.congregation_start)}
      </InfoTile>

      <InfoTile label={`Maghrib (${times.display_day_label})`}>
        {dtFormatTimeTo12h(times.maghrib.congregation_start)}
      </InfoTile>

      <InfoTile label={`Isha (${times.display_day_label})`}>
        {dtFormatTimeTo12h(times.isha.congregation_start)}
      </InfoTile>
    </dl>
  )
}
