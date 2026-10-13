import { error } from "console";

export const theme ={
    colors:{
        background: '#536692',
        primary: '#4e73df',
        text: '#333',
        header: '#1e293b',
        title: '#1e293b',
        pageTitle: '#3a3b45',
        label:'#475569',

        alertModal: '#1e293b',
        alertModaltxt: '#fff',

        mobilenav: '#334155',

        alert: '#ef4444',
        alertHover: '#dc2626',

        error: '#dc2626',

        btnPrimary: '#3b5998',
    }
}

export type Theme = typeof theme;