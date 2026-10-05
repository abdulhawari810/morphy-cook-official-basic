import axiosinstance from "@/API/axiosinstance.api";
import { authMock } from "@/API/mockup/mockup";
import { IS_DEMO } from "@/config/env";


export const loginUser = async (data) => {
  if (IS_DEMO) {
    return authMock.login(data);
  }

  return await axiosinstance.post("/auth/login", data);
};

export const verify2FasLogin = async ({ token, challengeToken }) => {
  if (IS_DEMO) {
    return authMock.verify2FasLogin({ token, challengeToken });
  }

  return await axiosinstance.post("/auth/verify/2fas", { token, challengeToken });
};

export const registerUser = async (data) => {
  if (IS_DEMO) {
    return authMock.register(data);
  }
  return await axiosinstance.post("/auth/register", data);
};

export const updatePassword = async (data) => {
  if (IS_DEMO) {
    return authMock.updatePassword(data);
  }

  return await axiosinstance.post("/auth/password/update", data);
};

export const me = async () => {
  if (IS_DEMO) {
    return authMock.me();
  }
  return await axiosinstance.get("/auth/me");
};

export const logoutUser = async () => {
  if (IS_DEMO) {
    return authMock.logout();
  }
  return await axiosinstance.delete("/auth/logout", { withCredentials: true });
};
