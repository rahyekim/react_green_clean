import express from "express";
import cors from 'cors'
import dotenv from 'dotenv'
import { AppDatasource } from "./config/data-source";
import { WorkOrder } from "./entities/WorkOrder";


dotenv.config();

const app = express();

const PORT = process.env.PORT || 4000;

//미들웨어
app.use(cors());
app.use(express.json());

AppDatasource.initialize()
.then(()=>{

    console.log('데이터베이스 성공적으로 연결..🏖️')
    
    //조회테스트 api
    app.get('/api/work-orders', async(req,res)=>{
        const WorkOrderRepo = AppDatasource.getRepository(WorkOrder);
        const orders = await WorkOrderRepo.find();
        res.json(orders);
    });

    app.listen(PORT, ()=>{
        console.log(`🚀 MES Server running on http://localhost:${PORT}`);
    })
}).catch((err)=> console.error('연결 실패',err))
