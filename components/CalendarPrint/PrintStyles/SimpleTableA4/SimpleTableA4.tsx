import React from "react"
import { cn } from "@/lib/utils";
import { CalendarPrintComponentProps, CalendarPrintMonthlyPrayerTimes } from "@/types/CalendarPrintType";
import { DailyPrayerTime } from "@/types/DailyPrayerTimeType";
import { MosqueMetadataType } from "@/types/MosqueDataType";
import moment from "moment-hijri"

export default function SimpleTableA4({ year, monthly_prayer_times, metadata }: CalendarPrintComponentProps) {

  return (
    <div className="w-full min-w-[750px]">
      {monthly_prayer_times.map((monthly_prayer_time) => (
        <CalendarPage key={monthly_prayer_time.month} monthly_prayer_times={monthly_prayer_time} year={year} metadata={metadata} />
      ))}
    </div>
  )
}

function CalendarPage({ year, monthly_prayer_times, metadata }: { year: string, monthly_prayer_times: CalendarPrintMonthlyPrayerTimes, metadata: MosqueMetadataType }) {
  const month = monthly_prayer_times.month
  const monthInt = parseInt(month)

  let backgroundColor = "bg-mosqueBrand-primary/90"
  if (monthInt % 2 === 0) {
    backgroundColor = "bg-mosqueBrand-primaryAlt/90"
  } else if (monthInt % 2 === 1) {
    backgroundColor = "bg-mosqueBrand-primary/90"
  }

  return (
    <div className={cn("print-page page-break a4-portrait flex flex-col justify-start w-full items-center ", backgroundColor)}>
      <CalendarHeader metadata={metadata} year={year} month={monthly_prayer_times.month_label} monthly_prayer_times={monthly_prayer_times} />
      <CalendarTable monthly_prayer_times={monthly_prayer_times} year={year} />
      <CalendarFooter metadata={metadata} />
    </div>
  )
}

function CalendarTable({ monthly_prayer_times, year }: { monthly_prayer_times: CalendarPrintMonthlyPrayerTimes, year: string }) {
  const englishDate = moment(`${year}-${monthly_prayer_times.month_label}`, "YYYY-MMMM")
  const hijriDate = moment(`${year}-${monthly_prayer_times.month_label}`, "YYYY-MMMM").locale("en")
  
  const isAsrMithl2 = monthly_prayer_times.prayer_times.some((prayer_time) => prayer_time.asr.start_secondary)

  const classNamesFirstHeader = "font-bold text-center align-middle font-semibold"
  const classNamesSecondHeader = "text-sm font-semibold text-center align-middle font-semibold"

  return (
    <div className="w-full bg-white">
      <table className="w-full table-auto bg-mosqueBrand-primary/20">
        <thead className="font-semibold">
          <tr className="h-8 border-y-2 border-mosqueBrand-primary">
            <th colSpan={2} className={cn(classNamesFirstHeader)}></th>
            <th colSpan={3} className={cn(classNamesFirstHeader)}>Fajr</th>
            <th colSpan={2} className={cn(classNamesFirstHeader)}>Zuhr</th>
            <th colSpan={isAsrMithl2 ? 3 : 2} className={cn(classNamesFirstHeader)}>Asr</th>
            <th colSpan={2} className={cn(classNamesFirstHeader)}>Maghrib</th>
            <th colSpan={2} className={cn(classNamesFirstHeader)}>Isha</th>
          </tr>
          <tr className="h-6 border-y-2 border-mosqueBrand-primary">
            <th className={classNamesSecondHeader}></th>
            <th className={classNamesSecondHeader}></th>
            {[
              { label: "Begins", show: true },
              { label: "Jamāʿah", show: true },
              { label: "Sunrise", show: true },
              { label: "Begins", show: true },
              { label: "Jamāʿah", show: true },
              ...(
                isAsrMithl2
                  ? [
                      { label: "Asr Mithl 1", show: true },
                      { label: "Asr Mithl 2", show: true }
                    ]
                  : [
                      { label: "Begins", show: true }
                    ]
              ),
              { label: "Jamāʿah", show: true },
              { label: "Begins", show: true },
              { label: "Jamāʿah", show: true },
              { label: "Begins", show: true },
              { label: "Jamāʿah", show: true },
            ]
              .filter(col => col.show)
              .map((col, idx) => (
                <th key={idx} className={cn(classNamesSecondHeader, col.label === "Jamāʿah" ? "bg-mosqueBrand-highlight/50" : "")}>
                  {col.label}
                </th>
              ))}
          </tr>
        </thead>
        <tbody>
          {monthly_prayer_times.prayer_times.map((prayer_time, index) => (
            <CalendarRow key={index} prayer_time={prayer_time} year={year} />
          ))}
        </tbody>
      </table>
    </div>
  )
}

function CalendarRow({ prayer_time, year }: { prayer_time: DailyPrayerTime, year: string }) {
  // Build the base Gregorian date
  let englishDate = moment(
    `${year}-${prayer_time.month_label}-${prayer_time.day_of_month}`,
    "YYYY-MMMM-DD"
  );

  // If your data always has 29 Feb, fix invalid dates by offsetting from the 1st
  if (!englishDate.isValid()) {
    englishDate = moment(
      `${year}-${prayer_time.month_label}-01`,
      "YYYY-MMMM-DD"
    ).add(Number(prayer_time.day_of_month) - 1, "day");
  }

  const dayFormatted = englishDate.format("ddd");
  const isAsrMithl2 = prayer_time.asr.start_secondary !== undefined && prayer_time.asr.start_secondary !== ""
  const isFriday = dayFormatted === "Fri"

  const defaultClassNames = `text-center text-lg ${isFriday ? "font-semibold border-b-2 border-mosqueBrand-primary" : ""}`
  const congregationClassNames = `text-lg text-center bg-mosqueBrand-highlight/50 ${isFriday ? "font-semibold border-b-2 border-mosqueBrand-primary" : ""}`

  return (
    <tr
      key={prayer_time.day_of_month}
      
    >
      <td className={defaultClassNames}>{dayFormatted}</td>
      <td className={cn(defaultClassNames, "border-r-2 border-mosqueBrand-primary")}>{prayer_time.day_of_month}</td>
      <td className={defaultClassNames}>{prayer_time.fajr.start}</td>
      <td className={congregationClassNames}>{prayer_time.fajr.congregation_start}</td>
      <td className={cn(defaultClassNames, "border-r-2 border-mosqueBrand-primary")}>{prayer_time.sunrise_start}</td>
      <td className={defaultClassNames}>{prayer_time.zuhr.start}</td>
      <td className={cn(congregationClassNames, "border-r-2 border-mosqueBrand-primary")}>{prayer_time.zuhr.congregation_start}</td>
      <td className={defaultClassNames}>{prayer_time.asr.start}</td>
      {isAsrMithl2 && <td className={defaultClassNames}>{prayer_time.asr.start_secondary}</td>}
      <td className={cn(congregationClassNames, "border-r-2 border-mosqueBrand-primary")}>{prayer_time.asr.congregation_start}</td>
      <td className={defaultClassNames}>{prayer_time.maghrib.start}</td>
      <td className={cn(congregationClassNames, "border-r-2 border-mosqueBrand-primary")}>{prayer_time.maghrib.congregation_start}</td>
      <td className={defaultClassNames}>{prayer_time.isha.start}</td>
      <td className={cn(congregationClassNames, "")}>{prayer_time.isha.congregation_start}</td>
    </tr>
  );
}

function CalendarHeader({ metadata, year, month, monthly_prayer_times }: { metadata: MosqueMetadataType, year: string, month: string, monthly_prayer_times: CalendarPrintMonthlyPrayerTimes }) {
  const start = moment(`${year}-${month}-01`, "YYYY-MM-DD").locale("en")


  return (
    <div className="flex flex-col justify-center items-center w-full gap-2">
      <div className="text-mosqueBrand-onPrimary flex flex-row justify-between items-center w-full px-2 pb-2">
        <h2 className="text-3xl uppercase font-bold text-left flex-1 whitespace-nowrap">{month} {year}</h2>
        <h2 className="text-xl font-semibold text-right">{metadata.name}</h2>
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