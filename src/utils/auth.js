import axios from "axios";
import { jwtDecode } from "jwt-decode"; // 올바른 명명된 임포트

const API_URL = "https://www.drinkguide.store/api/v1";

export const getAccessToken = () => {
  return localStorage.getItem("accessToken");
};

export const getRefreshToken = () => {
  return localStorage.getItem("refreshToken");
};

export const isTokenValid = (token) => {
  if (!token) return false;
  try {
    const decodedToken = jwtDecode(token); // 명명된 임포트로 수정
    const exp = decodedToken.exp;
    if (Date.now() >= exp * 1000) {
      return false;
    }
    return true;
  } catch (e) {
    console.error("Error decoding JWT token", e);
    return false;
  }
};

export const refreshToken = async () => {
  try {
    const refreshToken = localStorage.getItem("refreshToken");
    if (!refreshToken) throw new Error("Refresh token not found");

    const response = await axios.post(`${API_URL}/members/reissue`, {
      refreshToken: refreshToken,
    });
    const { accessToken } = response.data;

    // Save new access token to local storage
    localStorage.setItem("accessToken", accessToken);
    return accessToken;
  } catch (error) {
    console.error("Error refreshing token:", error);
    throw error;
  }
};
