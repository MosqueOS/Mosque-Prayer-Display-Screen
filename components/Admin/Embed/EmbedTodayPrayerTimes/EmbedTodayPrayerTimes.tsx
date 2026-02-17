"use client"

import React, { useEffect } from "react"
import { Spinner } from "@/components/ui/spinner"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { CheckIcon } from "lucide-react"
import { cn } from "@/lib/utils"

export default function EmbedTodayPrayerTimes({}) {
  const [format, setFormat] = React.useState<string>("h:mm")
  const [sunrise, setSunrise] = React.useState<boolean>(false)
  const [date, setDate] = React.useState<boolean>(false)
  const [hijri, setHijri] = React.useState<boolean>(false)
  const [widgetUrl, setWidgetUrl] = React.useState<string>("")
  const [widgetIFrameScriptStr, setWidgetIFrameScriptStr] =
    React.useState<string>("")
  const [isIFrameLoading, setIsIFrameLoading] = React.useState(true)
  const [hasCopiedToClipboard, setHasCopiedToClipboard] = React.useState(false)

  useEffect(() => {
    setIsIFrameLoading(true)
    const url = `${window.location.origin}/widget/embed/today-prayer-times?format=${format}&sunrise=${sunrise}&date=${date}&hijri=${hijri}`
    setWidgetUrl(url)
    setWidgetIFrameScriptStr(`
    <iframe
    src="${url}"
    width="100%"
    height="auto"
    frameborder="0"
    style="border: none"
    ></iframe>
    `)
  }, [format, sunrise, date, hijri])

  function onIFrameLoaded() {
    setIsIFrameLoading(false)
  }

  function copyUrlToClipboard() {
    window.navigator.clipboard.writeText(widgetIFrameScriptStr)
    setHasCopiedToClipboard(true)
    setTimeout(() => {
      setHasCopiedToClipboard(false)
    }, 3000)
  }

  const copyLabel = hasCopiedToClipboard ? "Copied" : "Click to copy"

  return (
    <>
      <div className="w-full rounded-xl border border-gray-200 shadow p-4 bg-white max-w-xl">
        <div className="flex items-center gap-4 mb-2">
          <h3 className="text-lg font-semibold">Today Prayer Time Widget</h3>
        </div>

        <div className={"flex flex-row flex-wrap gap-4"}>
          <div
            className={
              "flex flex-col gap-1 border-gray-200 border-2 rounded-lg p-2"
            }
          >
            <p className={"text-sm"}>Time Format</p>

            <Select
              defaultValue={format}
              onValueChange={(val) => setFormat(val)}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select a format" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Format</SelectLabel>
                  <SelectItem value="h:mm">h:mm</SelectItem>
                  <SelectItem value="h:mm A">h:mm A</SelectItem>
                  <SelectItem value="HH:mm">HH:mm</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            {/*<input*/}
            {/*  type={"text"}*/}
            {/*  onChange={(e) => setFormat(e.target.value)}*/}
            {/*  defaultValue={format}*/}
            {/*/>*/}
          </div>
          <div
            className={
              "flex flex-row justify-start items-center gap-4 border-gray-200 border-2 rounded-lg p-2"
            }
          >
            <p className={"text-sm"}>Show Sunrise?</p>
            <input
              type={"checkbox"}
              onChange={(e) => setSunrise(e.target.checked)}
              checked={sunrise}
            />
          </div>
          <div
            className={
              "flex flex-row justify-start items-center gap-4 border-gray-200 border-2 rounded-lg p-2"
            }
          >
            <p className={"text-sm"}>Show Date?</p>
            <input
              type={"checkbox"}
              onChange={(e) => setDate(e.target.checked)}
              checked={date}
            />
          </div>
          <div
            className={
              "flex flex-row justify-start items-center gap-4 border-gray-200 border-2 rounded-lg p-2"
            }
          >
            <p className={"text-sm"}>Show Hijri Date?</p>
            <input
              type={"checkbox"}
              onChange={(e) => setHijri(e.target.checked)}
              checked={hijri}
            />
          </div>
        </div>

        <div
          className={
            "w-full md:max-w-xl  flex flex-col justify-center items-start pt-6"
          }
        >
          <p className={"font-semibold text-md"}>Example</p>

          <div
            className={
              "w-full md:max-w-xl flex flex-col justify-center items-center border-2 border-gray-200 p-4 rounded-sm relative"
            }
          >
            {isIFrameLoading && (
              <div
                className={
                  "absolute w-full h-full flex items-center justify-center bg-white bg-opacity-60"
                }
              >
                <Spinner className={"text-mosqueBrand-highlight"} />
              </div>
            )}
            {widgetUrl && (
              <iframe
                onLoad={onIFrameLoaded}
                src={widgetUrl}
                width="100%"
                height="auto"
                frameBorder="0"
                // style="border: none"
              ></iframe>
            )}
          </div>
        </div>

        <div
          className={
            "w-full md:max-w-xl  flex flex-col justify-center items-start pt-6"
          }
        >
          <p className={"font-semibold text-md"}>Code</p>

          <div
            className={
              "w-full md:max-w-xl flex flex-col justify-center items-center border-2 border-gray-200 p-4 rounded-sm relative bg-gray-200 text-xs break-all pb-8 cursor-pointer font-mono"
            }
            onClick={copyUrlToClipboard}
          >
            <div
              className={cn(
                "bg-mosqueBrand-primary text-mosqueBrand-onPrimary text-xs absolute right-1 bottom-1 px-2 py-1 rounded inline-flex items-center gap-2 font-sans",
                hasCopiedToClipboard && "bg-green-700",
              )}
            >
              <span>{copyLabel}</span>
              {hasCopiedToClipboard && <CheckIcon className="w-4 h-4" />}
            </div>
            {widgetIFrameScriptStr}
          </div>
        </div>
      </div>
    </>
  )
}
