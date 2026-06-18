// services/auth.ts

import Swal from "sweetalert2";

const BASE = "http://localhost:8000/api";

export interface AuthProps {
  username: string;
  password: string;
}

// credentials: 'include' is CRITICAL — it tells fetch to send/receive cookies
// Without it, the browser won't attach the httpOnly cookie to requests
const options = (method: string, body?: object) => ({
  method,
  credentials: "include" as RequestCredentials,
  headers: { "Content-Type": "application/json", Accept: "application/json" },
  ...(body && { body: JSON.stringify(body) }),
});

export const register = async (formData: AuthProps) => {
  const username = formData.username;
  const password = formData.password;

  const response = await fetch(
    `${BASE}/register`,
    options("POST", { username, password }),
  );

  const data = await response.json();
  // console.log("data: ", data)

  return {
    ok: response.ok,
    data,
  };
};

export const login = async (formData: AuthProps) => {
  const { username, password } = formData;

  try {
    const response = await fetch(
      `${BASE}/login`,
      options("POST", { username, password }),
    );

    const data = await response.json();

    if (!response.ok) {
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: data.message || "Invalid credentials",
      });

      return data;
    }

    Swal.fire({
      icon: "success",
      title: "Login Successful",
      text: data.message,
    });

    return data;
  } catch (err) {
    Swal.fire({
      icon: "error",
      title: "Network Error",
      text: "Something went wrong. Please try again.",
    });

    throw err;
  }
};

// No token to clear manually — the server sends an expired cookie
export const logout = () =>
  fetch(`${BASE}/logout`, options("POST")).then((r) => r.json());

export const getMe = () =>
  fetch(`${BASE}/me`, options("GET")).then((r) => r.json());
