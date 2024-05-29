import {API_V1} from '../config/constant';
import {APICore} from './apiCore';
const apiCore = new APICore();

export const getWishList = async (data: any) => {
  return apiCore.get(`${API_V1}/user/wishlist-offers`, {params: data});
};
