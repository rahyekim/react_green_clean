'use server';

import { createProcessLine } from "@/api/http";
import { revalidatePath } from "next/cache";
import { IsEmpty } from "./validators";

export const createProcessLineAction= async(formData: FormData)=>{

    //값 추출
    const lineName =formData.get('lineName') as string;
    const processType = formData.get('processType') as string;
    const currentProduct = formData.get('currentProduct') as string;
    const operator = formData.get('operator') as string;

    //Record<string, string>{ lineName: "에러메시지", processType: "에러메시지" }
    const errors :Record<string, string>= {};
    if(IsEmpty(lineName)) errors.lineName = '라인명을 입력해주세요';
    if(IsEmpty(processType)) errors.processType = '공정 타입을 입력해주세요';
    if(IsEmpty(currentProduct)) errors.currentProduct = '생산 모델을 입력해주세요';
    if(IsEmpty(operator)) errors.operator = '담당자를 입력해주세요';
    
    //Object.keys()로 개수를 체크
    if(Object.keys(errors).length > 0){
        return { success:false, errors };
    }
    try{
        await createProcessLine(formData);
        //새로고침(pth 재평가)
        revalidatePath('/admin/process')
        
        return {success:true};
        
    }catch(error){
        console.error('공정라인등록실패: ',error)
        return {success:false, message: '등록에 실패했습니다.'}
    }
    
}