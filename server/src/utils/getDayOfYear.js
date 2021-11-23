module.exports = () => {
  let now = new Date();
  let start = new Date(now.getFullYear(), 0, 0);
  let diff =
    now -
    start +
    (start.getTimezoneOffset() - now.getTimezoneOffset()) * 60 * 1000;
  let oneDay = 1000 * 60 * 60 * 24;
  let day = Math.floor(diff / oneDay);
  return day;
};
