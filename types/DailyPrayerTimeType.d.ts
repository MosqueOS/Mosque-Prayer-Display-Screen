export interface DailyPrayerTime {
  month: string
  month_label: string
  day_of_month: string
  sunrise_start: string
  fajr: PrayerTime
  zuhr: PrayerTime
  asr: PrayerTime
  maghrib: PrayerTime
  isha: PrayerTime
}

export interface UpcomingPrayerTimes extends DailyPrayerTime {
  display_date: string
}

export interface PrayerTime {
  start: string
  start_secondary?: string
  congregation_start: string
}
