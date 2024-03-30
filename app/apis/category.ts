import {API_V1} from '../config/constant';
import {APICore} from './apiCore';
const apiCore = new APICore();

export const getCategories = async () => {
  return apiCore.get(`${API_V1}/store-categories`, {});
};
