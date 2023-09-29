import { data } from "autoprefixer"
import axios from "axios"
import { find } from "lodash"
import moment from "moment"

const endpoint = process.env.MOSQUE_API_ENDPOINT ?? ""

export async function getMosqueData() {
  return await axios.get(endpoint)
}

export async function getPrayerTimesForToday() {
  const {
    data: { prayer_times },
  } = await getMosqueData()

  return find(prayer_times, {
    day_of_month: moment().format("D"),
    month_label: moment().format("MMMM"),
  })
}

export async function getPrayerTimesForTomorrow() {
  const {
    data: { prayer_times },
  } = await getMosqueData()

  return find(prayer_times, {
    day_of_month: moment().add(1, "day").format("D"),
    month_label: moment().add(1, "day").format("MMMM"),
  })
}

export async function getJummahTimes() {
  const {
    data: { jummah_times },
  } = await getMosqueData()

  return jummah_times
}
