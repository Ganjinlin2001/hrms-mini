// const dayjs = require('dayjs');
const dayjs = require('dayjs');
export function day(time) {
  return dayjs(time).format("YYYY-MM-DD HH:mm:ss");
  // return 123;
}