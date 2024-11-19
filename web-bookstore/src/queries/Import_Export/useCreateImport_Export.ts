import { useMutation, UseMutationOptions } from '@tanstack/react-query'
import { Toastify } from '../../components/Toastify'
import { createImportExport } from './api'
import { ImportExportTypes } from './types'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useCreateImport_Export(options?: UseMutationOptions<any, Error, ImportExportTypes>) {
  const {
    mutate: onCreateImport_Export,
    isPending,
    isSuccess,
    error
  } = useMutation({
    mutationFn: createImportExport,
    onError: () => {
      Toastify('error', 'Something went wrong. Please try again')
    },
    ...options
  })

  return {
    onCreateImport_Export,
    isPending,
    isSuccess,
    error
  }
}
