import { DailyPrayerTime } from "./DailyPrayerTimeType"
import { MosqueMetadataType } from "./MosqueDataType"

export interface CalendarPrintComponentProps {
  year: string
  monthly_prayer_times: CalendarPrintMonthlyPrayerTimes[]
  metadata: MosqueMetadataType
}

export interface CalendarPrintMonthlyPrayerTimes {
  month: string,
  month_label: string,
  prayer_times: CalendarDailyPrayerTime[],
}

/**
 * We add the date so that we can avoid date checks and manipulation in the calendar component.
 */
export interface CalendarDailyPrayerTime extends DailyPrayerTime {
  date: string
}

export interface CalendarPrintStyle {
  id: string,
  display_name: string,
  description: string,
  component: React.ComponentType<CalendarPrintComponentProps>,
}
