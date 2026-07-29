import axios from "axios";

const API =
  "http://localhost:8081/api/bookings";

export const createBooking = async (
  roomId,
  bookingData
) => {

  const token =
    localStorage.getItem("token");

  const response = await axios.post(
    `${API}/room/${roomId}`,
    bookingData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

export const getMyBookings = async () => {

  const token =
    localStorage.getItem("token");

  const response = await axios.get(
    `${API}/my-bookings`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

export const cancelBooking = async (
  bookingId
) => {

  const token =
    localStorage.getItem("token");

  const response = await axios.delete(
    `${API}/${bookingId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

