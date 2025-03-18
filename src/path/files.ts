export function removeExtensionOf(uri: string): string {
  return uri.substring(0, uri.lastIndexOf("."));
}
