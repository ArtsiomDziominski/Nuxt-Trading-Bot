import CryptoJS from "crypto-js";

export const encryptPassword = (password: string): string => {
	return CryptoJS.SHA256(password).toString(CryptoJS.enc.Hex);
};

export const encryptAPI = (value: string): string => {
	return CryptoJS.AES.encrypt(value, useRuntimeConfig().public.API_URL).toString();
};