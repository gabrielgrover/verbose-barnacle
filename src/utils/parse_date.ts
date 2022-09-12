import dayjs from "dayjs";
import custom_parse_format from "dayjs/plugin/customParseFormat";

dayjs.extend(custom_parse_format);

export function parse_date(date_str: string) {
  const r = dayjs(date_str, "YYYY-MM-DD");

  return r.format("MM-DD-YYYY");
}
