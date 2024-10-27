import { useSnackbar } from 'notistack';
import { useCallback, useState } from 'react';
import { useApi } from '../use-api';

type Params = {
  endpoint: string;
  file: File | undefined | null;
};
type TImportResponseData = {
  numErrorRecord: number;
  numSuccessRecord: number;
  totalRecord: number;
  file: string;
};
export const useImport = ({ file, endpoint }: Params) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [response, setResponse] = useState<TImportResponseData>();
  const { enqueueSnackbar } = useSnackbar();
  const { postFormData } = useApi();

  const onImportFile = useCallback(async () => {
    setIsSubmitting(true);
    try {
      // create form data
      const formData = new FormData();

      // validate file
      if (!file) {
        enqueueSnackbar('Chưa có file được chọn!', { variant: 'error' });
        return;
      }

      // create request
      formData.append('file', file);
      const responseJson = await postFormData(endpoint, formData);

      // handle response: if error occur => alert and return
      if ('error' in responseJson) {
        if (typeof responseJson.error === 'string')
          enqueueSnackbar(responseJson.error, { variant: 'error' });
        return;
      }
      if ('message' in responseJson) {
        if (typeof responseJson.message === 'string')
          enqueueSnackbar(responseJson.message, { variant: 'error' });
        return;
      }

      // handle response: if success => process response data
      const responseData: TImportResponseData = responseJson.data[''];

      // show result
      const numberOfErrorRecords = responseData.numErrorRecord;
      const numberOfSuccessRecords = responseData.numSuccessRecord;
      const numberOfTotalRecords = responseData.totalRecord;
      if (numberOfErrorRecords > 0)
        enqueueSnackbar(
          `Có ${numberOfErrorRecords}/${numberOfTotalRecords} bản ghi bị lỗi, hãy tải về file kết quả để xem chi tiết`,
          { variant: 'error' }
        );

      if (numberOfSuccessRecords > 0)
        enqueueSnackbar(
          `Thêm mới ${numberOfSuccessRecords}/${numberOfTotalRecords} nhân viên thành công`,
          { variant: 'success' }
        );

      setResponse(responseData);
    } catch (error) {
      enqueueSnackbar(error.message, { variant: 'error' });
    } finally {
      setIsSubmitting(false);
    }
  }, [file, endpoint, enqueueSnackbar, postFormData]);

  const onResetState = useCallback(() => {
    setResponse(undefined);
    setIsSubmitting(false);
  }, []);

  return { isSubmitting, onImportFile, response, onResetState };
};
