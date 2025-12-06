export interface AnnouncementData {
  date: string
  start_time: string
  end_time: string
  duration_minutes?: string | null
  message?: string
  car_reg_number?: string | null
  image?: string | null
  is_visible?: boolean
}
  