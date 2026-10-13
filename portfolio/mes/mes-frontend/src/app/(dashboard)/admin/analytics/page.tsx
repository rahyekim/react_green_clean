'use client';

import { useState, useEffect } from "react";
import axios from "axios";

import Button from "@/ui/Button";
import Input from "@/ui/Input";
import { useAlertStore } from "@/store/useAlertStore";
import * as S from '@/assets/css/admin/admin.style'
import {
    CalendarLayout as Layout,
    LeftPanel,RightPanel, Form, Title
} from '@/assets/css/Style.style'

export default function Analytics(){

    return(
        <>
        <Layout>
            <LeftPanel>
            </LeftPanel>

            <RightPanel>
            </RightPanel>
        </Layout>
        </>
    )
}