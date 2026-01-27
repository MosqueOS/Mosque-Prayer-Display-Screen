import {
  getMetaData,
  getConfiguration,
} from "@/services/MosqueDataService"
import type { MosqueMetadataType } from "@/types/MosqueDataType"
import type { Metadata } from "next"
import "./prayer-times.css"
import { ConfigurationJson } from "@/types/ConfigurationType"
import { ConfigurationProvider } from "@/providers/ConfigurationProvider"
import ScreenFactory from "@/components/Screens/ScreenFactory"

export async function generateMetadata(): Promise<Metadata> {
  const mosqueMetadata: MosqueMetadataType = await getMetaData()

  return {
    title: `${mosqueMetadata.name} Prayer Times | MosqueScreen Project by MosqueOS`,
    description: `${mosqueMetadata.address} | ${mosqueMetadata.name} | MosqueScreen Project by MosqueOS`,
  }
}

export default async function Home() {
  const config: ConfigurationJson = await getConfiguration()

  return (
    <ConfigurationProvider config={config}>
      <ScreenFactory config={config} />
    </ConfigurationProvider>
  )
}
