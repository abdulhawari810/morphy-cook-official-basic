import axiosinstance from "@/API/axiosinstance.api";
import { uploadMock } from "@/API/mockup/mockup";
import { IS_DEMO } from "@/config/env";


export const avatarUpload = async (data) => {
  if (IS_DEMO) {
    return uploadMock.avatarUpload(data);
  }

  try {
    const res = await axiosinstance.post("/upload/avatar", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return res.data;
  } catch (error) {
    console.log(error);
  }
};
