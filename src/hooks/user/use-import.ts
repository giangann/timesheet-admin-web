import { useCallback, useState } from 'react';
import { useApi } from '../use-api';
import { useSnackbar } from 'notistack';

type Params = {
  file: File | undefined | null;
};
export const useImport = ({ file }: Params) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [zipData, setZipData] = useState<string>();
  const { enqueueSnackbar } = useSnackbar();
  const { postFormData } = useApi();

  const onImportFile = useCallback(async () => {
    setIsSubmitting(true);
    try {
      // create form data
      const formData = new FormData();

      // validate file
      if (!file) {
        enqueueSnackbar('No file choosen!', { variant: 'error' });
        return;
      }
      console.log('file type: ', file.type);

      formData.append('file', file);
      const responseJson = await postFormData('/users/import-user', formData);
      const responseData = responseJson.data[''];
      console.log('num of error', responseData.numErrorRecord);
      console.log('file', responseData.file);
      setZipData(responseData.file)
    } catch (error) {
      enqueueSnackbar(error.message, { variant: 'error' });
    } finally {
      setIsSubmitting(false);
    }
  }, [file, enqueueSnackbar, postFormData]);

  return { isSubmitting, onImportFile, zipData };
};
