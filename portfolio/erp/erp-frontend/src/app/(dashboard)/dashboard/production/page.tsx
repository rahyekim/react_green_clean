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
// const DUMMY_DATA : ProductionOrder[] = [
//     { id: "PRD-2023-001", productName: "알루미늄 프레임 A형", quantity: 500, status: "progress", progress: 65, dueDate: "2023-11-20" },
//     { id: "PRD-2023-002", productName: "공업용 모터 250W", quantity: 120, status: "planning", progress: 0, dueDate: "2023-11-25" },
//     { id: "PRD-2023-003", productName: "제어용 메인보드 v2", quantity: 300, status: "completed", progress: 100, dueDate: "2023-11-15" },
//     { id: "PRD-2023-004", productName: "스틸 하우징 케이스", quantity: 1000, status: "progress", progress: 30, dueDate: "2023-12-01" },
// ]
export default function Production(){

    const [orders, setOrders]=useState<ProductionOrder[]>([]);

    const getBadgeStyle = (status:string)=>{
        switch(status){
            case 'progress' : return { bg: 'bg-primary', text: '생산중'};
            case 'completed' : return { bg: 'bg-success', text: '생산완료'};
            case 'planning' : 
            default: return { bg: 'bg-secondary', text: '생산 대기'};

        }
    }

    return(
        <LtRtLayout>
            <div className="container-fluid mw1400">
            {/* <div className={`container-fluid py-4 ${styles.container}`}> */}
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
                                <h3 className='text-success mb-2'>
                                      2건
                                </h3>
                            </div>
                        </div>
                    </div>
                     <div className="col-md-4">
                        <div className="card border-0 shadow-sm h-100">
                            <div className="card-body">
                                <h6 className='text-muted mb-2'>
                                    생산 대기
                                </h6>
                                <h3 className='text-muted mb-2'>
                                      1건
                                </h3>
                            </div>
                        </div>
                    </div>
                     <div className="col-md-4">
                        <div className="card border-0 shadow-sm h-100">
                            <div className="card-body">
                                <h6 className='text-muted mb-2'>
                                   이번 달 완료
                                </h6>
                                <h3 className='text-primary mb-2'>
                                      2건
                                </h3>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row mb-4 g-3">

                </div>

                 <div className="card border-0 shadow-sm">
        <div className="card-header bg-white py-3 fw-bold border-bottom">
          생산 오더 목록
        </div>
        <div className="card-body p-0">
          <div className="table-responsive">
            {/* table, table-hover: 마우스 올리면 하이라이트, align-middle: 세로 중앙 정렬 */}
            <table className="table table-hover align-middle mb-0">
              <thead className="table-light text-center">
                <tr>
                  <th className="px-3">오더 번호</th>
                  <th>제품명</th>
                  <th>수량</th>
                  <th>상태</th>
                  <th style={{ width: "25%" }}>진행률</th>
                  <th>납기일</th>
                  <th className="text-center">관리</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => {
                  const badge = getBadgeStyle(order.status);
                  
                  return (
                    <tr key={order.id} className='text-center'>
                      <td className="px-3 "><strong>{order.id}</strong></td>
                      <td>{order.productName}</td>
                      <td>{order.quantity.toLocaleString()} 개</td>
                      <td>
                        {/* rounded-pill: 둥근 알약 모양 뱃지 */}
                        <span className={`badge rounded-pill ${badge.bg} px-3 py-2`}>
                          {badge.text}
                        </span>
                      </td>
                      <td>
                        <div className="d-flex align-items-center gap-2">
                          <span className="small" style={{ minWidth: "35px" }}>
                            {order.progress}%
                          </span>
                          {/* 부트스트랩 기본 progress bar */}
                          <div className="progress flex-grow-1" style={{ height: "8px" }}>
                            <div 
                              className={`progress-bar ${order.status === 'completed' ? 'bg-success' : 'bg-primary'}`} 
                              role="progressbar" 
                              style={{ width: `${order.progress}%` }}
                              aria-valuenow={order.progress} 
                              aria-valuemin={0} 
                              aria-valuemax={100}
                            ></div>
                          </div>
                        </div>
                      </td>
                      <td>{order.dueDate}</td>
                      <td className="text-center">
                        {/* btn, btn-outline-secondary: 테두리만 있는 회색 버튼 */}
                        <button className="btn btn-outline-secondary btn-sm rounded-pill px-3 fw-bold">
                          상세보기
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
            </div>
        </LtRtLayout>
    )
}