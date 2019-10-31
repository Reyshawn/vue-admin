export function bufferUrl (buffer) {
  let bytes = new Uint8Array(buffer)
  let blob = new Blob([bytes], { type: 'image/png' })
  let urlCreator = window.URL || window.webkitURL
  let imageUrl = urlCreator.createObjectURL(blob)
  return imageUrl
}
