"use client";
import NavBar from "@/components/NavBar";
import Hero from "@/components/section1/Hero";
import OpeningHours from "@/components/section2/OpeningHours";
import About from "@/components/section3/About";
import Reviews from "@/components/section4/Reviews";
import Footer from "@/components/section5/Footer";
import { useEffect, useRef, useState } from "react";
import { web_data, reviews } from "@/utils/data.helper";
import LoginModal from "@/components/LogInModal";
import RegisterModal from "@/components/RegisterModal";
import { scrollToSection } from "@/utils/page.helper";
import { getMe } from "@/services/auth";

export default function Home() {
  const [isAuthorize, setIsAuthorized] = useState<boolean>(false);
  const homeRef = useRef<HTMLElement | null>(null);
  const hoursRef = useRef<HTMLElement | null>(null);
  const locationRef = useRef<HTMLElement | null>(null);
  const reviewsRef = useRef<HTMLElement | null>(null);

  const [pin, setPin] = useState<string>("");
  const [showLogin, setShowLogin] = useState<boolean>(false);
  const [showRegister, setShowRegister] = useState<boolean>(false);

  const verifyPin = () => {
    const adminPin = process.env.NEXT_PUBLIC_ADMIN_PIN;
    const registerPin = process.env.NEXT_PUBLIC_ADMIN_REGISTER_PIN;

    if (pin === adminPin) {
      setShowLogin(true);
      // console.log("Pin Verified");
    } else if (pin === registerPin) {
      setShowRegister(true);
    } else {
      console.warn("Invalid Pin");
    }
    setPin("");
  };

  const checkUser = async () => {
    const data = await getMe();
    if (data.success) {
      setIsAuthorized(true);
      console.log("Authorized");

      console.log(data);
    } else {
      console.log("Not authorized");
    }
  };

  useEffect(() => {
    checkUser();
  }, []);

  return (
    <>
      <div className="relative h-dvh snap-y overflow-y-auto">
        <header>
          <NavBar
            scrollToSection={scrollToSection}
            refs={{ homeRef, hoursRef, locationRef, reviewsRef }}
            setPin={setPin}
            verifyPin={verifyPin}
          />
        </header>

        <LoginModal
          open={showLogin}
          handleClose={() => setShowLogin(false)}
          checkUser={checkUser}
        />
        <RegisterModal
          open={showRegister}
          handleClose={() => setShowRegister(false)}
        />
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
