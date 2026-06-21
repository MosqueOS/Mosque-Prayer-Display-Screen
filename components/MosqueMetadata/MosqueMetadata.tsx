import { MosqueMetadataType } from "@/types/MosqueDataType"

export default function MosqueMetadata({
  metadata,
}: {
  metadata: MosqueMetadataType
}) {
  return (
    <div className="md:flex text-mosqueBrand-onPrimary text-center md:text-left">
      <div className="mr-4 2k:mr-[1vw] flex-shrink-0 self-center">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className="m-2 max-w-full lg:max-w-lg max-h-[10vh] mx-auto"
          src={metadata.logo_url}
          alt=""
        />
      </div>
      <div className={"flex flex-col gap-[0.7vh] "}>
        <h2 className="mt-[1.2vh] font-bold text-2xl md:text-3xl 2k:text-4xl 4k:text-6xl">
          {metadata.name}
        </h2>
        <p className="mt-[1.2vh] text-xl leading-[2vh] 2k:text-[1.8rem] 4k:text-[2.8rem] mx-5 md:mx-0">
          {metadata.address}
        </p>
        <p className="text-xl leading-[2vh] 2k:text-[1.8rem] 4k:text-[2.8rem]">
          {metadata.website}
        </p>
      </div>
    </div>
  )
}
