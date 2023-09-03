export default function PrayerTimeTiles() {
  return (
    <dl className="grid grid-flow-col gap-0 text-center">
      <div className="bg-mosqueGreen-dark text-white p-4">
        <dt className="text-sm font-medium">Sunrise</dt>
        <dd className="mt-1 text-xl font-semibold tracking-tight ">8:00</dd>
      </div>
      <div className="bg-mosqueGreen-dark text-white p-4">
        <dt className="text-sm font-medium">Zawaal</dt>
        <dd className="mt-1 text-xl font-semibold tracking-tight ">12:30</dd>
      </div>
      <div className="bg-mosqueGreen-dark text-white p-4">
        <dt className="text-sm font-medium">Jummah</dt>
        <dd className="mt-1 text-xl font-semibold tracking-tight ">1:30</dd>
      </div>
    </dl>
  );
}
