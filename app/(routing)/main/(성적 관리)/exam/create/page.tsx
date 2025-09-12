"use client"

import { useState } from "react";
import { examApi } from "@/src/entities/exam";
import { useExamStore } from "@/src/entities/exam";
import { CreateExamRequest } from "@/src/entities/exam/model/types";
import React from "react"; // Added missing import

const Grading = () => {
    const [formData, setFormData] = useState<CreateExamRequest>({
        examName: "",
        totalQuestions: 45,
        correctAnswers: {},
        questionScores: {},
        questionTypes: {}
    });

    const { createExam } = useExamStore();

    // 기본값 설정 함수
    const setDefaultValues = (count: number) => {
        const defaultData = {
            correctAnswers: {} as any,
            questionScores: {} as any,
            questionTypes: {} as any
        };

        for (let i = 1; i <= count; i++) {
            defaultData.correctAnswers[i] = "1"; // 모든 문제 정답을 1번으로
            defaultData.questionScores[i] = 2; // 뒤에 10문제는 3점, 나머지는 2점
            if(i <= 17) {
                defaultData.questionTypes[i] = "듣기";
            } else if(i == 18 || i == 19 || i == 25 || i == 26 || i == 27 || i == 28) {
                defaultData.questionTypes[i] = "기초유형";
            } else if(31 <= i && i <= 34) {
                defaultData.questionTypes[i] = "빈칸";
            } else if(36 <= i && i <= 37) {
                defaultData.questionTypes[i] = "순서";
            } else if(38 <= i && i <= 39) {
                defaultData.questionTypes[i] = "삽입";
            } else if(i == 29) {
                defaultData.questionTypes[i] = "어법";
            } else if(i == 30) {
                defaultData.questionTypes[i] = "어휘";
            } else { // 20~24, 35, 40~45
                defaultData.questionTypes[i] = "내용파악";
            }
        }

        setFormData(prev => ({
            ...prev,
            ...defaultData
        }));
    };

    // 컴포넌트 마운트 시 기본값 설정
    React.useEffect(() => {
        setDefaultValues(formData.totalQuestions);
    }, []);

    // 문제 수 변경 시 기본값 재설정
    React.useEffect(() => {
        setDefaultValues(formData.totalQuestions);
    }, [formData.totalQuestions]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === "totalQuestions" ? parseInt(value) || 0 : value
        }));
    };

    const handleQuestionInputChange = (
        field: 'correctAnswers' | 'questionScores' | 'questionTypes',
        questionNumber: number,
        value: string | number
    ) => {
        setFormData(prev => ({
            ...prev,
            [field]: {
                ...prev[field],
                [questionNumber]: value
            }
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const newExam = await examApi.createExam(formData);
            createExam(newExam);

            // 폼 초기화
            setFormData({
                examName: "",
                totalQuestions: 45,
                correctAnswers: {},
                questionScores: {},
                questionTypes: {}
            });
            window.location.href = "/main/exam";
        } catch (error) {
            console.error("시험 생성 실패:", error);
            alert("시험 생성에 실패했습니다.");
        }
    };

    const generateQuestionInputs = () => {
        const inputs = [];
        for (let i = 1; i <= formData.totalQuestions; i++) {
            inputs.push(
                <div key={i} className="flex items-center space-x-2 p-2 border rounded hover:bg-gray-50">
                    <span className="w-8 text-sm font-medium text-gray-700">{i}번</span>

                    <select
                        value={formData.correctAnswers[i] || ''}
                        onChange={(e) => handleQuestionInputChange('correctAnswers', i, e.target.value)}
                        className="border rounded px-2 py-1 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        required
                    >
                        <option value="">정답</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select>

                    <input
                        type="number"
                        placeholder="배점"
                        value={formData.questionScores[i] || ''}
                        onChange={(e) => handleQuestionInputChange('questionScores', i, parseInt(e.target.value) || 0)}
                        className="border rounded px-2 py-1 text-sm w-16 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        min="1"
                        max="10"
                        required
                    />

                    <select
                        value={formData.questionTypes[i] || ''}
                        onChange={(e) => handleQuestionInputChange('questionTypes', i, e.target.value)}
                        className="border rounded px-2 py-1 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        required
                    >
                        <option value="">유형</option>
                        <option value="듣기">듣기</option>
                        <option value="기초유형">기초유형</option>
                        <option value="내용파악">내용파악</option>
                        <option value="빈칸">빈칸</option>
                        <option value="순서">순서</option>
                        <option value="삽입">삽입</option>
                        <option value="어법">어법</option>
                        <option value="어휘">어휘</option>
                    </select>
                </div>
            );
        }
        return inputs;
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">시험 추가</h1>

            <form onSubmit={handleSubmit} className="space-y-6 w-full">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium mb-2">
                            시험명
                        </label>
                        <input
                            type="text"
                            name="examName"
                            value={formData.examName}
                            onChange={handleInputChange}
                            required
                            className="w-full p-2 border border-gray-300 rounded"
                            placeholder="시험명을 입력하세요"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2">
                            문제 수
                        </label>
                        <input
                            type="number"
                            name="totalQuestions"
                            value={formData.totalQuestions}
                            onChange={handleInputChange}
                            required
                            min="1"
                            max="100"
                            className="w-full p-2 border border-gray-300 rounded"
                            placeholder="45"
                        />
                    </div>
                </div>

                {/* 문제별 설정 */}
                <div>
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-semibold">문제별 정답 및 배점 설정</h3>
                        <button
                            type="button"
                            onClick={() => setDefaultValues(formData.totalQuestions)}
                            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 text-sm font-medium transition-colors duration-200"
                        >
                            기본값으로 재설정
                        </button>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 max-h-96 overflow-y-auto p-4 border rounded bg-white">
                            {generateQuestionInputs()}
                        </div>
                        <p className="text-sm text-gray-600 mt-2">
                            총 {formData.totalQuestions}문제 설정 완료 (기본값: 정답 1번, 배점 2점/3점, 유형 듣기)
                        </p>
                    </div>
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white p-3 rounded hover:bg-blue-600"
                >
                    시험 생성
                </button>
            </form>
        </div>
    );
};

export default Grading;