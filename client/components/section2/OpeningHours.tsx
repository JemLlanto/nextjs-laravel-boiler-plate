import { motion, Variants } from "framer-motion";

export default function OpeningHours() {
  const containerVariants: Variants = {
    hidden: {
      opacity: 0,
      scale: 0.6,
    },
    show: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 15,
        delay: 0.3,
      },
    },
  };
  return (
    <div className="h-dvh snap-center bg-(--primary) flex justify-around items-center">
      <motion.div
        drag
        dragConstraints={{ top: 0, bottom: 0, left: 0, right: 0 }}
        dragElastic={0.2}
        dragTransition={{ bounceStiffness: 200, bounceDamping: 10 }}
      >
        <motion.div
          className="bg-neutral-50 rounded-2xl shadow-xl flex flex-col justify-center items-center p-6 cursor-pointer"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          whileHover={{ y: -5 }}
          viewport={{ once: false }}
        >
          <h4 className="w-130 text-center border-b-3 border-neutral-800/20 mb-2">
            Opening Hours
          </h4>

          <ul className="w-full flex flex-col justify-center items-center gap-2">
            {[
              ["Monday", "4:00 PM - 10:00 PM"],
              ["Tuesday", "4:00 PM - 10:00 PM"],
              ["Wednesday", "4:00 PM - 10:00 PM"],
              ["Thursday", "4:00 PM - 10:00 PM"],
              ["Friday", "4:00 PM - 10:00 PM"],
              ["Saturday", "Closed"],
              ["Sunday", "Closed"],
            ].map(([day, time]) => (
              <li key={day} className="w-full flex justify-between">
                <h6>{day}</h6>
                <h6>{time}</h6>
              </li>
            ))}
          </ul>
        </motion.div>
      </motion.div>
    </div>
  );
}
