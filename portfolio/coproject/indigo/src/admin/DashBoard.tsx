import React from "react"
import { Layout } from "../component/layout/Layout"
import * as A from './DashBoard.styled'

export const DashBoard:React.FC = ()=>{


    return(
        <>
        <Layout>
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
                    <A.StatCard borderColor="#4e73df">
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
                            {/* 아이콘 크기만큼만 차지*/}
                            <div className="col-auto"> 
                                <i className="fas fa-calendar fa-2x text-gray-300"></i>
                            </div>
                        </A.CardBody>
                    </A.StatCard>
                </A.CardColumn>

                <A.CardColumn>
                    <A.StatCard borderColor="#1cc88a">
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