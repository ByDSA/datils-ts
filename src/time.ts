export function timestampOfNow() {
  return timestampOf();
}

export function timestampOf(date = new Date()) {
  const zeroPad = (num: number) => String(num).padStart(2,"0");

  return date.getFullYear() + "_"
  + zeroPad(date.getMonth()) + "_"
  + zeroPad(date.getDate()) + "_"
  + zeroPad(date.getHours()) + "_"
  + zeroPad(date.getMinutes()) + "_"
  + zeroPad(date.getSeconds());
}