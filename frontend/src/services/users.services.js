import axiosInstance from "@/API/axiosinstance.api";
import { usersMock } from "@/API/mockup/mockup";
import { IS_DEMO } from "@/config/env";


export const getAllUsers = async (params) => {
  if (IS_DEMO) {
    return usersMock.getAllUsers(params);
  }
  return await axiosInstance.get("/users/", { params });
};

export const getUserById = async (id) => {
  if (IS_DEMO) {
    return usersMock.getUserById(id);
  }
  return await axiosInstance.get(`/users/find/${id}`);
};

export const updateUserById = async (id, data) => {
  if (IS_DEMO) {
    return usersMock.updateUserById(id, data);
  }
  return await axiosInstance.patch(`/users/update/${id}`, data);
};
export const updateProfileUsers = async (data) => {
  if (IS_DEMO) {
    return usersMock.updateProfileUsers(data);
  }
  return await axiosInstance.post(`/users/profile/update`, data);
};
export const updateStatusUsers = async (id, data) => {
  if (IS_DEMO) {
    return usersMock.updateStatusUsers(id, data);
  }
  return await axiosInstance.post(`/users/update/status/${id}`, data);
};

export const deleteUser = async () => {
  if (IS_DEMO) {
    return usersMock.deleteUser();
  }
  return await axiosInstance.patch(`/users/delete`);
};
