import { ChangeEvent, useEffect, useState } from "react";
import axios from 'axios'


interface BlogItem{
    id: number;
    previewUrl: string;
    file: File | null;
    date: string;
    text: string;
}

export default function BlogSetting (){

    const [rowCount, setRowCount]=useState<1|2>(1)
    
    const [blogs, setBlogs]=useState<BlogItem[]>(
        Array(6).fill(null).map((_,idx)=>({
            id:idx,
            previewUrl: "",
            file: null,
            date: "",
            text: '',
        }))
    );  

    useEffect(()=>{


        const fetchBlog =async()=>{

            try{

                const res= await axios.get("http://localhost:5000/api/settings/blog");
                if(res.data){
                    const row = Number(res.data.rowCount)
                    setRowCount(row ===2 ? 2:1)

                    const dbBlogs= res.data.blogs;
                    const initialBlogs= Array.from({length:6}).map((_,idx)=>{
                        if(dbBlogs[idx]){

                            return({
                                id:idx,
                                previewUrl:`http://localhost:5000${dbBlogs[idx].image_url}`,
                                file:null,
                                date:dbBlogs[idx].date_str ||'',
                                text: dbBlogs[idx].text_content || ''
                            })
                        }
                        return({id:idx, previewUrl:'',file:null, date:'', text:''})

                })
                }
                
            }catch(err){

            }
        }
    },[])

    const getTodayDate =()=>{
        const today = new Date();
        const options:Intl.DateTimeFormatOptions={
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        }
        return today.toLocaleDateString('en-US',options).toUpperCase();

    }


    const handleChangeFile= (idx:number, e:React.ChangeEvent<HTMLInputElement>)=>{

        const seletedFile = e.target.files?.[0];

        if (!seletedFile) return;

        const tempUrl = URL.createObjectURL(seletedFile);

        const newsBlogs = [...blogs];

        if(newsBlogs[idx].previewUrl) URL.revokeObjectURL(newsBlogs[idx].previewUrl);

        newsBlogs[idx]={
            ...newsBlogs[idx],
            previewUrl:tempUrl,
            file: seletedFile,
            date: newsBlogs[idx].date || getTodayDate(),
        };
        setBlogs(newsBlogs)

        e.target.value=''
    }
    
    const handleRowCountChange=(e:ChangeEvent<HTMLInputElement>)=>{
        setRowCount(Number(e.target.value) as 1|2)
    }

    const handleTextChange = (idx:number, value:string)=>{

        const newBlogs =[...blogs];

        newBlogs[idx].text= value;

        if(!newBlogs[idx].date && value.trim()!=='')
            newBlogs[idx].date= getTodayDate();

        if(!newBlogs[idx].file && value.trim()==='' && !newBlogs[idx].previewUrl){
            newBlogs[idx].date= '';
        }
        setBlogs(newBlogs);
    }

    const handleSave = async()=>{

        const formdata = new FormData();

        formdata.append('rowCount', String(rowCount));

        const blogsTosave = rowCount===1 ? blogs.slice(0,3) :blogs;

        blogsTosave.forEach((blog,idx)=>{

            const existingUrl = blog.file ? ''
            : blog.previewUrl.replace('http://localhost:5000', '')

            formdata.append('blogExistingImgs', existingUrl);

            if(blog.file){
                formdata.append('blogImgs',blog.file);
                // ⭐ 이 파일이 몇 번째 칸인지 같이 보냄
                formdata.append('blogImageIndexes', String(idx));
            }
            formdata.append('blogTexts', blog.text);
            formdata.append('blogDate', blog.date);
        })


    }

    
    return(
        <></>
    )
}



export const contactSetting= ()=>{

    const[contacts,setContacts]=useState<ContactItem[]>([])
    const [selectedIds, setSelectedIds]=useState<number[]>([]);


    const handleSelectAll= (e:React.ChangeEvent<HTMLInputElement>)={
        if(e.target.checked){
            setSelectedIds(contacts.map(c=>c.id))
        }
        else{
            setSelectedIds([])
        }
    }

    const handleSelectOne=(id:number)=>{

        if(selectedIds.include(id)){
            setSelectedIds(selectedIds.filter(selectedid=> selectedid !==id ))
        }
        else{
            setselectedIds([...selectedIds, id])
        }

    }

}
