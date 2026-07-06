

export default function Form ({form,onChange,onSubmit}){

  return(
    <>
<h1 style={{padding: '20px'}}> 📢회원등록</h1>
<form onSubmit={onSubmit}>
  <label >이름:</label>
  <input placeholder="이름"
    type="text" name="name" onChange={onChange} value={form.name}/>
<h3 style={{padding: "10px"}}> 좋아하는 과일 🍇 </h3>

<label>
  <input type="radio" 
    checked={form.fruit === "apple"} 
    name="fruit" 
    value="apple"
    onChange={onChange}
  />
🍎사과</label>

<label >
  <input type="radio"
  name="fruit"
  value="banana"
  checked={form.fruit === "banana"}
  onChange={onChange}
   />🍌바나나</label>
  
  <label>
    <input type="radio"
    name="fruit"
    value="pineapple"
    checked={form.fruit === "pineapple"}
    onChange={onChange}
     />
    파인애플🍍</label>
  <br />
 
  <label>
    <input 
    type="checkbox" 
    name="agree"
    checked={form.agree}
    onChange={onChange}
    />
    동의합니다</label>
    <button
    style={{ padding: "10px",borderRadius:"10px", border:"2px solid blue"}} 
    type="submit">등록</button>
</form>
</>
  )
};