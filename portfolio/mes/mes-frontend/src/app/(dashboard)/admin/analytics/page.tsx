'use client';

import { useState, useEffect } from "react";

import Button from "@/ui/Button";
import Input from "@/ui/Input";
import { useAlertStore } from "@/store/useAlertStore";
import { LineGrid,LineCard,StatusBadge, CardHeader, CardBody } from '@/assets/css/admin/admin.style'
import {
    LtRtLayout,
    LeftPanel,RightPanel, Form, Title,
    FormWrapper,
    SubmitBtnWrapper
} from '@/assets/css/Style.style'
import { createRecords, fetchRecords } from "@/api/http";
import { IsEmpty } from "@/lib/validators";

interface AnalyticsRecord {
    id: number;
    lineName: string;
    targetCount: number;
    actualCount: number;
    defectCount: number;
    yieldRate: number;
}

const INITIAL_STATE={
  lineName: "", 
  targetCount: 1000, 
  actualCount: 980, 
  defectCount: 20
}

const getYieldStatus = (rate:number)=>{
    if(rate >= 95) return 'NORMAL';
    if(rate >= 90) return 'WARNING';
    return 'DANGER';
}
export default function AnalyticsPage(){

    const {showAlert} =useAlertStore();
    const [records, setRecords] = useState<AnalyticsRecord[]>([]);
    const [form ,setForm]=useState(INITIAL_STATE);

    useEffect(()=>{
        loadRecords();
    }, [])

    const loadRecords = async()=>{
        try{
            const data= await fetchRecords();
            if(data.success){
                setRecords(data.records);
            }
        }catch(err){
            console.error("생산 실적 조회 실패", err);
            showAlert('잠시후 다시 시도해주세요')
        }
    }

     const handleChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
            const { name ,value } = e.target;
            setForm(prev=> ({
                ...prev,
                [name]: name === 'lineName'? value : Number(value),
            }))
        }
        const handleSubmit = async (e:React.FormEvent<HTMLFormElement>)=>{
            e.preventDefault();

            if(IsEmpty(form.lineName)){
                showAlert('라인명을 입력해주세요');
                return;
            }
            try{
                await createRecords(form);
                showAlert('생산 실적이 성공적으로 등록되었습니다.');
                setForm(INITIAL_STATE); //초기화
                loadRecords();
    
            }catch(err){
                showAlert('잠시후 다시시도해주세요');
            }
        }

    return(
        <>
        <LtRtLayout>
            <LeftPanel>
                <FormWrapper>
                <Title>생산 실적 및 수율 입력</Title>
                <Form onSubmit={handleSubmit}>
                    <Input
                    type="text"
                    name="lineName"
                    placeholder="라인명 (예: Line-A 공정)"
                    value={form.lineName}
                    onChange={handleChange}
                    />
                    <Input
                    type="number"
                    name="targetCount"
                    label="목표 생산량"
                    min='0'
                    value={form.targetCount}
                    onChange={handleChange}
                    />
                    <Input
                    type="number"
                    name='actualCount'
                    label="실제 양품 생산량"
                    min='0'
                    value={form.actualCount}
                    onChange={handleChange}
                    />
                   <Input
                    type="number"
                    min='0'
                    name='defectCount'
                    label="불량 대수"
                    value={form.defectCount}
                    onChange={handleChange}
                    />
                 
                    <SubmitBtnWrapper>
                        <Button fullWidth type="submit">실적 등록</Button>
                    </SubmitBtnWrapper>
                </Form>
                </FormWrapper>
            </LeftPanel>

            <RightPanel>
                <Title>실시간 통합 관제 대시보드 (수율 분석)</Title>
                <LineGrid>
                {records.map(item=>{
                    const yieldStatus = getYieldStatus(item.yieldRate) 
                    return(
                    <LineCard key={item.id} $status={yieldStatus}>
                        <CardHeader>
                            <strong>{item.lineName}</strong>
                            <div>
                                {/* <small>공정수율:</small> */}
                                <StatusBadge $status={yieldStatus}
                                style={{fontSize:'1.2rem'}} 
                                >{Number(item.yieldRate).toFixed(1)}%</StatusBadge> 
                            </div>
                        </CardHeader>
                        <CardBody>
                        <p>목표: {item.targetCount}</p>
                        <p>양품: {item.actualCount}</p>
                        <p>불량: {item.defectCount}</p>
                        </CardBody>
                    </LineCard>
                )})}
                </LineGrid>
            </RightPanel>
        </LtRtLayout>
        </>
    )
}