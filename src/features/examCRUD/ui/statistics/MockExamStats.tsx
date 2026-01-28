import React from 'react';
import { BarChart, Bar, XAxis, ResponsiveContainer, LabelList, CartesianGrid } from 'recharts';
import { BarChart3 } from 'lucide-react';
import { ExamStatistics } from '@/src/entities/examResult/model/types';

interface MockExamStatsProps {
    statistics: ExamStatistics;
}

export function MockExamStats({ statistics }: MockExamStatsProps) {
    return (
        <div className="bg-white rounded-lg border border-gray-200 p-4 smalltablet:p-6 h-full flex flex-col">
            <h3 className="text-base smalltablet:text-lg font-sansKR-SemiBold text-gray-900 mb-3 smalltablet:mb-4 flex items-center gap-2">
                <BarChart3 className="h-4 smalltablet:h-5 w-4 smalltablet:w-5" />
                등급별 학생 분포
            </h3>
            <div className="w-full flex-1 min-h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={statistics.gradeDistribution} margin={{ top: 20, right: 10, left: 10, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="grade" />
                        <Bar
                            dataKey="count"
                            fill="#3b82f6"
                            radius={[4, 4, 0, 0]}
                        >
                            <LabelList
                                dataKey="count"
                                position="top"
                                formatter={(value: number) => `${value}명`}
                            />
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
