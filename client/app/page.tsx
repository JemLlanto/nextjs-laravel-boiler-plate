"use client";
import NavBar from "@/components/NavBar";
import Hero from "@/components/section1/Hero";
import { useEffect, useRef, useState } from "react";
import { web_data } from "@/utils/data.helper";
import { scrollToSection } from "@/utils/page.helper";
import { checkUser } from "@/utils/auth.helper";
import { useRouter } from "next/navigation";
import PageLoader from "@/components/loaders/PageLoader";

export default function Home() {
  const router = useRouter();
  const homeRef = useRef<HTMLElement | null>(null);
  const hoursRef = useRef<HTMLElement | null>(null);
  const locationRef = useRef<HTMLElement | null>(null);
  const reviewsRef = useRef<HTMLElement | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const validateUser = async () => {
      if (await checkUser()) {
        router.push(`/home`);
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

  return (
    <>
      <div className="relative h-dvh snap-y overflow-y-auto">
        <header>
          <NavBar
            scrollToSection={scrollToSection}
            refs={{ homeRef, hoursRef, locationRef, reviewsRef }}
          />
        </header>

        <main>
          <section>
            <Hero web_data={web_data} />
          </section>
        </main>

        {/* <Footer /> */}
      </div>
    </>
  );
}
