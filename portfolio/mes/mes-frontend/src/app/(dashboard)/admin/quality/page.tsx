'use client';

import { useState, useEffect } from "react";

import Button from "@/ui/Button";
import Input from "@/ui/Input";
import { useAlertStore } from "@/store/useAlertStore";
import { LineGrid,LineCard,StatusBadge, CardHeader, CardBody, ButtonGroup, QualiCard } from '@/assets/css/admin/admin.style'
import {
    LtRtLayout,
    LeftPanel,RightPanel, Form, Title,
    FormWrapper,
    SubmitBtnWrapper
} from '@/assets/css/Style.style'
import { createInspection, fetchInspection } from "@/api/http";
import { Select } from "@/ui/Select/Select";

interface InspectionItem {
    id: number;
    serialNumber: string;
    inspectionType: string; //'VISION_SCRATCH' |  'WATERPROOF_TEST';
    result: string; //"PASS"| "FAIL";
    defectReason: string;
    inspector:string;
}
const INITIAL_STATE={
    serialNumber:'',
    inspectionType: 'VISION_SCRATCH',
    result:'PASS',
    defectReason:'',
    inspector:"AI-Vision-Unit-01"
}

const TYPE_OPTIONS=[
    {label: '미세 스크래치 비전 검사', value:'VISION_SCRATCH'},
    {label: '방수 씰링 기밀 검사', value:'WATERPROOF_TEST'},
]

const RESULT_OPTION=[
    {label: '양품' , value:'PASS'},
    {label: '불량' , value:'FAIL'},
]
export default function Quality(){

    const {showAlert} =useAlertStore();
    const [inspections, setInspection] = useState<InspectionItem[]>([]);
    const [form ,setForm]=useState(INITIAL_STATE);

    const [openSelectId, setOpenSelectId]=useState<string|null>(null);

    useEffect(()=>{
        loadInspections();
    }, [])

    const loadInspections = async()=>{
        try{
            const data= await fetchInspection();
            if(data.success){
                setInspection(data.inspections);
            }
        }catch(err){
            console.error("품질 검사 조회 실패", err);
            showAlert('잠시후 다시 시도해주세요')
        }
    }

     const handleChange = (e:React.ChangeEvent<HTMLInputElement | HTMLSelectElement>)=>{
            const { name ,value } = e.target;
            setForm(prev=> ({
                ...prev,
                [name]: value,
            }))
        }
        const handleSubmit = async (e:React.FormEvent<HTMLFormElement>)=>{
            e.preventDefault();
            
            try{
                const data = await createInspection(form);

                showAlert('품질 검사 결과가 등록되었습니다.');
                setForm(INITIAL_STATE); //초기화
                loadInspections();
    
            }catch(err){
                showAlert('잠시후 다시시도해주세요');
            }
        }

    return(
        <>
        <LtRtLayout>
            <LeftPanel>
                <FormWrapper>
                <Title>AI 비전 품질 검사 입력</Title>
                <Form onSubmit={handleSubmit}>
                    <Input
                    type="text"
                    name="serialNumber"
                    placeholder="기기 시리얼 번호 (S/N)"
                    value={form.serialNumber}
                    onChange={handleChange}
                    />
                    {/* 검사 타입 선택 셀렉트박스 */}
                    <Select id='type' openSelectId={openSelectId} 
                    setOpenSelectId={setOpenSelectId}
                    options={TYPE_OPTIONS} value={form.inspectionType}
                    onChange={(newValue)=>setForm(prev=>({...prev, inspectionType: newValue}))}>
                        <Select.Toggle/>
                        <Select.Menu/>
                    </Select>
                    {/* 검사 판정 결과 선택 셀렉트박스 (PASS / FAIL) */}
                    <Input
                    type="text"
                    name="defectReason"
                    placeholder="불량 사유 (불량일 경우 입력)"
                    value={form.defectReason}
                    onChange={handleChange}
                    />
                    <Select
                    id='result' openSelectId={openSelectId} setOpenSelectId={setOpenSelectId}
                    options={RESULT_OPTION} value={form.result}
                    onChange={(newValue)=>setForm(prev=>({...prev, result: newValue}))}>
                        <Select.Toggle/>
                        <Select.Menu/>
                    </Select>
                    <SubmitBtnWrapper>
                        <Button fullWidth type="submit">검사 결과 전송</Button>
                    </SubmitBtnWrapper>
                </Form>
                </FormWrapper>
            </LeftPanel>

            <RightPanel>
                <Title>비전 검사 이력 로그</Title>
                <LineGrid>
                {inspections.map(item=>{
                    const isPass = item.result === 'PASS'
                    return(
                    <LineCard key={item.id} $status={item.result} >
                        <CardHeader>
                            <strong>S/N: {item.serialNumber}</strong>
                            <StatusBadge 
                                $status={item.result}>
                                <p>{item.result}</p>
                            </StatusBadge>
                        </CardHeader>
                        <CardBody>
                            {item.inspectionType}
                            {!isPass && item.defectReason && (
                                <p>사유: {item.defectReason}</p>
                            )}
                        </CardBody>
                    </LineCard>
                )})}
                </LineGrid>
            </RightPanel>
        </LtRtLayout>
        </>
    )
}