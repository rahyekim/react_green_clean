'use client';

import { useState } from 'react';
import { LtRtLayout } from '@/assets/css/Style.style';
import '@/assets/scss/styles.scss';

interface Employee {
    id: string;
    name: string;
    department: string;
    role: string;
    status: "active" | "leave" | "resigned";
    joinDate: string;
}

const DUMMY_DATA: Employee[] = [
    { id: "EMP-001", name: "김철수", department: "개발팀", role: "수석 엔지니어", status: "resigned", joinDate: "2020-03-02" },
    { id: "EMP-002", name: "이영희", department: "인사팀", role: "팀장", status: "active", joinDate: "2019-11-15" },
    { id: "EMP-003", name: "박민수", department: "영업팀", role: "사원", status: "leave", joinDate: "2022-07-01" },
    { id: "EMP-004", name: "정지원", department: "디자인팀", role: "UI/UX 디자이너", status: "active", joinDate: "2021-05-20" },
];

export default function HrManagement() {
    const [employees, setEmployees] = useState<Employee[]>(DUMMY_DATA);

    const getStatusBadge = (status: string) => {
        switch (status) {
            case "active":
                return (
                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200/60">
                        <span className="w-1.5 h-1.5 mr-1.5 bg-emerald-500 rounded-full"></span>
                        재직중
                    </span>
                );
            case "leave":
                return (
                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-amber-50 text-amber-700 border border-amber-200/60">
                        <span className="w-1.5 h-1.5 mr-1.5 bg-amber-500 rounded-full"></span>
                        휴직
                    </span>
                );
            case "resigned":
                return (
                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-rose-50 text-rose-700 border border-rose-200/60">
                        <span className="w-1.5 h-1.5 mr-1.5 bg-rose-500 rounded-full"></span>
                        퇴사
                    </span>
                );
            default:
                return (
                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-gray-50 text-gray-700 border border-gray-200/60">
                        알 수 없음
                    </span>
                );
        }
    };

    return (
        <LtRtLayout>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                
                {/* 헤더 영역 */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                    <div>
                        <h2 className="text-2xl font-bold tracking-tight text-gray-900">인사 관리</h2>
                        <p className="text-sm text-gray-500 mt-1">임직원 정보 및 상태를 통합 관리합니다.</p>
                    </div>
                    <button className="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-medium text-sm py-2.5 px-4 rounded-xl shadow-sm hover:shadow transition-all">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                        </svg>
                        신규 직원 등록
                    </button>
                </div>

                {/* 요약 카드 영역 */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 transition-all hover:shadow-md">
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-sm font-medium text-gray-500">총 임직원 수</span>
                            <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                            </div>
                        </div>
                        <p className="text-3xl font-extrabold text-gray-900">{employees.length}<span className="text-lg font-normal text-gray-500 ml-1">명</span></p>
                    </div>

                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 transition-all hover:shadow-md">
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-sm font-medium text-gray-500">이번 달 신규 입사</span>
                            <div className="p-2.5 bg-indigo-50 text-indigo-600 rounded-xl">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                                </svg>
                            </div>
                        </div>
                        <p className="text-3xl font-extrabold text-gray-900">0<span className="text-lg font-normal text-gray-500 ml-1">명</span></p>
                    </div>

                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 transition-all hover:shadow-md">
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-sm font-medium text-gray-500">현재 휴직자</span>
                            <div className="p-2.5 bg-amber-50 text-amber-600 rounded-xl">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                        </div>
                        <p className="text-3xl font-extrabold text-amber-600">
                            {employees.filter(emp => emp.status === 'leave').length}<span className="text-lg font-normal text-gray-500 ml-1">명</span>
                        </p>
                    </div>
                </div>

                {/* 테이블 영역 */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/40">
                        <h3 className="font-semibold text-gray-800">임직원 목록</h3>
                        <span className="text-xs text-gray-400">총 {employees.length}명의 데이터</span>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-50/75 border-b border-gray-200 text-xs font-semibold uppercase tracking-wider text-gray-500">
                                    <th className="px-6 py-3.5">사번</th>
                                    <th className="px-6 py-3.5">이름</th>
                                    <th className="px-6 py-3.5">부서</th>
                                    <th className="px-6 py-3.5">직급/직책</th>
                                    <th className="px-6 py-3.5 text-center">상태</th>
                                    <th className="px-6 py-3.5">입사일</th>
                                    <th className="px-6 py-3.5 text-center">관리</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 text-sm">
                                {employees.map((emp) => (
                                    <tr key={emp.id} className="hover:bg-blue-50/30 transition-colors">
                                        <td className="px-6 py-4 text-gray-500 font-mono text-xs font-medium">{emp.id}</td>
                                        <td className="px-6 py-4 text-gray-900 font-bold">{emp.name}</td>
                                        <td className="px-6 py-4 text-gray-600">
                                            <span className="inline-block px-2 py-0.5 rounded bg-gray-100 text-gray-700 text-xs font-medium">
                                                {emp.department}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-gray-600">{emp.role}</td>
                                        <td className="px-6 py-4 text-center">{getStatusBadge(emp.status)}</td>
                                        <td className="px-6 py-4 text-gray-500 text-xs">{emp.joinDate}</td>
                                        <td className="px-6 py-4 text-center">
                                            <button className="text-gray-400 hover:text-blue-600 font-medium text-xs px-2.5 py-1.5 rounded-lg hover:bg-gray-100 transition-all">
                                                상세보기
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
        </LtRtLayout>
    );
}