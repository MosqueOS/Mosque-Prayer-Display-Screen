"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CalendarPrintComponentProps, CalendarPrintStyle } from "@/types/CalendarPrintType"
import { calendarPrintStyles } from "./PrintStyles/CalendarPrintStyles"



export default function CalendarStyleSelectionCard({ calendarId, data }: { calendarId: string, data: CalendarPrintComponentProps }) {

  const calendarPrintStyle = calendarPrintStyles.find((calendarPrintStyle) => calendarPrintStyle.id === calendarId)

  const calendarDisplayName = calendarPrintStyle?.display_name
  const calendarDescription = calendarPrintStyle?.description
  const nextYear = new Date().getFullYear() + 1
  const followingYear = nextYear + 1

  const futureYears = [nextYear, nextYear + 1]

  return (
    <Card
      className="max-w-full lg:max-w-lg rounded-xl border border-gray-200 shadow p-2 pb-4 md:p-4 bg-white "
    >
      <CardHeader>
        <CardTitle>{calendarDisplayName}</CardTitle>
        <CardDescription>{calendarDescription}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4 w-full p-0 md:p6">
        <div className="w-full max-h-40 sm:max-h-60 overflow-hidden flex justify-center">
          <div className="scale-[40%] sm:scale-[60%] origin-top mt-2">
            {calendarPrintStyle && <calendarPrintStyle.component {...data} />}
          </div>
        </div>
        <div className="flex flex-row flex-wrap gap-2 justify-center">
        {futureYears.map((year) => (
          <Button
            key={`${calendarId}-${year}`}
          variant="default"
          className="flex-1"
          onClick={() => {
            window.open(`/calendar-prints/${calendarId}?year=${year}`, '_blank')
          }}
        >
          {year} Calendar
        </Button>
        ))}
        </div>
      </CardContent>
    </Card>
  )
}