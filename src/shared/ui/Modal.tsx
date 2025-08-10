import React from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
  size?: "sm" | "md" | "lg" | "xl";
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  title,
  size = "md",
}) => {
  if (!isOpen) return null;

  const sizeClasses = {
    sm: "max-w-sm max-h-[80vh]",
    md: "max-w-md max-h-[80vh]",
    lg: "max-w-lg max-h-[80vh]",
    xl: "max-w-xl max-h-[80vh]",
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className={`bg-white rounded-lg shadow-lg w-full mx-4 ${sizeClasses[size]}`}>
        {/* 헤더 */}
        {(title || true) && (
          <div className="flex items-center justify-between p-4 border-b">
            {title && <h3 className="text-lg font-semibold">{title}</h3>}
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 text-xl font-bold"
            >
              ×
            </button>
          </div>
        )}
        
        {/* 컨텐츠 */}
        <div className="p-4">
          {children}
        </div>
      </div>
    </div>
  );
};

export { Modal };
export default Modal;
