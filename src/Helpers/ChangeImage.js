export default function ChangeImage(src) {
  if (!(/^http/.test(src) || /^data:/.test(src))) {
    return '/img/' + src
  }
  return src
}
