import { ConfigurationJson } from '@/types/ConfigurationType'

export const configurationDefaults : ConfigurationJson = {
  announcement: undefined,
  feature: {
    announcement: {
      enabled: false,
    },
    prayer_time_tomorrow: {
      enabled: true,
    }
  }
}