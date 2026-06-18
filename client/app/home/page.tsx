"use client";
import PageLoader from "@/components/loaders/PageLoader";
import { checkUser } from "@/utils/auth.helper";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const HomePage = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const validateUser = async () => {
      if (await checkUser()) {
        router.push(`/home`);
        setIsLoading(false);
      } else {
        router.push(`/`);
        setIsLoading(false);
      }
    };

    validateUser();
  }, []);

  if (isLoading) {
    return (
      <>
        <PageLoader />
      </>
    );
  }

  return <div>This is the home page.</div>;
};

export default HomePage;
