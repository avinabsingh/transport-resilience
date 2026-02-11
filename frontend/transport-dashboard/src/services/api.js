import axios from "axios";

const BASE_URL = "http://127.0.0.1:8000";

// Fetch prediction for city
export const getPrediction = async (city) => {
  const res = await axios.get(`${BASE_URL}/predict/${city}`);
  return res.data;
};
