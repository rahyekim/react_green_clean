public class Encap_6 { //캐술화가 필요한 이유? 반복되는 일상에서 편리하게 하기위한 기준...
    
/*캡슐화 민감한 데이터가 사용자에게 노출되지 않도록 하는것 

getter 있는 값을 리턴
setter 값을 세팅 => 리액트의 친척: useState
*/

    private int age ; //아무나 접근 못하게 
    private String name;

    //getter : 있는 값 리턴
    public int getAge(){
        return age;
    }

    public String getName(){
        return name;
    }

    //setter 
    public void setAge(int newAge) {
        this.age= newAge;

    }
    public void setName(String newName){
        this.name = newName;
    }
    
  
}
