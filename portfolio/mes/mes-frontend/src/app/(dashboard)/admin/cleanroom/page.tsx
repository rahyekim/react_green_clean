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
import { createEquipment, fetchEquipment } from "@/api/http";

interface EquipmentItem {
   id:number;
   equipmentName:string;
   cleanroomZone:string;
   temperature:number;
   humidity:number;
   status:string;
}

const INITIAL_STATE={
   equipmentName: "", 
   cleanroomZone: "Zone A (Class 100)", 
   temperature: 22.5, 
   humidity: 45.0, 
}

export default function Cleanroom(){

    const {showAlert} =useAlertStore();
    const [equipments, setEquipments] = useState<EquipmentItem[]>([]);
    const [form ,setForm]=useState(INITIAL_STATE);

    useEffect(()=>{
        loadEquipments();
    }, [])

    const loadEquipments = async()=>{
        try{
            const data= await fetchEquipment();
            if(data.success){
                setEquipments(data.equipments);
            }
        }catch(err){
            console.error("클린룸 설비 조회 실패", err);
            showAlert('잠시후 다시 시도해주세요')
        }
    }

     const handleChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
            const { name ,value } = e.target;
            setForm(prev=> ({
                ...prev,
                [name]: value,
            }))
        }
        const handleSubmit = async (e:React.FormEvent<HTMLFormElement>)=>{
            e.preventDefault();
            
            try{
                await createEquipment(form);

                showAlert('설비 상태가 성공적으로 등록되었습니다.');
                setForm(INITIAL_STATE); //초기화
                loadEquipments();
    
            }catch(err){
                showAlert('잠시후 다시시도해주세요');
            }
        }

    return(
        <>
        <LtRtLayout>
            <LeftPanel>
                <FormWrapper>
                <Title>클린룸 및 설비 등록</Title>
                <Form onSubmit={handleSubmit}>
                    <Input
                    type="text"
                    name="equipmentName"
                    placeholder="설비명 (예: CNC Machine #3)"
                    value={form.equipmentName}
                    onChange={handleChange}
                    />
                    <Input
                    type="text"
                    name="cleanroomZone"
                    placeholder="클린룸 구역"
                    value={form.cleanroomZone}
                    onChange={handleChange}
                    />
                
                    <Input
                    type="number"
                    step='0.1'
                    name='temperature'
                    label="온도 (℃)"
                    value={form.temperature}
                    onChange={handleChange}
                    />

                   <Input
                    type="number"
                    step='0.1'
                    name='humidity'
                    label="습도 (%)"
                    value={form.humidity}
                    onChange={handleChange}
                    />
                 
                    <SubmitBtnWrapper>
                        <Button fullWidth type="submit">상태 전송</Button>
                    </SubmitBtnWrapper>
                </Form>
                </FormWrapper>
            </LeftPanel>

            <RightPanel>
                <Title>클린룸 환경 및 설비 관제</Title>
                <LineGrid>
                {equipments.map(item=>{
                    return(
                    <LineCard key={item.id} $status={item.status} >
                        <CardHeader>
                            <strong>{item.equipmentName}</strong>
                            <StatusBadge $status={item.status}>
                                <p>{item.status}</p>
                            </StatusBadge>
                        </CardHeader>
                        <CardBody>
                            <p>구역: {item.cleanroomZone}</p>
                            <p>온도: {Number(item.temperature).toFixed(1)}℃</p> 
                            <p>습도: {Number(item.humidity).toFixed(1)}%</p>
                       
                        </CardBody>
                    </LineCard>
                )})}
                </LineGrid>
            </RightPanel>
        </LtRtLayout>
        </>
    )
}