import {API_V1} from '../config/constant';
import {APICore} from './apiCore';
const apiCore = new APICore();

export const addStore = async (data: any) => {
  const res = apiCore.createWithFile(`${API_V1}/user/stores`, data);
  return res;
};

export const updateAddress = async (storeId: string, data: any) => {
  return apiCore.update(`${API_V1}/user/stores/${storeId}/address`, data);
};

export const updateDiscription = async (storeId: string, data: any) => {
  return apiCore.update(`${API_V1}/user/stores/${storeId}/description`, data);
};

export const getStores = async (data: any) => {
  return apiCore.get(`${API_V1}/stores`, data);
};


export const getSellerStores = async (data: any) => {
  return apiCore.get(`${API_V1}/user/stores`, data);
};
