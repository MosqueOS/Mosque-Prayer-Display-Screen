import { ConfigurationJson } from "@/types/ConfigurationType"
import DefaultScreen from "@/components/Screens/DefaultScreen"
import MobileScreenLayout from "@/components/Screens/Mobile/MobileScreenLayout"

interface ScreenFactoryProps {
  config: ConfigurationJson
}

export default async function ScreenFactory({ config }: ScreenFactoryProps) {
  return (
    <>
      <div className={"md:hidden"}>
        <MobileScreenLayout config={config} />
      </div>
      <div className={"hidden lg:block h-full w-full"}>
        <DesktopScreenFactory config={config} />
      </div>
    </>
  )
}

function DesktopScreenFactory({
  config,
}: ScreenFactoryProps) {
  return <DefaultScreen config={config} />
}
