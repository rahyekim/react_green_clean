/*
추상클래스  : 선언만 있고, 구현(내용)이 없는 메서드 // "⭐공통 기능 + 강제 구현⭐"
특징
1) 하나이상의 추상메서드를 가짐
2) 직접 객체를 만들수없음
 */
abstract class Vehicle{
    String name ; //이름 저장할 인스턴스 변수 (공통)
    
    abstract public String getName(String val);  //(강제)
    //body가 없다는건 구현부가 없다는 말 추상메서드...
    
    public String getName(){ // (공통) 일반메서드 
        return "Vehicle name: " + name;
    }
}   

class Car extends Vehicle{
    
    public Car(String val){
         name = val; //this.name = val해도됨

    }
    //강제되는 부모클래스의 오버라이딩(재정의) 추상메서드
    public String getName(String val){
        return "Car name: "+ val;
    }
    //메서드 오버로딩
    public String getName(byte val[]){
        return "Car name: "+ val;
    }
}



public class Abs {
    
    public static void main(String[] args) {
        
        Vehicle v = new Car("Morning");

        System.out.println(v.getName());
    }
}
