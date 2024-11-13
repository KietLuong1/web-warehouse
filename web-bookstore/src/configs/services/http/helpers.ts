/* eslint-disable @typescript-eslint/no-explicit-any */
import { Toastify } from '../../../components/Toastify'

type ApiCall = (..._args: any[]) => Promise<any>

export async function responseWrapper<T>(func: ApiCall, [...args]: any[] = []): Promise<T> {
  // eslint-disable-next-line no-async-promise-executor
  return new Promise(async (res, rej) => {
    try {
      const response = (await func(...args)) || {}
      if (response.ok) res(response.data)
      if (response?.originalError?.message === 'CONNECTION_TIMEOUT') {
        Toastify('error', 'Connection timeout. Please check your network and try again.')
      }
      rej(response.data)
    } catch (err) {
      rej(err)
    }
  })
}