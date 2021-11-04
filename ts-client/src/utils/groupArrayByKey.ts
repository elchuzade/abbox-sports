// key must be unique
const groupArrayByKey = (items: any[], key: string) => items.reduce(
  (result, item) => ({
    ...result,
    [item[key]]: [
      ...(result[item[key]] || []),
      item,
    ],
  }
  ),
  {},
)

export default groupArrayByKey