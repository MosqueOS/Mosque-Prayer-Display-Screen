import Calendar from "@/components/Calendar/Calendar"
import { getAllPrayerTimes, getMetaData } from "@/services/MosqueDataService"
import { MosqueMetadataType } from "@/types/MosqueDataType"
import { Metadata } from "next"

export async function generateMetadata(): Promise<Metadata> {
  const mosqueMetadata: MosqueMetadataType = await getMetaData()

  return {
    title: `${mosqueMetadata.name} Prayer Times | MosqueScreen Project by MosqueOS`,
    description: `${mosqueMetadata.address} | ${mosqueMetadata.name} | MosqueScreen Project by MosqueOS`,
  }
}

export default async function FullYear() {
  const prayerTimes = await getAllPrayerTimes()
  const mosqueMetadata: MosqueMetadataType = await getMetaData()

  return (
    <div className="bg-white min-w-full min-h-screen">
      <Calendar prayerTimes={prayerTimes} metadata={mosqueMetadata} />
    </div>
  )
}
