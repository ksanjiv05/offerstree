import {API_V1} from '../config/constant';
import {APICore} from './apiCore';
const apiCore = new APICore();

export const register = async (data: any) => {
  const res = await apiCore.create(`${API_V1}/user/auth/register`, data);
  return res;
};

export const login = async (data: any) => {
  return apiCore.create(`${API_V1}/user/auth/login`, data);
};
