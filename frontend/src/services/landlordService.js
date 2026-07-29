// src/services/landlordService.js

import axios from "axios";

const API =
  "http://localhost:8081/api/hostels";

const getHeaders = () => {

  const token =
    localStorage.getItem("token");

  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const getMyHostels = async () => {

  const response = await axios.get(
    `${API}/my-hostels`,
    getHeaders()
  );

  return response.data;
};

export const createHostel = async (
  hostelData
) => {

  const response = await axios.post(
    API,
    hostelData,
    getHeaders()
  );

  return response.data;
};

export const deleteHostel = async (
  hostelId
) => {

  const response = await axios.delete(
    `${API}/${hostelId}`,
    getHeaders()
  );

  return response.data;
};