"use client";

import { HashLoader, ClipLoader, BeatLoader, PulseLoader } from "react-spinners";

interface LoadingProps {
  type?: "hash" | "clip" | "beat" | "pulse";
  size?: number;
  color?: string;
  className?: string;
}

const Loading = ({ 
  type = "hash", 
  size = 30, 
  color = "#3B82F6",
  className = "",
}: LoadingProps) => {
  const loaderProps = {
    color,
    size,
    className
  };

  const loader = (() => {
    switch (type) {
      case "clip":
        return <ClipLoader {...loaderProps} />;
      case "beat":
        return <BeatLoader {...loaderProps} />;
      case "pulse":
        return <PulseLoader {...loaderProps} />;
      case "hash":
      default:
        return <HashLoader {...loaderProps} />;
    }
  })();

  return (
    <div className={"absolute inset-0 flex items-center justify-center bg-gray-100"}>
      {loader}
    </div>
  );
};

export default Loading; 