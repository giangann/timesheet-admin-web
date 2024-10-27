export function base64ToBlob(base64Data: string | null | undefined): Blob | undefined {
  if (!base64Data) return undefined;

  const byteCharacters = atob(base64Data);
  const byteNumbers = new Array<number>(byteCharacters.length);
  byteCharacters.split('').forEach((_byteChar, index) => {
    byteNumbers[index] = byteCharacters.charCodeAt(index);
  });

  const byteArray = new Uint8Array(byteNumbers);

  const blob = new Blob([byteArray]);

  return blob;
}
