import { getCalendarPrintMonthlyPrayerTimesForYear } from "@/services/MosqueDataService"
import { CalendarPrintComponentProps, CalendarPrintMonthlyPrayerTimes } from "@/types/CalendarPrintType"
import { calendarPrintStyles } from "@/components/CalendarPrint/PrintStyles/CalendarPrintStyles"
import CalendarStyleSelectionCard from "@/components/CalendarPrint/CalendarStyleSelectionCard"

const year = (new Date().getFullYear()+1).toString()

const exampleData: CalendarPrintComponentProps = {
  year: year,
  monthly_prayer_times: [
    {
      month: "1",
      month_label: "January",
      prayer_times: [
        {
          day_of_month: "1",
          sunrise_start: "08:03",
          date: `${year}-01-01`,
          fajr: { start: "06:26", congregation_start: "06:56" },
          zuhr: { start: "12:09", congregation_start: "12:45" },
          asr: { start: "13:46", congregation_start: "14:45" },
          maghrib: { start: "16:05", congregation_start: "16:12" },
          isha: { start: "17:42", congregation_start: "19:30" },
          month: "1",
          month_label: "January",
        },
        {
          day_of_month: "2",
          sunrise_start: "08:03",
          date: `${year}-01-02`,
          fajr: { start: "06:26", congregation_start: "06:56" },
          zuhr: { start: "12:09", congregation_start: "12:45" },
          asr: { start: "13:46", congregation_start: "14:45" },
          maghrib: { start: "16:05", congregation_start: "16:12" },
          isha: { start: "17:42", congregation_start: "19:30" },
          month: "1",
          month_label: "January",
        },
        {
          day_of_month: "3",
          sunrise_start: "08:03",
          date: `${year}-01-03`,
          fajr: { start: "06:26", congregation_start: "06:56" },
          zuhr: { start: "12:09", congregation_start: "12:45" },
          asr: { start: "13:46", congregation_start: "14:45" },
          maghrib: { start: "16:05", congregation_start: "16:12" },
          isha: { start: "17:42", congregation_start: "19:30" },
          month: "1",
          month_label: "January",
        },
      ],
    },
  ],
  metadata: {
    name: "Example Mosque",
  },
}

export default async function CalendarGeneratorPage() {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col gap-2 bg-mosqueBrand-primary text-mosqueBrand-onPrimary py-10 px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-semibold leading-6 ">
          Calendar Prints
        </h1>
        <p className="text-sm mt-2 text-gray-200">
          We provide printable calendars in various styles. <br />
          Select a calendar print style to generate a printable calendar. Calendars will be generated in PDF format and can be downloaded.
        </p>
      </div>
      <div className="flex flex-row flex-wrap gap-4 p-4">
        {calendarPrintStyles.map((calendarPrintStyle) => (
          <CalendarStyleSelectionCard 
            key={calendarPrintStyle.id}
            calendarId={calendarPrintStyle.id}
            data={exampleData} />
        ))}
      </div>
    </div>

  )
}
