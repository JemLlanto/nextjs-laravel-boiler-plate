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
  const username = formData.username;
  const password = formData.password;
  return fetch(`${BASE}/login`, options("POST", { username, password }))
    .then((r) => r.json())
    .then((data) => {
      if (data.success) {
        if (data.success) {
          Swal.fire({
            icon: "success",
            title: "Login Successful",
            text: data.message,
          });
        }
      }
      if (data.errors) {
        Swal.fire({
          icon: "error",
          title: "Login Failed",
          text: Array.isArray(data.errors)
            ? data.errors.join(", ")
            : data.errors,
        });
      }
      return data;
    })
    .catch((err) => {
      Swal.fire({
        icon: "error",
        title: "Network Error",
        text: "Something went wrong. Please try again.",
      });

      console.error("Network Error:", err);
      throw err;
    });
};

// No token to clear manually — the server sends an expired cookie
export const logout = () =>
  fetch(`${BASE}/logout`, options("POST")).then((r) => r.json());

export const getMe = () =>
  fetch(`${BASE}/me`, options("GET")).then((r) => r.json());
