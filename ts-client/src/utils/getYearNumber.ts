const getYearNumber = (date: Date) => {
  const currentdate: any = new Date(date);
  return currentdate.getFullYear()
}

export default getYearNumber