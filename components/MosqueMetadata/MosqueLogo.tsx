import { MosqueMetadataType } from "@/types/MosqueDataType"

export default function MosqueLogo({
  metadata,
}: {
  metadata: MosqueMetadataType
}) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      className="m-2 max-w-full lg:max-w-lg max-h-16 mx-auto"
      src={metadata.logo_url}
      alt=""
    />
  )
}
