import Logo from "@/public/LOGO.png";
import Image from "next/image";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <div className="min-h-20 bg-(--primary) snap-center flex flex-col justify-start items-center gap-5 py-5">
      <div>
        <Image src={Logo} alt="Logo" className="size-40" />
      </div>
      <div className="text-center text-neutral-50">
        <h4>© {year} Konchix. All rights reserved.</h4>
        <p>Developed with ❤️ by Jem Llanto.</p>
      </div>
    </div>
  );
}
