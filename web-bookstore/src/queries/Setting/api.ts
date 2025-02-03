import axios from 'axios'

export const fetchListProvince = async () => {
  try {
    console.log('🚀 ~ fetchListProvince ~ params:')
    const response = await axios.get(`https://esgoo.net/api-tinhthanh/1/0.htm`)

    console.log('Province', response.data)
    return response.data
  } catch (error) {
    console.error('Failed to fetch list province:', error)
    throw error
  }
}

export const fetchDistrictsByProvince = async (id: number) => {
  const response = await axios.get(`https://esgoo.net/api-tinhthanh/2/${id}.htm`)
  return response.data
}

export const fetchWardsByDistrict = async (id: number) => {
  const response = await axios.get(` https://esgoo.net/api-tinhthanh/3/${id}.htm`)
  return response.data
}
