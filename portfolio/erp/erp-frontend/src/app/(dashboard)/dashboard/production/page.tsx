'use client';

import {useState} from 'react';
import { LtRtLayout } from '@/assets/css/Style.style';
import '@/assets/scss/styles.scss'; //일반적인 방법
import  styles from './production.module.css'

interface ProductionOrder{
    id: string;
    productName: string;
    quantity: number;
    status: 'planning' | 'progress' | 'completed';
    progress: number;
    dueDate: string;
}
const DUMMY_DATA : ProductionOrder[] = [
    { id: "PRD-2023-001", productName: "알루미늄 프레임 A형", quantity: 500, status: "progress", progress: 65, dueDate: "2023-11-20" },
    { id: "PRD-2023-002", productName: "공업용 모터 250W", quantity: 120, status: "planning", progress: 0, dueDate: "2023-11-25" },
    { id: "PRD-2023-003", productName: "제어용 메인보드 v2", quantity: 300, status: "completed", progress: 100, dueDate: "2023-11-15" },
    { id: "PRD-2023-004", productName: "스틸 하우징 케이스", quantity: 1000, status: "progress", progress: 30, dueDate: "2023-12-01" },
]
export default function Production(){

    const [orders, setOrders]=useState<ProductionOrder[]>(DUMMY_DATA);

    const getBadgeStyle = (status:string)=>{
        switch(status.toUpperCase()){
            case 'progress' : return { bg: 'bg-primary', text: '생산중'};
            case 'completed' : return { bg: 'bg-success', text: '생산완료'};
            case 'planning' : 
            default: return { bg: 'bg-secondary', text: '생산 대기'};

        }
    }

    return(
        <LtRtLayout>
            {/* <div className="container-fluid mw1200"></div> */}
            <div className={`container-fluid py-4 ${styles.container}`}>
                <h2 className='mb-4 fw-bold text-dark'>
                    생산관리
                </h2>
                <div className="row mb-4 g-3">
                    <div className="col-md-4">
                        <div className="card border-0 shadow-sm h-100">
                            <div className="card-body">
                                <h6 className='text-muted mb-2'>
                                    진행중인 오더
                                </h6>
                                <h3 className='text-muted mb-2'>
                                    
                                </h3>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </LtRtLayout>
    )
}