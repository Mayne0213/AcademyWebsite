import React from "react";
import { Academy } from "@/src/entities/academy/model";

interface AcademySelectProps {
  academies: Academy[];
  value: number | undefined;
  onChange: (value: number) => void;
  disabled?: boolean;
  error?: string;
}

const AcademySelect: React.FC<AcademySelectProps> = ({ 
  academies, 
  value, 
  onChange, 
  disabled = false,
  error
}) => (
  <div>
    <label className="block text-sm text-gray-700 mb-2">학원 선택</label>
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        required
        disabled={disabled}
        className={`font-sansKR-Light w-full h-12 px-4 py-3 bg-gray-50 border rounded-xl focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200 appearance-none ${error ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200'}`}
      >
        <option value="">학원을 선택해주세요</option>
        {academies.map((academy: Academy) => (
          <option key={academy.academyId} value={academy.academyId} disabled={disabled}>
            {academy.academyName}
          </option>
        ))}
      </select>
    </div>
    {error && (
      <p className="mt-1 text-sm text-red-600 font-sansKR-Regular">
        {error}
      </p>
    )}
  </div>
);

export default AcademySelect; 