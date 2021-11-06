// Change source url
//  background.png -> /media/background.png     any file name to /media/filename
//  links like http://example.com/filename and base64 data like data:image will be returned same

export default function ChangeImage(src) {
  if (!(/^http/.test(src) || /^data:/.test(src))) {
    return '/media/' + src
  }
  return src
}
