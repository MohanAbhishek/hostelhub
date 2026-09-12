import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_URL}/...`;

export const getUsers = () => axios.get(API_URL);

export const createUser = (user) =>
    axios.post(API_URL, user);

export const updateUser = (id, user) =>
    axios.put(`${API_URL}/${id}`, user);

export const deleteUser = (id) =>
    axios.delete(`${API_URL}/${id}`);