import { useCallback, useEffect, useState } from 'react';
import { useApi } from '../use-api';
import { useSnackbar } from 'notistack';
import { saveDownloadedFileBlobFormat } from 'src/utils';

type Params = {
  endpoint: string;
  fileName: string;
};
export const useDownloadExcelFile = ({ endpoint, fileName }: Params) => {
  const [isDownloading, setIsDownloading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const { getFile } = useApi();

  const onDownloadFile = useCallback(async () => {
    setIsDownloading(true);
    try {
      const response = await getFile(endpoint);
      if (response.ok) enqueueSnackbar('Tải về thành công', { variant: 'success' });

      const responseBlob = await response.blob();

      saveDownloadedFileBlobFormat(responseBlob, fileName);
    } catch (error: any) {
      enqueueSnackbar(error.message, { variant: 'error' });
    } finally {
      setIsDownloading(false);
    }
  }, [endpoint, fileName, getFile, enqueueSnackbar]);

  return { onDownloadFile, isDownloading };
};
