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
    <dl className="grid grid-flow-col text-center gap-0 md:gap-3 md:grid-cols-1 md:grid-flow-row">
      <div className="md:grid md:grid-cols-2 md:gap-3">
        <div className="bg-mosqueGreen-dark text-white p-4 md:p-6">
          <dt className="text-sm md:text-2xl font-medium">Sunrise</dt>
          <dd className="mt-1 text-xl md:text-5xl font-bold tracking-tight">
            {sunrise}
          </dd>
        </div>
        <div className="bg-mosqueGreen-dark text-white p-4 md:p-6">
          <dt className="text-sm md:text-2xl font-medium">Zawaal</dt>
          <dd className="mt-1 text-xl md:text-5xl font-bold tracking-tight ">
            {zawaal}
          </dd>
        </div>
      </div>
      <div className="bg-mosqueGreen-dark text-white p-4 md:p-6">
        <dt className="text-sm md:text-2xl font-medium">Jummah</dt>
        <dd className="mt-1 text-xl md:text-5xl font-bold tracking-tight ">
          {jummah}
        </dd>
      </div>
    </dl>
  )
}
