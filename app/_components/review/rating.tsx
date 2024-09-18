"use client";

import { useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/app/_components/ui/tooltip";

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
  const [temporaryRating, setTemporaryRating] = useState(defaultRate);

  const handleClick = (rating: number) => {
    setRating(rating);
    localStorage.setItem("starRating", `${rating}`);
  };

  return (
    <div className="flex flex-wrap sm:flex-nowrap">
      <div className="flex gap-x-1 items-center">
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
            <TooltipProvider key={index}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div
                    className={`transition-colors duration-300 w-fit text-[25px] md:text-[30px]  hover:cursor-pointer ${index + 1 === rating ? "scale-125" : ""}`}
                    style={{
                      color: elementColor,
                      filter: `${isActiveColor ? "grayscale(0%)" : "grayscale(100%)"}`,
                    }}
                    onMouseEnter={() => setTemporaryRating(index + 1)}
                    onMouseLeave={() => setTemporaryRating(0)}
                    onClick={() => handleClick(index + 1)}
                  >
                    {icon ? icon : DEFAULT_ICON}
                  </div>
                </TooltipTrigger>
                <TooltipContent className="text-lg">
                  <p className="flex items-center">
                    <div
                      style={{
                        fontSize: "25px",
                        color: elementColor,
                      }}
                    >
                      {icon ? icon : DEFAULT_ICON}
                    </div>
                    {index + 1}
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          );
        })}
      </div>
      <div className="pl-1 pt-2 sm:pl-4 sm:pt-0 text-2xl flex items-center gap-x-4">
        <div className="transition-transform duration-500 transform-gpu scale-100">
          {temporaryRating !== 0 ? temporaryRating : rating}/{DEFAULT_COUNT}
        </div>
        <div className="text-yellow-500 text-3xl">★</div>
      </div>
    </div>
  );
}
