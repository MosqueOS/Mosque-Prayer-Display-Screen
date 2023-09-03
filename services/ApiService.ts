import { data } from "autoprefixer"
import axios from "axios"
import { find } from "lodash"
import moment from "moment"

const endpoint = process.env.MOSQUE_API_ENDPOINT ?? ""

export async function getPrayerTimes() {
  return await axios.get(endpoint)
}

export async function getPrayerTimesForToday() {
  const {
    data: { data },
  } = await getPrayerTimes()

  return find(data, {
    day_of_month: moment().format("D"),
    month_label: moment().format("MMMM"),
  })
}

export async function getPrayerTimesForTomorrow() {
  const {
    data: { data },
  } = await getPrayerTimes()

  return find(data, {
    day_of_month: moment().add(1, "day").format("D"),
    month_label: moment().add(1, "day").format("MMMM"),
  })
}
