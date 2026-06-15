"use client";

import { motion } from "framer-motion";
import { Rating } from "@mui/material";
import { useState } from "react";
import { formatDate } from "@/utils/date.helper";

interface Props {
  reviews: {
    id: number;
    name: string;
    rating: number;
    comment: string;
    date: string;
  }[];
}

export default function ReviewCarousel({ reviews }: Props) {
  const [active, setActive] = useState(0);
  const total = reviews.length;

  const prev = () => setActive((a) => (a - 1 + total) % total);
  const next = () => setActive((a) => (a + 1) % total);
  const visibleRange = 5;

  function getRelativeIndex(index: number, active: number, total: number) {
    // Returns -2, -1, 0, 1, 2 relative to active
    let diff = index - active;
    if (diff > total / 2) diff -= total;
    if (diff < -total / 2) diff += total;
    return diff;
  }
  return (
    <div>
      <div className="relative flex items-center justify-center w-full h-100">
        {reviews.map((review, index) => {
          const rel = getRelativeIndex(index, active, total);

          if (Math.abs(rel) > visibleRange) return null;

          // Scale & positioning based on distance from center
          const scale = rel === 0 ? 1 : Math.abs(rel) === 1 ? 0.92 : 0.68;
          const xOffset = rel * 320; // horizontal spread (px)
          const zIndex = 10 - Math.abs(rel);
          const opacity = Math.abs(rel) > 1 ? 0 : 1;
          const isActive = rel === 0;

          return (
            <motion.div
              key={review.id}
              className="absolute cursor-pointer"
              animate={{
                x: xOffset,
                scale,
                opacity,
                zIndex,
              }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 100,
              }}
              onClick={() => {
                if (rel < 0) prev();
                else if (rel > 0) next();
              }}
            >
              <motion.div
                className="bg-neutral-50 rounded-2xl shadow-lg p-5 flex flex-col"
                animate={{
                  width: isActive ? 360 : 280,
                  height: isActive ? 380 : 300,
                  boxShadow: isActive
                    ? "0 25px 50px -12px rgba(0,0,0,0.25)"
                    : "0 10px 15px -3px rgba(0,0,0,0.1)",
                }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              >
                <div className="h-full flex flex-col justify-between items-start gap-5">
                  <div className="h-85/100 w-full flex flex-col justify-start items-start">
                    <div className="w-full flex justify-start items-center gap-3 border-b-2 border-neutral-300">
                      <div className="size-12 bg-neutral-500 rounded-full"></div>
                      <div>
                        <p className="ms-1 font-medium">{review.name}</p>
                        <Rating
                          name="half-rating-read"
                          value={review.rating}
                          readOnly
                        />
                      </div>
                    </div>
                    <div className={`h-full overflow-y-auto mt-1`}>
                      <p>{review.comment}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-neutral-500">
                      {formatDate(review.date)}
                    </p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          );
        })}
      </div>
      {/* Arrow buttons */}
      <div className="flex gap-4 z-50 mt-5">
        <button
          onClick={() => {
            prev();
          }}
          className="size-10 rounded-full bg-(--primary) text-white flex items-center justify-center shadow hover:opacity-80 transition-opacity cursor-pointer"
        >
          ‹
        </button>
        <button
          onClick={next}
          className="size-10 rounded-full bg-(--primary) text-white flex items-center justify-center shadow hover:opacity-80 transition-opacity cursor-pointer"
        >
          ›
        </button>
      </div>
    </div>
  );
}
