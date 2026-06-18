"use client";
import Image from "next/image";
import facebookIcon from "@/public/facebook.png";
import googleIcon from "@/public/search.png";
import { AuthProps, login } from "@/services/auth";
import { useState } from "react";
import { FormErrors } from "@/utils/auth.helper";
import { useRouter } from "next/navigation";

const LoginForm = () => {
  const router = useRouter();
  const [formData, setFormData] = useState<AuthProps>({
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);

  const isValid = formData.username && formData.password;

  const handleLogin = async () => {
    if (!isValid) return;
    setLoading(true);
    setErrors({});

    try {
      const data = await login(formData);

      if (data.success) {
        // console.log("Logged in!", data.message); // "Logged in successfully."
        router.push(`/home`);
      }
    } catch (error) {
      // console.error(error);
      setErrors({ general: "Login failed. Please try again." });
    } finally {
      setLoading(false);
    }
  };
  const handleChange = (
    field: keyof AuthProps,
    value: string | number | null,
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };
  return (
    <>
      <div className="text-center mb-4">
        <h4 className="text-3xl font-bold">Welcome!</h4>
        <p className="text-gray-500 mt-1">
          Sign in to continue to your account
        </p>
      </div>

      <form
        className="space-y-2"
        onSubmit={(e) => {
          e.preventDefault();
          handleLogin();
        }}
      >
        <div>
          <label htmlFor="username" className="block text-sm font-medium mb-2">
            Username
          </label>
          <input
            id="username"
            type="text"
            placeholder="Enter your username"
            value={formData.username}
            onChange={(e) => handleChange("username", e.target.value)}
            className="w-full px-4 py-3 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-300"
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium mb-2">
            Password
          </label>
          <input
            id="password"
            type="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={(e) => handleChange("password", e.target.value)}
            className="w-full px-4 py-3 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-300"
          />
        </div>

        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" />
            <span>Remember me</span>
          </label>

          <button type="button" className="text-blue-500 hover:underline">
            Forgot password?
          </button>
        </div>

        <button
          type="submit"
          disabled={loading || !isValid}
          className="w-full bg-(--primary) text-white py-3 rounded-lg font-semibold disabled:bg-(--primary_hover)/50 hover:bg-(--primary_hover) transition cursor-pointer"
        >
          {loading ? "Logging in" : "Login"}
        </button>
      </form>

      <div className="flex items-center gap-4 my-6">
        <div className="flex-1 h-px bg-gray-300" />
        <span className="text-sm text-gray-500">or continue with</span>
        <div className="flex-1 h-px bg-gray-300" />
      </div>

      <div className="flex justify-center items-center gap-5">
        <button
          type="button"
          className="size-8 cursor-pointer hover:scale-102 transition duration-200 ease-in-out"
        >
          <Image
            src={facebookIcon}
            alt="Facebook Icon"
            className="size-full object-contain"
          />
        </button>

        <button
          type="button"
          className="size-8 cursor-pointer hover:scale-102 transition duration-200 ease-in-out"
        >
          <Image
            src={googleIcon}
            alt="Facebook Icon"
            className="size-full object-contain"
          />
        </button>
      </div>

      <div className="text-center mt-6 text-sm">
        <span className="text-gray-500">Don't have an account?</span>{" "}
        <button
          type="button"
          className="text-blue-500 font-medium hover:underline"
        >
          Sign up
        </button>
      </div>
    </>
  );
};

export default LoginForm;
