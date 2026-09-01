'use client'

import { useState } from "react"

import { Layout } from "@/app/components/layout/Layout";
import * as S from "../DashBoard.styled";
import {Row,Col, Card,Form,Button} from 'react-bootstrap'
import axios from "axios";


axios.defaults.withCredentials=true;

export default function AdoptionCampaignAdmin(){

    const [formData, setFormData]=useState({

        hashtag:'',
        title:'',
        content: '',
        thumbnailUrl:'',
        mediaType:'IMAGE',
        mediaUrl:'',

    })
    

    const extraYoutubeId = (url:string)=>{

        if(!url.trim()) return null;
        // https://youtu.be/69VM6rezLEI?si=PDleP-fmcM9tZ4Yg
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;

        const match = url.match(regExp)

        return (match && match[2].length===11) ? match[2] : null;
        
    }
    


const handleChange = (e:React.ChangeEvent<any>)=>{

    const {name, value} =e.target;

    setFormData(prev=> {
        const newdata = {
            ...prev, [name]: value
        }

        if(name ==='mediaType'){
            newdata.mediaUrl='';
        }

        if(name==='mediaUrl' && newdata.mediaType ==='YOUTUBE'){
            const videourl = extraYoutubeId(value);
        }
    })
}

}

const getFullImgUrl = (url:string)=>{
    if(!url) return 'http://'
    if(url.startsWith('/uploads/')){
        return `http://localhost:8080${url}`
    }
    return url;
}
