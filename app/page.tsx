import Clock from "@/components/Clock/Clock";
import Date from "@/components/Date/Date";

export default function Home() {
  return (
    <main className="bg-mosqueGreen h-screen">
      <div className="p-4">
        <Clock />
      </div>
      <div className="p-4">
        <Date />
      </div>
    </main>
  );
}
