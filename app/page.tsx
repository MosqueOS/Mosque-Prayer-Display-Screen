import Clock from "@/components/Clock/Clock";
import Date from "@/components/Date/Date";
import PrayerTimeTiles from "@/components/PrayerTimeTiles/PrayerTimeTiles";
import PrayerTimes from "@/components/PrayerTimes/PrayerTimes";

export default function Home() {
  return (
    <main className="bg-mosqueGreen min-h-screen">
      <div className="p-4">
        <Clock />
      </div>
      <div className="p-4">
        <Date />
      </div>
      <div className="p-4">
        <PrayerTimes />
      </div>
      <div className="p-4">
        <PrayerTimeTiles />
      </div>
    </main>
  );
}
