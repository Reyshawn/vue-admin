export function extractData (data, ...args) {
  let res = {}
  args.forEach((prop) => {
    data.forEach((d) => {
      if (res[prop]) {
        res[prop].push(d[prop])
      } else res[prop] = []
    })
  })
  return res
}

export function toCelsius (F) {
  let C = (F - 32) * 5 / 9
  return parseFloat(C.toFixed(2))
}
