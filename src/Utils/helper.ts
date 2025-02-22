import axios from "axios";
import api from "./api";
import { PropertyBody, TransactionBody } from "./types";
import store from "../Redux/store";

export const fetchData = async (url: string, page: number, limit: number) => {
  try {
    const response = await api.get(`/${url}/get?page=${page}&limit=${limit}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching properties:", error);
    throw error;
  }
};

export const addData = async (
  url: string,
  body: PropertyBody | TransactionBody
) => {
  try {
    const response = await api.post(`/${url}/create`, body);
    return response.data;
  } catch (error) {
    console.error("Error adding property:", error);
    throw error;
  }
};

export const editData = async (
  url: string,
  id: number,
  body: PropertyBody | TransactionBody
) => {
  try {
    const response = await api.put(`/${url}/edit/${id}`, body);
    return response.data;
  } catch (error) {
    console.error("Error editing property:", error);
    throw error;
  }
};

export const deleteData = async (url: string, id: number) => {
  try {
    const response = await api.delete(`/${url}/delete/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting property:", error);
    throw error;
  }
};

export const propertyList = async (url: string) => {
  try {
    const response = await api.get(`/${url}/list`);
    return response.data;
  } catch (error) {
    console.error("Error fetching property list:", error);
    throw error;
  }
};

export const monthlyReport = async () => {
  try {
    const token = store.getState().auth.token;

    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "text/csv",
    };

    const response = await axios.get(
      "http://localhost:5000/api/transaction/monthly-report",
      {
        headers,
        responseType: "blob",
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error fetching monthly report:", error);
    throw error;
  }
};
