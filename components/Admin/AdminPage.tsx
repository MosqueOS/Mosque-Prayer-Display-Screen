import { MosqueMetadataType } from '@/types/MosqueDataType'
import AddAnnouncement
  from '@/components/Admin/Announcement/AddAnnouncement'

export default function AdminPage ({
  metadata,
}: {
  metadata: MosqueMetadataType
}) {

  return (

    <div className="">
      <div className="py-10 px-4 sm:px-6 lg:px-8 bg-mosqueBrand-primary">
        <div className="sm:flex sm:items-center ">
          <div className="sm:flex-auto">
            <h1
              className="text-2xl font-semibold leading-6 text-mosqueBrand-onPrimary">
              {metadata.name} Admin Page
            </h1>
            <p
              className="mt-2 text-sm text-mosqueBrand-onPrimary">{metadata.address}</p>
          </div>
        </div>
      </div>

      <div className="py-10 px-4 sm:px-6 lg:px-8 bg-white">
        <AddAnnouncement/>
      </div>

    </div>
  )
}

