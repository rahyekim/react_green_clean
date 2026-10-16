'use client';

import { useState, useEffect } from "react";

import Button from "@/ui/Button";
import Input from "@/ui/Input";
import { useAlertStore } from "@/store/useAlertStore";
import {
    LtRtLayout,
    LeftPanel,RightPanel, Form, Title,
    FormWrapper,
    SubmitBtnWrapper
} from '@/assets/css/Style.style'

import { LineGrid,LineCard,StatusBadge, CardHeader, CardBody, ButtonGroup,EmptyText } from '@/assets/css/admin/admin.style'
import { fetchProcessLines, updateLineStatus } from "@/api/http";
import { createProcessLineAction } from "@/lib/actions";
import Spinner from "@/ui/Spinner";

interface ProcessLine{
    id:number;
    lineName: string;
    processType: string;
    status: 'STOPPED' | 'MAINTENANCE' | 'RUNNING';
    currentProduct:string;
    operator:string;
}

export default function Process(){

    const {showAlert} =useAlertStore();

    const [isLoading, setIsLoading]=useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);

    
    const [lines, setLines]=useState<ProcessLine[]>([]);
    const [errors, setErrors]=useState<Record<string,string>>({});
    
    const loadLines = async ()=>{
        try{
            const data = await fetchProcessLines();
            if(data.success){
                setLines(data.lines)
            }
        }catch(error: any){
            console.error('공정 라인 조회 실패:', error);
            const errMsg = error.response?.data?.message || error.message || '잠시후 다시시도해주세요'
            showAlert(errMsg);
        }finally{
            setIsLoading(false);
        }
    }
    useEffect(()=>{
        loadLines();
    }, []);

    const handleSubmit = async (e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();

        setErrors({});
        
        const formElement = e.currentTarget; //부모: form엘리먼트그자체!
        const formData = new FormData(formElement);
        try{
            setIsSubmitting(true);
            const result = await  createProcessLineAction(formData);
            if(result.success){
                showAlert('공정라인이 등록되었습니다');
                formElement.reset();  //초기화
                loadLines();          //새로고침
            }else{
                setErrors(result.errors || {});
            }
        }catch(err){
            showAlert('잠시후 다시시도해주세요')
        }finally{
            setIsSubmitting(false);
        }
    }

    let content;

    if(isLoading){
        content= <Spinner/>
    }else if(lines.length===0){
        content= <EmptyText>등록된 공정 라인이 없습니다.</EmptyText>
    }else{
        content=(
            <LineGrid>
                {lines.map(line=>(
                    <LineCard key={line.id} $status={line.status}>
                        <CardHeader>
                            <strong>{line.lineName}</strong>
                            <StatusBadge $status={line.status}>
                                {line.status}
                            </StatusBadge>
                        </CardHeader>
                        <CardBody>
                            <div>공정: {line.processType || '미지정'}</div>
                            <div>모델: {line.currentProduct || '생산 모델 없음'}</div>
                            <div>담당자: {line.operator || '미배정'}</div>
                        </CardBody>

                        <ButtonGroup>
                        {line.status !== 'STOPPED' && (
                            <Button size="sm" variant="ghost"
                            onClick={async()=>{
                                await updateLineStatus(line.id, 'STOPPED');
                                loadLines();
                            }}
                            > 정지
                            </Button>
                        )}
                        {line.status !== 'RUNNING' && (
                            <Button size="sm"  variant="secondary"
                            onClick={async()=>{
                                await updateLineStatus(line.id, 'RUNNING');
                                loadLines();
                            }}
                            > 가동
                            </Button>
                        )}
                            {line.status !== 'MAINTENANCE' && (
                            <Button size="sm"  variant="outline"
                            onClick={async()=>{
                                await updateLineStatus(line.id, 'MAINTENANCE');
                                loadLines();
                            }}
                            > 점검
                            </Button>
                        )}
                        </ButtonGroup>
                    </LineCard>
                ))}
            </LineGrid>
        )
    }
    return(
        <LtRtLayout>
            {/*신규 공정 라인을 입력하고 등록하는 폼 영역 */}
            <LeftPanel>
                <FormWrapper>
                <Title>라인 공정 등록</Title>
                <Form onSubmit={handleSubmit} 
                onChange={()=>{
                    if(Object.keys(errors).length>0) setErrors({});
                }}>
                    <Input
                    type="text"
                    name="lineName"
                    placeholder="라인명 (예: AP SMT Line 1)"
                    error={errors?.lineName}
                    />
                    <Input
                    type="text"
                    name="processType"
                    placeholder="공정 타입 (예: SMT, CNC)"
                    error={errors?.processType}
                    />
                    <Input
                    type="text"
                    name="currentProduct"
                    placeholder="생산 모델 (예: iPhone Duo)"
                    error={errors?.currentProduct}
                    />
                    <Input
                    type="text"
                    name="operator"
                    placeholder="담당 오퍼레이터"
                    error={errors?.operator}
                    />

                    <SubmitBtnWrapper>
                        <Button isLoading={isSubmitting} fullWidth type="submit">
                            등록
                        </Button>
                    </SubmitBtnWrapper>
                </Form>
                </FormWrapper>
            </LeftPanel>

        {/* 우측 패널: 등록된 공정 라인들의 실시간 가동 상태를 보여주는 모니터링 영역 */}
            <RightPanel>
                <Title> iphone Duo 라인 가동 현황</Title>
                {content}
            </RightPanel>
        </LtRtLayout>
    )
}
