import { useCallback, useEffect, useState } from 'react';
import { useApi } from '../use-api';
import { useSnackbar } from 'notistack';

type Params = {
  url: string;
};
export const useDownloadExcelFile = ({ url }: Params) => {
  const [isDownloading, setIsDownloading] = useState(false);
  const [file, setFile] = useState();
  const { enqueueSnackbar } = useSnackbar();

  const { get } = useApi();

  const onDownloadFile = useCallback(async () => {
    setIsDownloading(true);
    try {
      const response = await get(url);
      setFile(response);
    } catch (error: any) {
      enqueueSnackbar(error.message, { variant: 'error' });
    } finally {
      setIsDownloading(false);
    }
  }, [url, get, enqueueSnackbar]);

  return { file, onDownloadFile, isDownloading };
};
