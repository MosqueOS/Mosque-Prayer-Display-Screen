import moment from "moment"

export default function PrayerTimeTiles({
  sunrise,
  zawaal,
  jummah,
}: {
  sunrise: string
  zawaal: string
  jummah: string[]
}) {
  return (
    <dl className="grid grid-flow-row-dense md:grid-cols-7 text-center gap-0 md:gap-3">
      <div className="bg-mosqueGreen-dark text-white p-4 md:p-6 md:col-auto">
        <dt className="text-sm md:text-2xl font-medium">Sunrise</dt>
        <dd className="mt-1 text-xl md:text-5xl font-bold tracking-tight">
          {moment(sunrise, ["HH:mm"]).format("h:mm")}
        </dd>
      </div>
      <div className="bg-mosqueGreen-dark text-white p-4 md:p-6 md:col-auto">
        <dt className="text-sm md:text-2xl font-medium">Zawaal</dt>
        <dd className="mt-1 text-xl md:text-5xl font-bold tracking-tight ">
          {moment(zawaal, ["HH:mm"]).format("h:mm")}
        </dd>
      </div>
      <div className="bg-mosqueGreen-dark text-white p-4 md:p-6 md:col-span-5 grid md:grid-flow-col gap-3">
        {jummah.map((khutbah, index) => (
          <div key={index}>
            <dt className="text-sm md:text-2xl font-medium">
              Jummah {index + 1}
            </dt>
            <dd className="mt-1 text-xl md:text-5xl font-bold tracking-tight">
              {moment(khutbah, ["HH:mm"]).format("h:mm")}
            </dd>
          </div>
        ))}
      </div>
    </dl>
  )
}
