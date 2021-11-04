const getWeekNumber = (date: Date) => {
  const currentdate: any = new Date(date);
  var oneJan: any = new Date(currentdate.getFullYear(), 0, 1);
  var numberOfDays = Math.floor((currentdate - oneJan) / (24 * 60 * 60 * 1000));
  var result = Math.ceil((currentdate.getDay() + 1 + numberOfDays) / 7);
  return result
}

export default getWeekNumber