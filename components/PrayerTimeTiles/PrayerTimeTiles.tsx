export default function PrayerTimeTiles({
  sunrise,
  zawaal,
  jummah,
}: {
  sunrise: string
  zawaal: string
  jummah: string
}) {
  return (
    <dl className="grid grid-flow-col gap-0 text-center">
      <div className="bg-mosqueGreen-dark text-white p-4">
        <dt className="text-sm font-medium">Sunrise</dt>
        <dd className="mt-1 text-xl font-semibold tracking-tight ">
          {sunrise}
        </dd>
      </div>
      <div className="bg-mosqueGreen-dark text-white p-4">
        <dt className="text-sm font-medium">Zawaal</dt>
        <dd className="mt-1 text-xl font-semibold tracking-tight ">{zawaal}</dd>
      </div>
      <div className="bg-mosqueGreen-dark text-white p-4">
        <dt className="text-sm font-medium">Jummah</dt>
        <dd className="mt-1 text-xl font-semibold tracking-tight ">{jummah}</dd>
      </div>
    </dl>
  )
}
