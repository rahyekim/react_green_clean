//추상클래스
abstract class Animal{
    
    //추상메서드 : 본문이없다.
    public abstract void animalSound(); //몸통이 없는 함수 선언

    public void sleep(){
        System.out.println("zzzzzZ");
    }

}
//서브클래스
class Dog extends Animal{
    public void animalSound(){
        System.out.println("--------");
    }
}

public class Abs_10 {
    public static void main(String[]ags){

    }
}

/*
추상클래스: 객체를 생성할 수 없다 
👉 추상 메서드는 “이 기능은 꼭 있어야 한다”는 약속(규칙): 설계용, 기능은있어야하지만 내용은알아서
추상메서드: 추상클래스에서만 사용할 수 있고 본문이 없다
아파치서브버젼(메이븐, 그래들)
xml=> class=> interface=> controller
*/
