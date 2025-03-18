export function getLastPartOf(uri: string) {
  return uri.substring(uri.lastIndexOf("/") + 1);
}
