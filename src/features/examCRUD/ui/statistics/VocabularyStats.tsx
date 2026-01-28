import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { CheckCircle2, XCircle, Users, AlertCircle } from 'lucide-react';
import { ExamStatistics } from '@/src/entities/examResult/model/types';
import Link from 'next/link';

interface VocabularyStatsProps {
    statistics: ExamStatistics;
}

export function VocabularyStats({ statistics }: VocabularyStatsProps) {
    const data = [
        { name: 'Pass', value: statistics.passCount || 0, color: '#22c55e' }, // green-500
        { name: 'Fail', value: statistics.failCount || 0, color: '#ef4444' }, // red-500
    ];

    const total = (statistics.passCount || 0) + (statistics.failCount || 0);
    const passRate = total > 0 ? ((statistics.passCount || 0) / total * 100).toFixed(1) : '0.0';

    return (
        <div className="grid grid-cols-1 tablet:grid-cols-2 gap-4">
            {/* Pass/Fail 차트 */}
            <div className="bg-white rounded-lg border border-gray-200 p-4 smalltablet:p-6">
                <h3 className="text-base smalltablet:text-lg font-sansKR-SemiBold text-gray-900 mb-3 smalltablet:mb-4 flex items-center gap-2">
                    <Users className="h-4 smalltablet:h-5 w-4 smalltablet:w-5" />
                    Pass / Fail 현황
                </h3>
                <div className="flex flex-col smalltablet:flex-row items-center justify-center gap-8">
                    <div className="w-full smalltablet:w-1/2 h-[250px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={data}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={80}
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {data.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="flex flex-col gap-4 w-full smalltablet:w-1/2">
                        <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg border border-green-100">
                            <div className="flex items-center gap-3">
                                <CheckCircle2 className="w-8 h-8 text-green-500" />
                                <div>
                                    <div className="text-sm text-green-700 font-medium">Pass (합격)</div>
                                    <div className="text-xs text-green-600">기준: {statistics.passScore}점 이상</div>
                                </div>
                            </div>
                            <div className="text-2xl font-bold text-green-600">{statistics.passCount}명</div>
                        </div>
                        <div className="flex items-center justify-between p-4 bg-red-50 rounded-lg border border-red-100">
                            <div className="flex items-center gap-3">
                                <XCircle className="w-8 h-8 text-red-500" />
                                <div>
                                    <div className="text-sm text-red-700 font-medium">Fail (미통과)</div>
                                    <div className="text-xs text-red-600">재시험 대상</div>
                                </div>
                            </div>
                            <div className="text-2xl font-bold text-red-600">{statistics.failCount}명</div>
                        </div>
                        <div className="text-center mt-2">
                            <span className="text-gray-500 text-sm">합격률: </span>
                            <span className="text-xl font-bold text-gray-900">{passRate}%</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* 불합격자 명단 */}
            <div className="bg-white rounded-lg border border-gray-200 p-4 smalltablet:p-6">
                <h3 className="text-base smalltablet:text-lg font-sansKR-SemiBold text-gray-900 mb-3 smalltablet:mb-4 flex items-center gap-2">
                    <AlertCircle className="h-4 smalltablet:h-5 w-4 smalltablet:w-5" />
                    불합격자 명단 (재시험 대상)
                </h3>
                <div className="max-h-80 overflow-y-auto space-y-2">
                    {statistics.failedStudents && statistics.failedStudents.length > 0 ? (
                        statistics.failedStudents.map((student, index) => (
                            <Link
                                key={student.studentId}
                                href={`/main/student/${student.studentId}`}
                                className="flex items-center justify-between p-3 bg-red-50 rounded-lg border border-red-200 hover:bg-red-100 transition-colors cursor-pointer"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                                        <span className="text-sm font-sansKR-Bold text-red-600">#{index + 1}</span>
                                    </div>
                                    <div>
                                        <h4 className="font-sansKR-Medium text-gray-900">{student.studentName}</h4>
                                        <p className="text-sm text-gray-600">미달: {(statistics.passScore || 0) - student.score}점</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-lg font-sansKR-Bold text-red-600">{student.score}점</p>
                                </div>
                            </Link>
                        ))
                    ) : (
                        <div className="text-center py-8 text-gray-500">
                            <CheckCircle2 className="w-12 h-12 mx-auto mb-2 text-green-400" />
                            <p className="font-sansKR-Medium">불합격자가 없습니다!</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
