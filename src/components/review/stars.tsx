import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

type StarsProps = {
  amount: number;
};

export function Stars({ amount }: StarsProps) {
  const arr = Array.from({ length: 10 }, () => 0);

  return (
    <ul className="flex gap-x-2">
      {arr.map((_, idx) => {
        return (
          <li key={idx}>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <span
                    style={{
                      fontSize: "25px",
                      color: idx < amount ? "yellow" : "grey",
                    }}
                  >
                    ★
                  </span>
                </TooltipTrigger>
                <TooltipContent className="text-lg">
                  <p className="flex items-center">
                    <span
                      style={{
                        fontSize: "25px",
                        color: "yellow",
                      }}
                    >
                      ★
                    </span>
                    {idx + 1}
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </li>
        );
      })}
    </ul>
  );
}
