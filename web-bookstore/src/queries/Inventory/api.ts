import axiosInstance from '../../configs/services/http'
import { Inventorys } from './types'

const fetchListInventorys = async (): Promise<Inventorys[]> => {
    try {
        const response = await axiosInstance.get<Inventorys[]>('/inventory');
        return response.data;
    } catch (error) {
        console.error('Failed to fetch list of inventorys:', error);
        throw error;
    }
}

export default fetchListInventorys