import React from "react";
import Link from "next/link";

interface HeaderProps {
  title: string;
  description?: string;
}

const Header: React.FC<HeaderProps> = ({ title, description }) => {
  return (
    <div className="bg-white border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row items-center justify-center">
          <div className="text-center">
            <h1 className="text-3xl font-MaruBuri-Bold text-gray-900 mb-2">
              {title}
            </h1>
            {description && <p className="text-gray-600">{description}</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
