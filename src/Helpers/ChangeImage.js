export default function ChangeImage(src) {
  if (!/^http/.test(src)) {
    return '/img/' + src
  }
  return src
}
