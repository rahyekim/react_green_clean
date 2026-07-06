/*
Polymorphism
다양한 형태 상속을 통해 서로 연관된 클래스가 있을 떄 발생
(ex) 동물의 소리가 각각 다르게 형성할 때 사용
상속 다형성 오버라이딩....
내용물로 채워 부모타입으로 자식객체를 담는 것이 다형성의 시작
*/

class Animal{ // 가장 기본이 되는 부모 설계도 
    public void animalSound(){
        System.out.println("어흥");
    }
}

class Pig extends Animal {

    public void animalSound(){
        System.out.println("돼지는 꿀꿀");
    }
}

class Cat extends Animal {

    public void animalSound(){
        System.out.println("고양이는 야옹");
    }
}

public class Poly_8 {
    
    public static void main(String[] args){
        
        //아래는 객체화
        Animal myAnimal = new Animal();
        Animal myPig = new Pig();
        Animal myCat = new Cat();
       // 내용물로 채워 부모타입으로 자식객체를 담는 것이 다형성의 시작
        myAnimal.animalSound();
        myCat.animalSound();
        myPig.animalSound();

    }
    
    
    
}
