export function saveDownloadedFileBlobFormat(responseBlob: Blob, fileName: string): void {
  const url = window.URL.createObjectURL(responseBlob);

  // Automatically trigger download
  const link = document.createElement('a');
  link.href = url;
  link.download = fileName; // Suggested file name
  document.body.appendChild(link);
  link.click();
  link.remove();

  // Cleanup the URL object after the download
  setTimeout(() => window.URL.revokeObjectURL(url), 100);
}
