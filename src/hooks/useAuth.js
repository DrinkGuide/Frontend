import { useEffect } from "react";
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
        localStorage.setItem(accessToken);
        console("save accesstoken in local storage");
      } catch {
        console.log("fail to store accesstoken");
      }
    };

    storeTokens();
  }, []);
};

export default useAuth;
