import React from 'react'
import { calendarPrintStyles } from '@/components/CalendarPrint/PrintStyles/CalendarPrintStyles'
import { CalendarPrintMonthlyPrayerTimes } from '@/types/CalendarPrintType'
import { getCalendarPrintMonthlyPrayerTimesForYear } from '@/services/MosqueDataService'
import { MosqueMetadataType } from '@/types/MosqueDataType'
import { getMetaData } from '@/services/MosqueDataService'
import CalendarPrintButton from '@/components/CalendarPrint/CalendarPrintButton'
import { Card, CardContent } from '@/components/ui/card'

export default async function CalendarPrintPage({ params, searchParams }: { params: Promise<{ calendarId: string }>, searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) {
  const { calendarId } = await params
  const { year = new Date().getFullYear().toString() } = await searchParams

  const calendarPrintStyle = calendarPrintStyles.find((calendarPrintStyle) => calendarPrintStyle.id === calendarId)

  if (!calendarPrintStyle) {
    return <div>Calendar not found</div>
  }


  const monthlyPrayerTimes: CalendarPrintMonthlyPrayerTimes[] = await getCalendarPrintMonthlyPrayerTimesForYear(year as string)
  const metadata: MosqueMetadataType = await getMetaData()

  return (
    <>
      <calendarPrintStyle.component year={year as string} monthly_prayer_times={monthlyPrayerTimes} metadata={metadata} />

      <div className="flex flex-col justify-start fixed bottom-4 right-4 hidden-print max-w-xs">
        <Card className="shadow-lg">
          <CardContent className="flex flex-col gap-1 pt-2">

            <span className="text-black px-4 py-2 text-sm">
              You can print this page using your browser's print function.
            </span>
            <CalendarPrintButton />
          </CardContent>
        </Card>
      </div>
    </>

  )
}