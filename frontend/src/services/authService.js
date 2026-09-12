import API from "../api/axios";

// REGISTER
export const registerUser = async (data) => {
  const response = await API.post(
    "/auth/register",
    data
  );

  return response.data;
};

// LOGIN
export const loginUser = async (data) => {
  const response = await API.post(
    "/auth/login",
    data
  );

  return response.data;
};