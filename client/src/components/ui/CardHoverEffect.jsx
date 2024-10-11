import { cn } from "../../lib/utils";
import { Link } from "react-router-dom";
import { Card } from "../Card";

export const HoverEffect = ({ items, className }) => {

  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-3 py-10",
        className
      )}
    >
      {items.map((item, idx) => (
        <Link
          href={item?.link}
          key={idx}
          className="relative group  block p-2 h-full w-full"
        >
          <Card key={idx} item={item} />
        </Link>
      ))}
    </div>
  );
};


