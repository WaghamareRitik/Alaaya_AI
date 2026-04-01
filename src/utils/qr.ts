import QRCode from "qrcode";

export const generateQR = async (data: any) => {
  return await QRCode.toDataURL(JSON.stringify(data));
};
