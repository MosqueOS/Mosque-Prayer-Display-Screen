import { JummahTimes } from "@/types/JummahTimesType"
import { dtFormatTimeTo12h } from "@/lib/datetimeUtils"
import { InfoTile } from "@/components/ui/mosque-screen/InfoTile"

export default function SunriseJummahTiles({
  sunrise,
  jummahTimes = [],
}: {
  sunrise: string
  jummahTimes: JummahTimes
}) {
  return (
    <dl
      className={`grid justify-items-stretch lg:grid-cols-${
        jummahTimes.length + 1
      } text-center gap-0 md:gap-3`}
    >
      <InfoTile label="Sunrise">
        {dtFormatTimeTo12h(sunrise)}
      </InfoTile>

      {jummahTimes.map((jummahTime, index) => (
        <InfoTile
          label={jummahTime.label}
          // valueClassName="text-xl lg:text-5xl"
          key={index}
        >
          {dtFormatTimeTo12h(jummahTime.time)}
        </InfoTile>
      ))}
    </dl>
  )
}
