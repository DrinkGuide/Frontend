import { useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { getCookie } from "../utils/cookie";

const useAuth = () => {
  useEffect(() => {
    const storeTokens = () => {
      const accessToken = getCookie("access");
      const refreshToken = getCookie("refresh");

      if (!accessToken) {
        console.error("Access token not found in cookies");
      }

      if (!refreshToken) {
        console.error("Refresh token not found in cookies");
        return;
      }

      try {
        // Store the raw JWT tokens, or decoded information based on your needs
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);

        console.log("Tokens stored in local storage.");
      } catch (e) {
        console.error("Error decoding JWT token", e);
      }
    };

    storeTokens();
  }, []); // Fix the empty dependency array
};

export default useAuth;
