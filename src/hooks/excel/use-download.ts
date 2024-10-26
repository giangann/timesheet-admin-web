import { useCallback, useEffect, useState } from 'react';
import { useApi } from '../use-api';
import { useSnackbar } from 'notistack';

type Params = {
  url: string;
};
export const useDownloadExcelFile = ({ url }: Params) => {
  const [isDownloading, setIsDownloading] = useState(false);
  const [file, setFile] = useState<Blob>();
  const [fileUrl, setFileUrl] = useState<any>();
  const { enqueueSnackbar } = useSnackbar();

  const { getFile } = useApi();

  const onDownloadFile = useCallback(async () => {
    setIsDownloading(true);
    try {
      const response = await getFile(url);
      console.log('file response', response)
      const responseBlob = await response.blob();
      console.log('responseBlob:', responseBlob)
      setFile(responseBlob);
      setFileUrl(window.URL.createObjectURL(responseBlob));
    } catch (error: any) {
      enqueueSnackbar(error.message, { variant: 'error' });
    } finally {
      setIsDownloading(false);
    }
  }, [url, getFile, enqueueSnackbar]);

  return { file, onDownloadFile, isDownloading, fileUrl };
};
