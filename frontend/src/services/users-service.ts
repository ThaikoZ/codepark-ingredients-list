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

interface SessionForm {}

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
    console.log(body);
    const request = apiClient.post<LoginForm[]>("/auth/token", body, {
      signal: controller.signal,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
    return { request, cancel: () => controller.abort() };
  }
  // TODO: Check current session
}

export default new UserService();
