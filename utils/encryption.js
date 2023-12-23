import CryptoJS from "crypto-js";
import dotenv from 'dotenv';
dotenv.config();

const key = process.env.CRYPTO_KEY;

const iv = CryptoJS.lib.WordArray.random(16);

const encryptData = (data) => {
  return data ? CryptoJS.AES.encrypt(data, key, {
    iv: iv,
  }).toString() : null;  
};

const decryptData = (encryptedData) => {
  return CryptoJS.AES.decrypt(encryptedData, key, {
    iv: iv,
  }).toString(CryptoJS.enc.Utf8);
};

export const encryptField = (value) => encryptData(value);
export const decryptField = (value) => decryptData(value);

export {
  encryptData,
  decryptData,
};