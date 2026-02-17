import { JummahTimes } from "@/types/JummahTimesType"
import { dtFormatTimeTo12h } from "@/lib/datetimeUtils"

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
      <div className="bg-mosqueBrand-primaryAlt text-white p-4 lg:p-6 lg:col-auto">
        <dt className="text-sm lg:text-2xl font-medium">Sunrise</dt>
        <dd className="mt-1 text-xl lg:text-5xl font-bold tracking-tight">
          {dtFormatTimeTo12h(sunrise)}
        </dd>
      </div>

      {jummahTimes.map((jummahTime, index) => (
        <div
          className="bg-mosqueBrand-primaryAlt text-white p-4 lg:p-6 lg:col-auto"
          key={index}
        >
          <dt className="text-sm lg:text-2xl font-medium">
            {jummahTime.label}
          </dt>
          <dd className="mt-1 text-xl lg:text-5xl font-bold tracking-tight">
            {dtFormatTimeTo12h(jummahTime.time)}
          </dd>
        </div>
      ))}
    </dl>
  )
}
