import React from 'react';
import { BarChart, Bar, XAxis, ResponsiveContainer, LabelList, CartesianGrid, Tooltip } from 'recharts';
import { BarChart3 } from 'lucide-react';
import { ExamStatistics } from '@/src/entities/examResult/model/types';

interface EtcStatsProps {
    statistics: ExamStatistics;
}

export function EtcStats({ statistics }: EtcStatsProps) {
    // 간단한 점수 분포 (10점 단위 등) 또는 단순히 점수 리스트를 보여줄 수도 있음.
    // 여기서는 단순히 최고/최저/평균을 시각화하거나, 점수대별 분포를 계산해서 보여줄 수 있음.
    // 현재 API가 gradeDistribution만 주기 때문에, ETC는 grade가 의미가 없을 수 있음.
    // 임시로 단순히 평균 점수 등을 강조하는 뷰로 구성하거나, 
    // 추후 API에서 histogram 데이터를 주면 좋겠지만, 지금은 gradeDistribution을 그대로 쓰되 라벨만 변경해서 보여주는 방식 등을 고려.

    // 하지만 ETC도 점수가 있으므로 9등급제 기준인 gradeDistribution은 의미가 없음.
    // 간단히 등급 분포 대신 "점수 분포"라는 이름으로 보여주되, 데이터가 없으면 표시 안 함.

    return (
        <div className="bg-white rounded-lg border border-gray-200 p-4 smalltablet:p-6">
            <h3 className="text-base smalltablet:text-lg font-sansKR-SemiBold text-gray-900 mb-3 smalltablet:mb-4 flex items-center gap-2">
                <BarChart3 className="h-4 smalltablet:h-5 w-4 smalltablet:w-5" />
                점수 통계
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="text-sm text-gray-500 mb-1">최고 점수</div>
                    <div className="text-2xl font-bold text-gray-900">{statistics.highestScore}점</div>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="text-sm text-gray-500 mb-1">평균 점수</div>
                    <div className="text-2xl font-bold text-blue-600">{statistics.averageScore}점</div>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="text-sm text-gray-500 mb-1">최저 점수</div>
                    <div className="text-2xl font-bold text-red-600">{statistics.lowestScore}점</div>
                </div>
            </div>
        </div>
    );
}
