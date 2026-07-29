// src/services/hostelService.js

import axiosInstance from "./axiosInstance";

// GET ALL HOSTELS

export const getAllHostels = async () => {

  const response =
    await axiosInstance.get(
      "/api/hostels"
    );

  return response.data;
};

// GET MY HOSTELS

export const getMyHostels = async () => {

  const response =
    await axiosInstance.get(
      "/api/hostels/my-hostels"
    );

  return response.data;
};

// GET HOSTEL BY ID

export const getHostelById = async (id) => {

  const response =
    await axiosInstance.get(
      `/api/hostels/${id}`
    );

  return response.data;
};

// CREATE HOSTEL

export const createHostel = async (hostelData) => {

  const response =
    await axiosInstance.post(
      "/api/hostels",
      hostelData
    );

  return response.data;
};

// UPDATE HOSTEL

export const updateHostel = async (
  id,
  hostelData
) => {

  const response =
    await axiosInstance.put(
      `/api/hostels/${id}`,
      hostelData
    );

  return response.data;
};

// DELETE HOSTEL

export const deleteHostel = async (id) => {

  const response =
    await axiosInstance.delete(
      `/api/hostels/${id}`
    );

  return response.data;
};