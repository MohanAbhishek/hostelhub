import api from "./api";


export const getPendingHostels = async () => {
  const response = await api.get("/admin/hostels/pending");
  return response.data;
};

export const approveHostel = async (id) => {
  const response = await api.put(
    `/admin/hostels/${id}/approve`
  );

  return response.data;
};

export const rejectHostel = async (id) => {
  const response = await api.put(
    `/admin/hostels/${id}/reject`
  );

  return response.data;
};