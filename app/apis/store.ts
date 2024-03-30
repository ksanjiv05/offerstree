import {API_V1} from '../config/constant';
import {APICore} from './apiCore';
const apiCore = new APICore();

export const addStore = async (data: any) => {
  const res = await apiCore.create(`${API_V1}/user/stores`, data);
  return res;
};

export const updateAddress = async (storeId: string, data: any) => {
  return apiCore.update(`${API_V1}/user/stores/${storeId}/address`, data);
};
