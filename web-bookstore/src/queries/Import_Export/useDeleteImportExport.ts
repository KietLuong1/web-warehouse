import { useMutation, UseMutationOptions } from '@tanstack/react-query'
import { Toastify } from '../../components/Toastify'
import { deleteImportExport } from './api'
import { ImportExports } from './types'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useDeleteImport_Export(options?: UseMutationOptions<any, Error, ImportExports>) {
  const {
    mutate: onDeleteImportExport,
    isPending: isDeleting,
    isSuccess,
    error
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } = useMutation<any, Error, ImportExports>({
    mutationFn: (data: ImportExports) => deleteImportExport(data),
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
