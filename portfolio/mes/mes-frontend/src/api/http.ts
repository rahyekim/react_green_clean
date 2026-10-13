import { api } from "@/lib/axios";

//공정라인 목록조회
export const fetchProcessLines =async()=>{
    
    const response = await api.get('/api/process/lines')
    return response.data;
}

//공정라인 등록
export const createProcessLine = async (formData: any) => {
    
    const response = await api.post('/api/process/lines', formData);
    return response.data;
};

// 공정라인 상태변경
export const updateLineStatus = async (id: number, status: string) => {
    const response = await api.patch(`/api/process/lines/${id}/status`, { status });
    return response.data;
};

//SCM부품 조회

export const fetchComponents =async()=>{
    const response = await api.get('/api/scm/components')

    return response.data;
}

export const createComponent = async (formData: any) => {
    
    const response = await api.post('/api/scm/components', formData);
    return response.data;
};