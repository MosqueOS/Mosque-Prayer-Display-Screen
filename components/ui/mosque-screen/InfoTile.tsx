import { cn } from "@/lib/utils"

type InfoTileProps = {
  label: React.ReactNode
  children: React.ReactNode
  valueClassName?: string
  className?: string
}

export function InfoTile({
  label,
  children,
  valueClassName = "",
  className = "",
}: InfoTileProps) {
  return (
    <div
      className={cn(
        `bg-mosqueBrand-primaryAlt text-white p-4 lg:p-6 2k:py-[2.5vh] 2k:px-[1vw] lg:col-auto`,
        className,
      )}
    >
      <dt className="font-medium text-sm md:text-2xl 2k:text-3xl 4k:text-5xl">
        {label}
      </dt>
      <dd
        className={cn(
          `mt-[1.3vh] font-bold tracking-tight text-xl md:text-3xl 2k:text-4xl 4k:text-6xl`,
          valueClassName,
        )}
      >
        {children}
      </dd>
    </div>
  )
}
