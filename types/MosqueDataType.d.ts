import { DailyPrayerTime } from "./DailyPrayerTimeType"
import { JummahTimes } from "./JummahTimesType"

export interface MosqueData {
  metadata: MosqueMetadata
  jummah_times: JummahTimes
  prayer_times: DailyPrayerTime[]
}

export type MosqueMetadata = { [key: string]: string }
