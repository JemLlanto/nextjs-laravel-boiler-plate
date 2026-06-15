import { motion } from "framer-motion";

export default function About({ about }: { about: string }) {
  return (
    <div className="relative h-dvh snap-center flex justify-center items-center gap-10 px-10">
      <motion.div
        className="w-4/10 p-5 text-center"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5, ease: "easeOut" }}
        viewport={{ once: false }}
      >
        <h2 className="text-(--primary)">ABOUT US</h2>
        <p className="text-justify whitespace-pre-line">{about}</p>
      </motion.div>
      <motion.div
        className="h-80 w-120"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5, ease: "easeOut" }}
        viewport={{ once: false }}
      >
        <iframe
          className="h-full w-full rounded-2xl shadow-md"
          style={{ border: 0 }}
          loading="lazy"
          src="https://www.google.com/maps?q=14.417162, 120.854618&hl=en&z=15&output=embed"
        ></iframe>
      </motion.div>
    </div>
  );
}
