import { CalendarPrintStyle } from "@/types/CalendarPrintType";
import ClassicTableA4 from "./ClassicTableA4/ClassicTableA4";
import SimpleTableA4 from "./SimpleTableA4/SimpleTableA4";
import SimpleTableWhiteA4 from "./SimpleTableWhiteA4/SimpleTableWhiteA4";



export const calendarPrintStyles: CalendarPrintStyle[] = [
  {
    id: "classic-table-a4",
    display_name: "Classic Table A4",
    description: "Seperate prayer beginning times and jamāʿah times in a single table. Gregorian and Hijri dates are displayed.",
    component: ClassicTableA4,
  },
  {
    id: "simple-table-color-a4",
    display_name: "Simple Table Color A4",
    description: "Prayer bringing times with jamāʿah times in the same column. Only Gregorian dates are displayed.",
    component: SimpleTableA4,
  },
  {
    id: "simple-table-white-a4",
    display_name: "Simple Table White A4",
    description: "Prayer bringing times with jamāʿah times in the same column. Only Gregorian dates are displayed. White background.",
    component: SimpleTableWhiteA4,
  },
]