import { useMutation, UseMutationOptions } from '@tanstack/react-query'
import { Toastify } from '../../components/Toastify'
import { updateImportExport } from './api'
import { ImportExports } from './types'

export function useUpdateImport_Export(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  options?: UseMutationOptions<any, unknown, { data: ImportExports; id: string }>
) {
  const {
    mutate: onUpdateImportExport,
    isPending,
    isSuccess,
    error
  } = useMutation<Error, unknown, { data: ImportExports; id: string }>({
    mutationFn: ({ data, id }) => {
      return updateImportExport(data, id)
    },
    onError: () => {
      Toastify('error', 'Something went wrong. Please try again')
    },
    ...options
  })

  return {
    onUpdateImportExport,
    isPending,
    isSuccess,
    error
  }
}
