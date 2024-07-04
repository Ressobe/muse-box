"use client";

import { useState } from "react";

type RatingProps = {
  defaultRate: number;
  count?: number;
  icon?: string;
  size?: number;
  color?: string;
};

const DEFAULT_COUNT = 10;
const DEFAULT_ICON = "★";
const DEFAULT_UNSELECTED_COLOR = "grey";
const DEFAULT_COLOR = "yellow";

export default function Rating({
  defaultRate,
  count,
  icon,
  size,
  color,
}: RatingProps) {
  let stars = Array(count || DEFAULT_COUNT).fill(icon || DEFAULT_ICON);
  const [rating, setRating] = useState(defaultRate);
  const [temporaryRating, setTemporaryRating] = useState(0);

  const handleClick = (rating: number) => {
    setRating(rating);
    localStorage.setItem("starRating", `${rating}`);
  };

  return (
    <div className="flex gap-x-2">
      <>
        {stars.map((_, index) => {
          const isActiveColor =
            (rating || temporaryRating) &&
            (index < rating || index < temporaryRating);

          let elementColor = "";

          if (isActiveColor) {
            elementColor = color || DEFAULT_COLOR;
          } else {
            elementColor = DEFAULT_UNSELECTED_COLOR;
          }

          return (
            <div
              className={`transition-colors duration-300  hover:cursor-pointer ${index + 1 === rating ? "scale-125" : ""}`}
              key={index}
              style={{
                fontSize: size ? `${size}px` : "14px",
                color: elementColor,
                filter: `${isActiveColor ? "grayscale(0%)" : "grayscale(100%)"}`,
              }}
              onMouseEnter={() => setTemporaryRating(index + 1)}
              onMouseLeave={() => setTemporaryRating(0)}
              onClick={() => handleClick(index + 1)}
            >
              {icon ? icon : DEFAULT_ICON}
            </div>
          );
        })}
      </>
    </div>
  );
}
