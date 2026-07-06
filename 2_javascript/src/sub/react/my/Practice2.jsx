import { useState } from "react";
import Userlist from "./Userlist";
import Form from "./Form"

export default function Mypractice() {

  const [form, setForm] = useState({
    name:"",
    fruit:"",
    agree:false
  });

  const [users, setUsers] = useState([]);

  const handleChange = (e)=>{
    const {name, value, type, checked} = e.target;

    setForm(prev=>({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }))

  };

  const handleSubmit = (e) => {

    e.preventDefault();

    setUsers(prev => [
      ...prev,
      {
        id: Date.now(), //new Date()??
        ...form
      }
    ]);

    setForm({
      name: "",
      fruit: "",
      agree: false
    });
  };

  const handleDelete = (id) => {
    setUsers(prev => (
      prev.filter(user=> user.id !==id)
    ));
  }

  return(
    <>
    <Form
    form={form}
    onChange={handleChange}
    onSubmit={handleSubmit}
    />
    <Userlist
     users={users}
     onDelete={handleDelete}/>
    </>
  )
  
  
  
  
}