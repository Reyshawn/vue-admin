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

export function toBearing (azimuth) {
  let dirs = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE',
    'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW']
  let ix = parseInt(azimuth / 22.5 + 0.5)
  return dirs[ix % 16]
}

export const iconMap = {
  'clear-day': 'wi-day-sunny',
  'clear-night': 'wi-night-clear',
  'rain': 'wi-rain',
  'snow': 'wi-snow',
  'sleet': 'wi-sleet',
  'wind': 'wi-windy',
  'fog': 'wi-fog',
  'cloudy': 'wi-cloudy',
  'partly-cloudy-day': 'wi-day-cloudy',
  'partly-cloudy-night': 'wi-night-partly-cloudy'
}
