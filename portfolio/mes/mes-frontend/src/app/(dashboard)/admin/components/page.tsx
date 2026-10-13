'use client';

import { useState, useEffect } from "react";
import axios from "axios";

import Button from "@/ui/Button";
import Input from "@/ui/Input";
import { useAlertStore } from "@/store/useAlertStore";
import {CardBody, CardHeader, ErrorText, LineCard, LineGrid, StatusBadge} from '@/assets/css/admin/admin.style'
import {
    AdminLayout,
    LeftPanel,RightPanel, Form, Title,
    FormWrapper
} from '@/assets/css/Style.style'
import { createComponent, fetchComponents } from "@/api/http";

interface ComponentItem{
    id:number;
    componentName:string; 
    category:string;
    stockQuantity:number; 
    minThreshold:number;
    supplier:string;
    status: 'WARNING' | 'NORMAL';
}
const INITIAL_STATE={
    componentName:'', 
    category:'', 
    stockQuantity:0, 
    minThreshold:100, 
    supplier:'',
    status: 'NORMAL'
}

export default function Components(){
    const {showAlert} =useAlertStore();

    const [components, setComponents] =useState<ComponentItem[]>([]);
    const [form, setForm]= useState(INITIAL_STATE);

    const loadComponents = async()=>{
        try{
            const data = await fetchComponents();
            if(data.success){
                setComponents(data.components);
            }
        }catch(error:any){
            console.error('SCM 조회 실패:', error);
            const errMsg = error.response?.data?.message || error.message || '잠시후 다시시도해주세요'
            showAlert(errMsg);
        }
    }
    useEffect(()=>{
        loadComponents();
    },[])

    const handleChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
    const { name ,value, type } = e.target;
        setForm(prev=> ({
            ...prev,
            [name]: type=== 'number' 
            ? (value === '' ? 0 : Number(value) )
            : value,
        }))
        }
    const handleSubmit = async(e:React.FormEvent)=>{
        e.preventDefault();
        try{
            await createComponent(form);
            showAlert('자재 정보가 등록되었습니다.')
            setForm(INITIAL_STATE);
            loadComponents();
        }catch(error){
            showAlert('잠시 후 다시시도해주세요')
        }
    }
    return(
        <>
         <AdminLayout>
            <LeftPanel>
                <FormWrapper>
                <Title>부품 SCM 등록</Title>
                <Form onSubmit={handleSubmit}>
                    <Input
                    type="text"
                    name="componentName"
                    placeholder="부품명 (예: A19 Pro AP Chip)" 
                    value={form.componentName} 
                    onChange={handleChange}
                    />

                    <Input
                    type="text"
                    name="category"
                    placeholder="카테고리 (CHIP, CAMERA 등)" 
                    value={form.category} 
                    onChange={handleChange}
                    />

                    <Input
                    type="number"
                    name="stockQuantity"
                    min='0'
                    label="현재 재고 수량" 
                    value={form.stockQuantity} 
                    onChange={handleChange}
                    />

                    <Input
                    min='0'
                    type="number"
                    name="minThreshold"
                    label="안전 재고 임계값" 
                    value={form.minThreshold} 
                    onChange={handleChange}
                    />

                    <Input
                    type="text"
                    name="supplier"
                    placeholder="협력사 (Supplier)" 
                    value={form.supplier} 
                    onChange={handleChange}
                    />

                    <Button>자재 등록</Button>
                </Form>
                </FormWrapper>
            </LeftPanel>

            <RightPanel>
                <Title>핵심 부품 공급망(SCM) 현황</Title>
                <LineGrid>
                    {components.map(item=>{
                        const isWarning = item.stockQuantity <= item.minThreshold;
                        const currentStatus = isWarning ? 'WARNING' : item.status;
                        return(
                        <LineCard key={item.id} $isWarning={isWarning} >
                            <CardHeader>
                                <strong>{item.componentName}</strong>
                                <StatusBadge $status={currentStatus}>
                                    {item.status}
                                </StatusBadge>
                            </CardHeader>
                            <CardBody>
                                <p>카테고리: {item.category}</p>
                                <p>공급사: {item.supplier}</p>
                                <p>재고: {item.stockQuantity}개</p>
                                <p>안전기준: {item.minThreshold}개</p>
                            </CardBody>
                        </LineCard>
                        )
                    })}
                </LineGrid>
            </RightPanel>
        </AdminLayout>
        </>
    )
}