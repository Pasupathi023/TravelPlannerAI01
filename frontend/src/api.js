import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_URL || "http://127.0.0.1:5001";

export const generateTripPlan = async (data) => {
  try {
    const res = await axios.post(`${API_BASE_URL}/generate`, data);
    return res.data;
  } catch (err) {
    return { error: err.message };
  }
};
