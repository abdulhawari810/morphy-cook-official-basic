import axiosinstance from "@/API/axiosinstance.api";
import { qrcodeMock } from "@/API/mockup/mockup";
import { IS_DEMO } from "@/config/env";


export const verify2FAS = async (data) => {
  if (IS_DEMO) {
    return qrcodeMock.verify2FAS(data);
  }
  return await axiosinstance.patch("/2fas/verify", data);
};

export const setup2FAS = async (data) => {
  if (IS_DEMO) {
    return qrcodeMock.setup2FAS(data);
  }
  return await axiosinstance.post("/2fas/setup", data);
};

export const disable2FAS = async (data) => {
  if (IS_DEMO) {
    return qrcodeMock.disable2FAS(data);
  }
  return await axiosinstance.patch("/2fas/disable", data);
};
