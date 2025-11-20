import { getMetaData } from "@/services/MosqueDataService"
import { MosqueMetadataType } from "@/types/MosqueDataType"
import { Metadata } from "next"
import AdminPage from '@/components/Admin/AdminPage'
import SessionProviderWrapper from '@/app/admin/SessionProviderWrapper'
import { getSession } from "@/app/auth"
import { redirect } from 'next/navigation'

export async function generateMetadata(): Promise<Metadata> {
  const mosqueMetadata: MosqueMetadataType = await getMetaData()

  return {
    title: `${mosqueMetadata.name} Admin | MosqueScreen Project by MosqueOS`,
    description: `${mosqueMetadata.address} | ${mosqueMetadata.name} | MosqueScreen Project by MosqueOS`,
  }
}

export default async function AdminServerPage() {


  return (
    <SessionProviderWrapper>
      <AdminPageWrapper />
    </SessionProviderWrapper>
  )

}

async function AdminPageWrapper() {
  const session = await getSession()

  if (!session)  {
    redirect("/api/auth/signin")
  }

  const mosqueMetadata: MosqueMetadataType = await getMetaData()

  return (
    <div className="bg-white min-w-full min-h-screen">
      <AdminPage metadata={mosqueMetadata} />
    </div>
  )
}