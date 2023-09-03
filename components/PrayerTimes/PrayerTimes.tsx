export default function PrayerTimes() {
  return (
    <table className="text-white mx-auto table-auto border-collapse border-none w-full">
      <thead>
        <tr
          className="text-center [&>*]:p-2
          md:[&>*]:border [&>*]:border-mosqueGreen-dark
          [&>th]:border-t-0 [&>th:last-of-type]:border-r-0"
        >
          <th className="sr-only">Prayer time</th>
          <th>Begins</th>
          <th>Jama&apos;ah</th>
          <th className="hidden md:table-cell">Tomorrow</th>
        </tr>
      </thead>
      <tbody>
        {["Fajr", "Zuhr", "Asr", "Maghrib", "Isha"].map((prayer) => (
          <tr
            key={prayer}
            className="
              text-center
              [&>*]:p-4
              md:[&>*]:border md:[&>*]:border-b-0 [&>*]:border-mosqueGreen-dark
              [&>th]:border-l-0 [&>th]:text-xl
              [&>td:last-of-type]:border-r-0
              border border-mosqueGreen-dark border-l-0 border-r-0
              last-of-type:border-b-0"
          >
            <th className="text-left text-2xl md:text-right">{prayer}</th>
            <td className="text-2xl">6:25</td>
            <td className="font-bold text-2xl">12:55</td>
            <td className="text-2xl hidden md:table-cell">6:55</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
