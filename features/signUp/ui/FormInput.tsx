import React from "react";
import { Input } from "@/shared/ui/input";

interface FormInputProps {
  label: string;
  type: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  disabled?: boolean;
  error?: string | null;
  className?: string;
}

const FormInput: React.FC<FormInputProps> = ({ 
  label, 
  type, 
  placeholder, 
  value, 
  onChange, 
  required = false, 
  disabled = false, 
  className = "" 
}) => (
  <div>
    <label className="block text-sm text-gray-700 mb-2">{label}</label>
    <div className="relative">
      <Input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        disabled={disabled}
        className={`font-sansKR-Light w-full h-12 px-4 py-3 bg-gray-50 border rounded-xl focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200 placeholder-gray-400 ${className}`}
      />
    </div>
  </div>
);

export default FormInput; 