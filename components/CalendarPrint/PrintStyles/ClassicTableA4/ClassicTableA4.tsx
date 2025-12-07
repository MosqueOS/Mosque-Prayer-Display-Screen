import React from "react"
import { cn } from "@/lib/utils";
import { CalendarDailyPrayerTime, CalendarPrintComponentProps, CalendarPrintMonthlyPrayerTimes } from "@/types/CalendarPrintType";
import { MosqueMetadataType } from "@/types/MosqueDataType";
import moment from "moment-hijri"

export default function ClassicTableA4({ year, monthly_prayer_times, metadata }: CalendarPrintComponentProps) {

  return (
    <div className="w-full min-w-[750px]">
      {monthly_prayer_times.map((monthly_prayer_time) => (
        <CalendarPage
          key={monthly_prayer_time.month}
          monthly_prayer_times={monthly_prayer_time}
          year={year}
          metadata={metadata}
        />
      ))}
    </div>
  )
}

function CalendarPage({ year, monthly_prayer_times, metadata }: { year: string, monthly_prayer_times: CalendarPrintMonthlyPrayerTimes, metadata: MosqueMetadataType }) {

  return (
    <div className="print-page page-break a4-portrait flex flex-col justify-start w-full items-center">
      <CalendarHeader
        metadata={metadata}
        year={year}
        monthly_prayer_times={monthly_prayer_times}
      />
      <CalendarTable
        monthly_prayer_times={monthly_prayer_times}
      />
      <CalendarFooter metadata={metadata} />
    </div>
  )
}

function CalendarTable({ monthly_prayer_times}: { monthly_prayer_times: CalendarPrintMonthlyPrayerTimes }) {
  if (monthly_prayer_times.prayer_times?.length === 0) {
    return (
      <p>No prayer times</p>
    )
  }

  const englishDate = moment(monthly_prayer_times.prayer_times[0].date)
  const hijriDate = moment(monthly_prayer_times.prayer_times[0].date).locale("en")

  const monthFormatted = englishDate.format("MMM")
  const hijriMonthFormatted = hijriDate.format("iMMM")

  const classNamesBeginTimes = "bg-mosqueBrand-primary/80 text-center align-middle font-semibold"
  const classNamesJamahTimes = "bg-mosqueBrand-primary/70 text-center align-middle font-semibold"

  return (
    <div className="w-full">
      <table className="w-full table-auto border-collapse">
        <thead className="font-semibold">
          <tr className="text-mosqueBrand-onPrimary">
            <th colSpan={8} className={cn(classNamesBeginTimes, "py-4 text-xl")}>Prayer Beginning Times</th>
            <th colSpan={5} className={cn(classNamesJamahTimes, "py-4 text-xl")}>Jamāʿah Times</th>
          </tr>
          <tr className="text-mosqueBrand-onPrimary font-semibold">
            <th className={classNamesBeginTimes}>{monthFormatted}</th>
            <th className={classNamesBeginTimes}>Day</th>
            <th className={classNamesBeginTimes}>{hijriMonthFormatted}.</th>
            {/* white-space: nowrap;
    word-break: keep-all;
    overflow-wrap: normal; */}
            <th className={classNamesBeginTimes}>Fajr</th>
            <th className={classNamesBeginTimes}>Sunrise</th>
            <th className={classNamesBeginTimes}>Zuhr</th>
            <th className={classNamesBeginTimes}>Asr</th>
            <th className={classNamesBeginTimes}>Isha</th>
            <th className={classNamesJamahTimes}>Fajr</th>
            <th className={classNamesJamahTimes}>Zuhr</th>
            <th className={classNamesJamahTimes}>Asr</th>
            <th className={classNamesJamahTimes}>Maghrib</th>
            <th className={classNamesJamahTimes}>Isha</th>
          </tr>
        </thead>
        <tbody>
          {monthly_prayer_times.prayer_times.map((prayer_time, index) => (
            <CalendarRow key={index} prayer_time={prayer_time}/>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function CalendarRow({ prayer_time }: { prayer_time: CalendarDailyPrayerTime }) {
  // Build the base Gregorian date
  let englishDate = moment(prayer_time.date);

  const hijriDate = englishDate.clone().locale("en");

  const dayFormatted = englishDate.format("ddd");
  let dayHijriFormatted = hijriDate.format("iD");
  const hijriMonthFormatted = hijriDate.format("iMMM"); // if you need it

  if (dayHijriFormatted === "1") {
    dayHijriFormatted = hijriMonthFormatted
  }

  return (
    <tr
      className={
        Number(prayer_time.day_of_month) % 2 === 0
          ? "bg-mosqueBrand-primary/20"
          : "bg-mosqueBrand-primary/10"
      }
    >
      <td className="text-center">{prayer_time.day_of_month}</td>
      <td className="text-center">{dayFormatted}</td>
      <td className="text-center">{dayHijriFormatted}</td>
      <td className="text-center">{prayer_time.fajr.start}</td>
      <td className="text-center">{prayer_time.sunrise_start}</td>
      <td className="text-center">{prayer_time.zuhr.start}</td>
      <td className="text-center">{prayer_time.asr.start}</td>
      {/* <td className="text-center">{prayer_time.maghrib.start}</td> */}
      <td className="text-center">{prayer_time.isha.start}</td>
      <td className="text-center">{prayer_time.fajr.congregation_start}</td>
      <td className="text-center">{prayer_time.zuhr.congregation_start}</td>
      <td className="text-center">{prayer_time.asr.congregation_start}</td>
      <td className="text-center">{prayer_time.maghrib.congregation_start}</td>
      <td className="text-center">{prayer_time.isha.congregation_start}</td>
    </tr>
  );
}

function CalendarHeader({ metadata, year, monthly_prayer_times }: { metadata: MosqueMetadataType, year: string, monthly_prayer_times: CalendarPrintMonthlyPrayerTimes }) {
  if (monthly_prayer_times.prayer_times?.length === 0) {
    return (
      <p>No prayer times</p>
    )
  }

  // Start of Gregorian month
  const start = moment(monthly_prayer_times.prayer_times[0].date).locale("en")
  // End of Gregorian month (28 or 29 Feb as appropriate)
  const end = start.clone().endOf("month").locale("en")

  const hijriStartYear = start.format("iYYYY")
  const hijriEndYear = end.format("iYYYY")
  const hijriStartMonth = start.format("iMMMM")
  const hijriEndMonth = end.format("iMMMM")

  let hijriMonthDisplay = hijriStartMonth
  if (hijriStartMonth !== hijriEndMonth) {
    if (hijriStartYear === hijriEndYear) {
      hijriMonthDisplay = `${hijriStartMonth} - ${hijriEndMonth} ${hijriStartYear}`
    } else {
      hijriMonthDisplay = `${hijriStartMonth} ${hijriStartYear} - ${hijriEndMonth} ${hijriEndYear}`
    }
  }

  return (
    <div className="flex flex-col justify-center items-center mb-4 w-full gap-2">
      <div className="bg-mosqueBrand-primary text-mosqueBrand-onPrimary flex flex-col justify-center items-center p-4 rounded-lg w-full">
        <h2 className="text-2xl font-bold">{metadata.name}</h2>
        <h2 className="text-md">{metadata.address}</h2>
      </div>

      <div className="flex flex-row justify-between items-center w-full">
        <div className="flex flex-row justify-center items-center gap-2">
          <h1 className="text-2xl font-bold">{monthly_prayer_times.month_label}</h1>
          <h1 className="text-2xl font-bold">{year}</h1>
        </div>
        <div className="flex flex-row justify-center items-center gap-2">
          <h1 className="text-2xl font-bold">{hijriMonthDisplay}</h1>
        </div>
      </div>
    </div>
  )
}

function CalendarFooter({ metadata }: { metadata: MosqueMetadataType }) {
  return (
    <div className="w-full">
      {/* <h1>{metadata.address}</h1> */}
    </div>
  )
}