import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { createUser, inputUserDetail, postLogin } from "../api/auth";

export const useLogin = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: ({ email, password }) => postLogin({ email, password }),
    onSuccess: (data) => {
      const { userInfo } = data;
      setUserInfo(userInfo);
      if (userInfo) {
        navigate("/");
      } else {
        navigate("/user/detail");
      }
      sessionStorage.setItem("token", data.token);
      console.log("로그인 성공:", data);
    },
    onError: (error) => {
      console.error("로그인 실패:", error);
    },
  });
};

export const useSignUp = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: ({ name, email, password }) => {
      return createUser({ name, email, password });
    },
    onSuccess: (data) => {
      navigate("/login");
      console.log("회원가입 성공:", data);
    },
    onError: (error) => {
      console.log("회원가입 실패:", error);
    },
  });
};

export const useInputDetail = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: inputUserDetail,
    onSuccess: (data) => {
      navigate("/");
      console.log("개인정보 입력 성공:", data);
    },
    onError: (error) => {
      console.log("개인정보 입력:", error);
    },
  });
};
