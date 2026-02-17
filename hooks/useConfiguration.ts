import { ConfigurationJson } from '@/types/ConfigurationType'
import { useContext } from 'react'
import { ConfigurationContext } from '@/providers/ConfigurationProvider'

export function useConfiguration(): ConfigurationJson {
  return useContext(ConfigurationContext)
}
