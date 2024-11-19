import { useMutation, UseMutationOptions } from '@tanstack/react-query'
import { Toastify } from '../../components/Toastify'
import { deleteImportExport } from './api'
import { ImportExportTypes } from './types'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useDeleteImport_Export(options?: UseMutationOptions<any, Error, ImportExportTypes>) {
  const {
    mutate: onDeleteImportExport,
    isPending: isDeleting,
    isSuccess,
    error
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } = useMutation<any, Error, ImportExportTypes>({
    mutationFn: (data: ImportExportTypes) => deleteImportExport(data),
    onError: () => {
      Toastify('error', 'Something went wrong please try again!')
    },
    ...options
  })

  return {
    onDeleteImportExport,
    isDeleting,
    isSuccess,
    error
  }
}
