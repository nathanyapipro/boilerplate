import moment, { unitOfTime } from "moment";

export const DEFAULT_STRING_FORMAT = "MMMM Do YYYY, h:mm a";
export function format(
  date: string,
  fmt: string = DEFAULT_STRING_FORMAT
): string {
  return moment(date).format(fmt);
}

export function fromNow(date: string): string {
  return moment(date).fromNow();
}
