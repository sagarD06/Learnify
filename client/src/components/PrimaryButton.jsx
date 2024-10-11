import React from "react";

const PrimaryButton = ({ title, className, ...props }) => {
  return (
    <button
      className={`inline-flex items-center justify-center whitespace-nowrap text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ${className} text-white font-medium hover:opacity-80 transition-all duration-300 h-11 rounded-md px-6`}
      {...props}
    >
      {title}
    </button>
  );
};

export default PrimaryButton;
