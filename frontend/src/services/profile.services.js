import axiosInstance from "@/API/axiosinstance.api";
import { profileMock } from "@/API/mockup/mockup";
import { IS_DEMO } from "@/config/env";


export const getProfile = async () => {
  if (IS_DEMO) {
    return profileMock.getProfile();
  }
  return await axiosInstance.get("/profile");
};

export const createProfile = async (data) => {
  if (IS_DEMO) {
    return profileMock.createProfile(data);
  }
  return await axiosInstance.post(`/profile/create`, data);
};

export const updateProfile = async (data) => {
  if (IS_DEMO) {
    return profileMock.updateProfile(data);
  }
  return await axiosInstance.patch(`/profile/update`, data);
};
