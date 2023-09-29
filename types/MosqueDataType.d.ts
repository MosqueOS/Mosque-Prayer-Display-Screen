import { DailyPrayerTime } from "./DailyPrayerTimeType"
import { JummahTimes } from "./JummahTimesType"

export interface MosqueData {
  metadata: { [key: string]: string }
  jummah_times: JummahTimes
  prayer_times: DailyPrayerTime[]
}

export type Metadata = { [key: string]: string }
