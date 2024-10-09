import { cn } from "../../lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useState } from "react";

export const HoverEffect = ({ items, className }) => {
  let [hoveredIndex, setHoveredIndex] = useState(null);

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
          onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <AnimatePresence>
            {hoveredIndex === idx && (
              <motion.span
                className="absolute inset-0 h-full w-full bg-neutral-200 dark:bg-slate-800/[0.5] block  rounded-3xl"
                layoutId="hoverBackground"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: { duration: 0.15 },
                }}
                exit={{
                  opacity: 0,
                  transition: { duration: 0.15, delay: 0.2 },
                }}
              />
            )}
          </AnimatePresence>
          <Card key={idx} item={item} />
        </Link>
      ))}
    </div>
  );
};

export const Card = ({ item }) => {
  return (
    <div className="flex w-full text-neutral-200 cursor-pointer flex-col rounded-2xl transition-all duration-300 hover:-translate-y-2 bg-slate-900">
      <div className="flex flex-col">
        <img
          alt="Ad hoc classes"
          className="size-full rounded-t-2xl bg-cover"
          src={item.imageUrl}
        />
      </div>
      <div className="flex flex-1 flex-col justify-between gap-4 p-4">
        <div className="flex flex-col w-full justify-between gap-2">
          <h3 className="w-full truncate text-xl font-bold capitalize tracking-tighter md:text-2xl">
            {item.title}
          </h3>
          <p className="text-lg tracking-tight text-primary/80 line-clamp-2">
            {item.description}
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <button className="inline-flex items-center justify-center whitespace-nowrap text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-gradient-to-b from-blue-400 to-blue-700 text-white font-medium hover:opacity-80 transition-all duration-300 h-11 rounded-md px-8">
            {item.price ? `Buy at Rs ${item.price}/-` : "View Course"}
          </button>
        </div>
      </div>
    </div>
  );
};
