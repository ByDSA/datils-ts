type Params = Partial<{
  date: Date;
  utc: boolean;
}>;

export function timestampOfNow(params?: Params) {
  return timestampOf( {
    ...params,
    date: new Date(),
  } );
}

export function timestampOfNowUTC(params?: Params) {
  return timestampOf( {
    ...params,
    utc: true,
    date: new Date(),
  } );
}

const zeroPad = (num: number) => String(num).padStart(2, "0");

export function timestampOf(params: Date | Params) {
  if ("getTime" in params)
    return timestampOfDate(params);

  if (!params.date)
    throw new Error("'date' is required.");

  const { date } = params;

  if (params.utc)
    return timestampOfDateUTC(date);

  return timestampOfDate(date);
}

function timestampOfDate(date: Date) {
  return `${date.getFullYear()}_${
    zeroPad(date.getMonth() + 1)}_${
    zeroPad(date.getDate())}__${
    zeroPad(date.getHours())}_${
    zeroPad(date.getMinutes())}_${
    zeroPad(date.getSeconds())}`;
}

function timestampOfDateUTC(date: Date) {
  return `${date.getUTCFullYear()}_${
    zeroPad(date.getUTCMonth() + 1)}_${
    zeroPad(date.getUTCDate())}__${
    zeroPad(date.getUTCHours())}_${
    zeroPad(date.getUTCMinutes())}_${
    zeroPad(date.getUTCSeconds())}`;
}
