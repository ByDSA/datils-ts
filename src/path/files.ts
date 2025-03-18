
export function removeExtensionOf(uri) {
  return uri.substring(0, uri.lastIndexOf("."));
}
