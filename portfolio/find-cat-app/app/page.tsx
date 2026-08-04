'use client'

import { useState,useEffect } from "react"
import { 
  MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody,
   MDBCardImage, MDBIcon 
} from 'mdb-react-ui-kit';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import HomeIcon from '@mui/icons-material/Home';
import PetsIcon from '@mui/icons-material/Pets';
import CampaignIcon from '@mui/icons-material/Campaign';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import PersonOutlineIcon from '@mui/icons-material/PersonOutlined';
import { error } from "console";

//1.스프링부트(백엔드)에서 넘어올 동물 데이터의 타입(Interface)정의

interface Animal{
  id:number;
  region: string;
  noticeNo: string;
  birthYear: string;
  gender: string;
  weight: number;
  imageUrl: string;
}


export default function HomePage (){
 
  //동물 리스트 상태관리
  const [animals, setAnimals]=useState<Animal[]>([]);
  const [isLoading, setIsLoading]= useState(true);

  useEffect(()=>{

    fetch('http://localhost:8080/api/animals/recommended')
    .then(res=> {
      if(!res.ok) throw new Error("네트워크 응답이 정상이 아닙니다");
      return res.json(); 
    }).then(data=> {
      setAnimals(data);
      setIsLoading(false);
    }).catch(err=> {
      console.error('API 호출에러: ', err);
      setIsLoading(false);
    })
    
  },[])

  
  
  return(
    <>
    
    </>
  )
}