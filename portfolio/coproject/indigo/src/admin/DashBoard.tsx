import React, { useEffect, useState } from "react"
import axios from "axios"
import {
    LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie, XAxis,YAxis,
    CartesianGrid, Tooltip, Legend, ResponsiveContainer,
    Cell
}from 'recharts'
import{
Container, Row, Col , Button, Card
}from 'react-bootstrap'
import { Layout } from "../components/layout/Layout"
import * as A from './DashBoard.styled'
import { stat } from "node:fs"

export const DashBoard:React.FC = ()=>{

    const [stats, setStats]=useState<any>(null);
    const [loading, setLoading]=useState(true);

    //파이차트 색상
    const COLORS =["#4e73df" , "#e74a3b"];

    useEffect(()=>{
        const fetchStats = async()=>{
            try{
                const res= await axios.get('http://localhost:5000/api/statistics');
                setStats(res.data);
            }catch(err){
                console.error("통계 데이터 불러오기 에러발생", err)
            }finally{
                setLoading(false);
            }
        }
        fetchStats();
    }, [])

    if(loading){
        return (
            <Layout>
                <A.AdminContainer>
                    통계 데이터를 불러오는 중입니다
                </A.AdminContainer>
            </Layout>
        )
    }
    //로딩이끝났는데 stats가 없다면
    if(!stats){
        return(
            <Layout>
                <A.AdminContainer>
                    데이터가 없습니다
                </A.AdminContainer>
            </Layout>
        )
    }
    //정상데이터가있을때 랜더링
    /* 마우스 올렸을때 tooltip 말풍선형태 팝업 */
    return(
        <>
        <Layout>
          <A.AdminContainer>
            <h1 className="h3 mb-4 text-gray-800 fw-bold">
                사이트 종합 통계
            </h1>
                {/* 상단요약카드 */}
            <Row className="mb-4">
                <Col xl={3} md={6} className="mb-4">
                    <Card className="border-left-primary shadow h-100 py-2">
                        <Card.Body>
                        <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                            총 문의 /클레임 량
                        </div>
                        <div className="h5 mb-0 font-weight-bold text-gray-800">
                            {stats.summary.totalInquiries}건
                        </div>
                        </Card.Body>
                    </Card>
                </Col>
                <Col xl={3} md={6} className="mb-4">
                    <Card className="border-left-success shadow h-100 py-2">
                        <Card.Body>
                            <div className="text-xs font-weight-bold text-success text-uppercase mb-1">
                                클레임 해결율
                            </div>
                            <div className="h5 mb-0 font-weight-bold text-gray-800">
                                {stats.summary.resolveRate}%
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            <Row>
                <Col xl={6} lg={6} className="mb-4">
                    <Card className="shadow mb-4">
                        <Card.Header className="py-3">
                            <h6 className="m-0 font-weight-bold text-primary">
                                월별 회원 가입 추이(실제 데이터)
                            </h6>
                        </Card.Header>
                        <Card.Body style={{height:'300px'}}>
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={stats.userSignups}>
                                    <CartesianGrid strokeDasharray="3 3"/>
                                    <XAxis dataKey="name"/>
                                    <YAxis/>
                                    <Tooltip/>
                                    <Legend/>
                                    <Line type="monotone" dataKey='가입자수' stroke="#4e73df"
                                    strokeWidth={3} activeDot={{r:8}}/>
                                </LineChart>
                            </ResponsiveContainer>
                        </Card.Body>
                    </Card>
                </Col>

                <Col xl={6} lg={6} className="mb-4">
                    <Card className="shadow mb-4">
                        <Card.Header className="py-3">
                            <h6 className="m-0 font-weight-bold text-success">
                                주간 접속량 (트래픽)
                            </h6>
                        </Card.Header>
                        <Card.Body style={{height:'300px'}}>
                            <ResponsiveContainer width="100%" height="100%" >
                                <AreaChart data={stats.traffic}>
                                    <CartesianGrid strokeDasharray="3 3"/>
                                    <XAxis dataKey='name'/>
                                    <YAxis/>
                                    <Tooltip/>
                                    <Area type='monotone' dataKey='접속량' 
                                    stroke="#1cc88a" fill="#1cc88a" fillOpacity={0.3}/>
                                </AreaChart>
                            </ResponsiveContainer>
                        </Card.Body>
                    </Card>
                </Col>

                {/* 일반문의 클레임양( bar chart) */}
                <Col xl={8} lg={7} className="mb-4">
                <Card>
                    <Card.Header>
                        <h6 className="m-0 font-weight-bold text-info">
                            주차별 문의 및 클레임 접수량
                        </h6>
                    </Card.Header>
                    <Card.Body style={{height:'300px'}}>
                        <ResponsiveContainer width="100%" height="100%">
                              <BarChart data={stats.inquiriesVsClaims}> 
                                    <CartesianGrid strokeDasharray="3 3"/>
                                    <XAxis dataKey='name'/>
                                    <YAxis/>
                                    <Tooltip/>
                                    <Bar dataKey='일반문의' fill="#36b9cc" radius={[6, 6, 0, 0]} />
                                    <Bar dataKey='클레임' fill="#f6c23e" radius={[6, 6, 0, 0]}/>
                                </BarChart>
                        </ResponsiveContainer>
                    </Card.Body>
                </Card>
                </Col>

                <Col xl={4} md={5} className="mb-4">
                    <Card className="shadow mb-4">
                        <Card.Header className="py-3">
                            <h6 className="m-0 font-weight-bold text-danger">
                                문의/클레임 해결 상태(실제데이터)
                            </h6>
                        </Card.Header>
                        <Card.Body style={{ height: '300px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <ResponsiveContainer>
                                <PieChart>
                                    <Pie
                                    activeShape={{
                                        outerRadius: 96, 
                                      }}
                                    data={stats.claimRate} cx='50%' cy='50%'
                                    innerRadius={60} outerRadius={90} paddingAngle={4}
                                    dataKey='value' 
                                    // label
                                    >{stats.claimRate.map((entry:any, idx:number)=>(
                                        <Cell key={`cell-${idx}`} fill={COLORS[idx % COLORS.length]}/>
                                    ))}</Pie>
                                    <Tooltip
                                    contentStyle={{
                                        backgroundColor: '#fff',
                                        borderRadius: '8px',
                                        border: '1px solid #e2e8f0',
                                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                                        fontSize: '13px',
                                        padding: '8px 12px',
                                      }}
                                      formatter={(value: any) => [`${value}건`, '건수']}
                                    />
                                    <Legend verticalAlign="bottom" height={36}/>  
                                </PieChart>
                            </ResponsiveContainer>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
          </A.AdminContainer>
          
          <A.GridRow>
                <A.CardColumn>
                    <A.StatCard $borderColor="#4e73df">
                        <A.CardBody>
                            <div className="">
                                <div
                                className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                                Earnings (Monthly)                                    
                                </div>

                                <div className="h5 mb-0 font-weight-bold text-gray-800">
                                    $4,000
                                </div>
                            </div>
                         
                            <div className="col-auto"> 
                                <i className="fas fa-calendar fa-2x text-gray-300"></i>
                            </div>
                        </A.CardBody>
                    </A.StatCard>
                </A.CardColumn>

                <A.CardColumn>
                    <A.StatCard $borderColor="#1cc88a">
                        <A.CardBody>
                            <div>
                                <div className="text-xs font-weight-bold text-success text-uppercase mb-1">
                                Earnings (Annual)                                    
                                </div>
                                 <div className="h5 mb-0 font-weight-bold text-gray-800">
                                    $215,000
                                </div>
                            </div> 
                        </A.CardBody>

                    </A.StatCard>
                </A.CardColumn>
            </A.GridRow>
        </Layout>
        </>
    )
}


/*
<A.PageHeader>
                <h1>DashBoard</h1>
                <a href="#"
                className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-lg"
                >
                    <i className="fas fa-download fa-sm text-white-50"></i>
                </a>
            </A.PageHeader>

            <A.GridRow>
                <A.CardColumn>
                    <A.StatCard $borderColor="#4e73df">
                        <A.CardBody>
                            <div className="">
                                <div
                                className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                                Earnings (Monthly)                                    
                                </div>

                                <div className="h5 mb-0 font-weight-bold text-gray-800">
                                    $4,000
                                </div>
                            </div>
                         
                            <div className="col-auto"> 
                                <i className="fas fa-calendar fa-2x text-gray-300"></i>
                            </div>
                        </A.CardBody>
                    </A.StatCard>
                </A.CardColumn>

                <A.CardColumn>
                    <A.StatCard $borderColor="#1cc88a">
                        <A.CardBody>
                            <div>
                                <div className="text-xs font-weight-bold text-success text-uppercase mb-1">
                                Earnings (Annual)                                    
                                </div>
                                 <div className="h5 mb-0 font-weight-bold text-gray-800">
                                    $215,000
                                </div>
                            </div> 
                        </A.CardBody>

                    </A.StatCard>
                </A.CardColumn>
            </A.GridRow>


 */