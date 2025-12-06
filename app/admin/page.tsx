import { getMetaData } from "@/services/MosqueDataService"
import { MosqueMetadataType } from "@/types/MosqueDataType"
import { Metadata } from "next"
import AdminPage from '@/components/Admin/AdminPage'
import SessionProviderWrapper from '@/app/admin/SessionProviderWrapper'
import { getSession, isAdminInterfaceEnabled } from '@/app/auth'
import { redirect } from 'next/navigation'


export const metadata = {
  title: "Admin",
  description: "Admin interface for MosqueScreen Project by MosqueOS",
};

export default async function AdminServerPage() {


  return (
    <SessionProviderWrapper>
      <AdminPageWrapper />
    </SessionProviderWrapper>
  )

}

async function AdminPageWrapper() {
  const isAdminEnabled = isAdminInterfaceEnabled()

  if (!isAdminEnabled) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-mosqueBrand-primary px-6">
        <div className="text-center text-mosqueBrand-onPrimary">
          <div className="text-4xl mb-3">⚠️</div>
          <h1 className="text-2xl font-semibold mb-2">Admin Interface Disabled</h1>
          <p className="text-sm opacity-80 max-w-sm mx-auto">
            Please contact the system administrator.
          </p>
        </div>
      </div>

    )
  }

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