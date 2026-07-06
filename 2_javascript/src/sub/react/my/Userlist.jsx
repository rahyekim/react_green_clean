


export default function  Userlist ({users, onDelete}){

    return(
        <>
<h2>📚 회원 목록</h2>

    {users.length === 0 ? (<p> 등록된 회원 없음</p>) :

    (users.map(user=>(
       <div key={user.id}>
        <p>
          이름: {user.name}
        </p>
        <p>
          과일: {user.fruit}
        </p>
        <p>
          동의: {user.agree ? "0" : "X"}
        </p>
        <button onClick={()=>onDelete(user.id)}> 삭제 </button>
      <hr />
       </div>
    ))
   )
  }
</>);

  
}
