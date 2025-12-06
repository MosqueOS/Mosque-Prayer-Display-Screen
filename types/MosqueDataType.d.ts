import { DailyPrayerTime } from "./DailyPrayerTimeType"
import { JummahTimes } from "./JummahTimesType"

export interface MosqueData {
  metadata: MosqueMetadataType
  jummah_times: JummahTimes
  prayer_times: DailyPrayerTime[]
  configuration?: ConfigurationJson
}

type KeyValueStringType = { [key: string]: string }

export type MosqueMetadataType = KeyValueStringType

export type Configuration = KeyValueStringType

export type ConfigurationJson = { [key: string]: any }
