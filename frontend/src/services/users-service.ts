import apiClient from "./api-client";

export interface RegisterForm {
  full_name: string;
  email: string;
  password: string;
}

export interface LoginForm {
  username: string;
  password: string;
}

export interface TokenForm {
  access_token: string;
  token_type: string;
}

export interface UserInfo {
  User: {
    id: number;
    full_name: string;
    email: string;
  };
}

class UserService {
  registerUser(body: RegisterForm) {
    const controller = new AbortController();
    const request = apiClient.post<RegisterForm[]>("/auth", body, {
      signal: controller.signal,
    });
    return { request, cancel: () => controller.abort() };
  }

  loginUser(body: LoginForm) {
    const controller = new AbortController();
    const request = apiClient.post<LoginForm[]>("/auth/token", body, {
      signal: controller.signal,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
    return { request, cancel: () => controller.abort() };
  }

  authenticateUser(token: TokenForm) {
    const controller = new AbortController();
    const request = apiClient.get<UserInfo>("/auth/me", {
      signal: controller.signal,
      headers: {
        Authorization: `${token.token_type} ${token.access_token}`,
      },
    });
    return { request, cancel: () => controller.abort() };
  }
}

export default new UserService();
