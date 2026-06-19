"use client";
import LoginForm from "@/components/auth/LoginForm";
import PageLoader from "@/components/loaders/PageLoader";
import { checkUser } from "@/utils/auth.helper";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const LoginPage = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const validateUser = async () => {
      if (await checkUser()) {
        router.push(`/home`);
        setIsLoading(false);
      } else {
        router.push(`/login`);
        setIsLoading(false);
      }
    };

    validateUser();
  }, []);

  return (
    <div className="h-dvh w-dvw bg-(--primary) flex justify-center items-center p-4">
      <div className="bg-(--background) w-full max-w-md rounded-2xl shadow-xl p-8">
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
