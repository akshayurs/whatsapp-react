import Resizer from 'react-image-file-resizer'
const SupportedFormats = ['image/jpg', 'image/svg', 'image/jpeg', 'image/png']
export const resizeFile = (file, maxWidth, maxHeight) =>
  new Promise((resolve, reject) => {
    if (!SupportedFormats.includes(file.type)) {
      return reject('Formate not suppotred')
    }
    Resizer.imageFileResizer(
      file,
      maxWidth,
      maxHeight,
      'JPEG',
      95,
      0,
      (uri) => {
        resolve(uri)
      },
      'base64'
    )
  })
