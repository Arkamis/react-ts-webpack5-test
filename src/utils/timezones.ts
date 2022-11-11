import "dayjs/locale/es";

import dayjs from "dayjs";
import calendar from "dayjs/plugin/calendar";
import customParseFormat from "dayjs/plugin/customParseFormat";
import relativeTime from "dayjs/plugin/relativeTime";
import timezone from "dayjs/plugin/timezone";
import updateLocale from "dayjs/plugin/updateLocale";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(customParseFormat);
dayjs.extend(calendar);
dayjs.extend(updateLocale);
dayjs.extend(relativeTime);

dayjs.updateLocale("es", {
  calendar: {
    lastDay: "[Ayer a las] h:mm A",
    sameDay: "[Hoy a las] h:mm A",
    nextDay: "[Mañana a las] h:mm A",
    lastWeek: "[Pasado] dddd [a las] h:mm A",
    nextWeek: "dddd [a las] h:mm A",
    sameElse: "YYYY-MM-DD HH:mm",
  },
});

export type DayjsDate = string | number | Date | dayjs.Dayjs | null | undefined;

dayjs.tz.setDefault("America/Mexico_City");

export const localDayjs = (date?: DayjsDate) => dayjs(date).tz();

export const calendarDate = (date?: DayjsDate) => localDayjs(date).calendar();
