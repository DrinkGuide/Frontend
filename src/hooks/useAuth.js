import { useEffect } from "react";
import { getCookie } from "../utils/cookie";

const useAuth = () => {
  useEffect(() => {
    const storeTokens = () => {
      const accessToken = getCookie("access");
      const refreshToken = getCookie("refresh");

      try {
        localStorage.setItem("accessToken", accessToken); // key와 value를 모두 전달
        console.log("save accesstoken in local storage");
      } catch (error) {
        console.log("fail to store accesstoken", error);
      }
    };

    storeTokens();
  }, []);
};

export default useAuth;
