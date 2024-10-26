export function base64ToUrl(base64Data: string | null | undefined) {
  if (!base64Data) return undefined;

  const byteCharacters = atob(base64Data);
  const byteNumbers = new Array(byteCharacters.length);

  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }

  const byteArray = new Uint8Array(byteNumbers);
  const blob = new Blob([byteArray], { type: 'application/zip' });

  const url = window.URL.createObjectURL(blob);

  return url
}
