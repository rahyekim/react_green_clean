'use client';

import { use, useState } from "react";
import axios from "axios";
import Input from "@/components/ui/Input";
import { DashTitle } from "@/assets/css/admin/Dash.style";
import Button from "@/components/ui/Button";

const MOCK_CUSTOMERS = [
  { id: 1, name: '김민지', phone: '010-1234-5678', birth: '950101' },
  { id: 2, name: '김민지', phone: '010-9876-5432', birth: '921231' }, // 동명이인 구별용 정보 필수!
  { id: 3, name: '이서준', phone: '010-5555-4444', birth: '880515' },
];
interface customer{
    id: number;
    name: string;
    phone: string;
}
export default function Reservation (){
    
    const [step, setStep]=useState(1);
    const [seletedCustomer, setSeletedCustomer]=useState('');
    const [searchTerm, setSearchTerm]=useState('');
    const [isDropDownOpen, setIsDropDownOpen]=useState(false);
    const [customers, setCustomers]=useState<customer[]>([]);

    const handleSearch = async()=>{
        const response = await axios.post('/api/reservation/search', searchTerm);
        if(response.data.success){
            setCustomers(response.data.customers);
            if(customers.length > 0) {
                setIsDropDownOpen(true);
            }
        }
    }

    const handleSelect = ()=>{

    }
    
    return(
        <>
        {step === 1 && (
            //검색창
            <>
            <div>고객 예약</div>
            <div>
                <input
                type="text"
                placeholder="고객 성함 또는 연락처"
                value={searchTerm}
                onChange={e=>{
                    setSearchTerm(e.target.value);
                    setIsDropDownOpen(true);
                }}
                onKeyDown={e=> { 
                    if(e.key === 'Enter') 
                }}
                />
                {/* 검색아이콘 버튼 */}
                <button onClick={handleSearch}>검색</button>
            </div>

            {isDropDownOpen && (
                <ul>
                    {customers.map(customer=>(
                        <li key={customer.id} onClick={()=>handleSelect(customer.id)}>
                            {customer.name}({customer.phone})
                        </li>
                    ))}
                </ul>
            ) }
            
            {customers.length===0 && (
                <p>등록된 고객이 없습니다</p>
            )}
             </>
        )}
        
        </>
    )
}



/*
하나의 페이지(page.tsx) 안에서 step 상태(1, 2, 3)를 관리하는 '위자드(Wizard)
3단계 컴포넌트 플로우 구조
Parent Page (app/admin/reservation/new/page.tsx)

step 상태 (1 | 2 | 3) 관리

선택된 고객 정보(selectedCustomer)와 선택된 시술 목록(selectedTreatments)을 state로 쭉 들고 다니면서 다음 단계로 넘겨줌!

[컴포넌트 1] 고객 검색 및 선택
동작: 검색창에 이름을 치면 아래로 드롭다운(또는 깔끔한 리스트 오버레이)이 뜸.

동명이인 처리: 이름뿐만 아니라 전화번호 뒷자리나 생년월일을 같이 표기해주면 데스크 직원이 실수하지 않고 완벽하게 구별할 수 있음.

결과: 특정 고객을 클릭하면 step = 2로 넘어가면서 해당 고객의 ID를 저장.

[컴포넌트 2] 진행 중인 시술 선택 (다중 선택 카드)
동작: API로 해당 고객의 현재 진행 중인 시술 목록을 조회해 옴.

UI: 카드 형태로 시술명 | 3/5회차 | Note가 뜨고, 앞에 체크박스가 붙어 있음.

다중 시술: 시술이 2개면 둘 다 체크해서 "함께 예약하기" 버튼을 누를 수 있음.

결과: 체크된 시술 정보들을 들고 step = 3으로 이동.

[컴포넌트 3] 날짜 및 타임슬롯 선택 + 최종 완료
동작: 달력에서 날짜를 고르고, 30분 단위 시간 슬롯(예: 09:30, 10:00...) 중 하나를 클릭.

결과: "예약 완료" 버튼을 누르면 서버로 데이터(고객ID + 시술ID들 + 예약 날짜/시간)를 한 번에 쏘고 예약 성공 팝업 띄우기!



 */