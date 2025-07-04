import authorizeAxiosInstance from "~/utils/authorizeAxios";

export const refreshTokenApi = async () => {
  const response = await authorizeAxiosInstance.get(
    `${import.meta.env.VITE_BACKEND_URL}/api/auth/refresh-token`
  );

  return response.data;
};
