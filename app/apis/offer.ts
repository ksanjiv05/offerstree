import {API_V1} from '../config/constant';
import {APICore} from './apiCore';
const apiCore = new APICore();

export const createOffer = async (data: any) => {
  // //https://offerstree.com/api
  // /v1/ersu / store / {storeId} / offers;
  return apiCore.create(`${API_V1}/user/store/${data.store_id}/offers`, data);
};

export const getOffers = async (data: any) => {
  return apiCore.get(`${API_V1}/user/offers`, data);
};

export const getOfferCategories = async (data: any) => {
  return apiCore.get(`${API_V1}/offer-categories`, data);
};