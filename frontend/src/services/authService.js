import API from "../api/axios";

// REGISTER

export const registerUser = async (data) => {

  const response =
    await API.post(
      "/auth/register",
      data
    );

  return response.data;
};

// LOGIN

export const loginUser = async (data) => {

  const response =
    await API.post(
      "/auth/login",
      data
    );

  return response.data;
};

// VERIFY OTP

export const verifyOtp = async (
  data
) => {

  const response =
    await API.post(
      "/auth/verify-otp",
      data
    );

  return response.data;
};

// FORGOT PASSWORD

export const forgotPassword =
  async (data) => {

    const response =
      await API.post(
        "/auth/forgot-password",
        data
      );

    return response.data;
  };

// RESET PASSWORD

export const resetPassword =
  async (data) => {

    const response =
      await API.post(
        "/auth/reset-password",
        data
      );

    return response.data;
  };