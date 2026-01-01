import React from "react";
import { FiLoader } from "react-icons/fi";

const Loader = () => {
  return (
    <div className="flex items-center justify-center">
      <FiLoader  className="text-2xl text-white slow-spin" />
    </div>
  );
};

export default Loader;
