import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white text-center py-4 mt-10">
      <p className="text-sm opacity-70">
        © {new Date().getFullYear()} My App. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
