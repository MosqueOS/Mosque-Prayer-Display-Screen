"use client"

import React, { createContext } from 'react'
import { ConfigurationJson } from '@/types/ConfigurationType'
import { configurationDefaults } from '@/config/ConfigurationDefaults'

type ConfigurationProviderProps = {
  config: ConfigurationJson
  children: React.ReactNode
}

export const ConfigurationContext = createContext<ConfigurationJson>(configurationDefaults)

export function ConfigurationProvider({
  config,
  children,
}: ConfigurationProviderProps) {

  return (
    <ConfigurationContext.Provider value={config}>
      {children}
    </ConfigurationContext.Provider>
  )
}
