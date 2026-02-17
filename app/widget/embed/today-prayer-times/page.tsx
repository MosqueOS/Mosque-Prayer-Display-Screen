import { TodayPrayerTime } from "@/app/widget/embed/today-prayer-times/TodayPrayerTime"

type Props = { searchParams: Promise<any> }

export default async function EmbedPrayerTimesPage({ searchParams }: Props) {
  const {format, sunrise, date, hijri } = await searchParams
  const timeFormat = format ?? "h:mm"
  const showSunrise = (sunrise ?? "false") === "true"
  const showDate = (date ?? "false") === "true"
  const showHijri = (hijri ?? "false") === "true"


  return (
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* optionally inline critical css or keep your existing widget.css import inside component */}
      </head>
      <body style={{ margin: 0 }}>
        <TodayPrayerTime
          timeFormat={timeFormat}
          showSunrise={showSunrise}
          showDate={showDate}
          showHijri={showHijri}
        />

        {/* optional: auto-resize support for iframes */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                function postHeight() {
                  var h = document.documentElement.scrollHeight || document.body.scrollHeight;
                  parent.postMessage({ type: "prayer_widget_resize", height: h }, "*");
                }
                window.addEventListener("load", postHeight);
                window.addEventListener("resize", postHeight);
                setInterval(postHeight, 500); // cheap + reliable; can remove later if you prefer ResizeObserver
              })();
            `,
          }}
        />
      </body>
    </html>
  )
}
