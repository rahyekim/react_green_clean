//다형성 method 오버라이딩 && 동적바인딩
class A{

    public void paint(){
        System.out.println("A");
        draw();

    }
    public void draw(){
        System.out.println("B"); //4
        draw(); //5
    }
}

class B extends A{

    public void paint(){
        super.draw(); //3 부모클래스 draw() 호출
        System.out.println("C"); //7
        this.draw(); //8
    }
    public void draw(){
        System.out.println("D"); //6 8
    }
}


public class Extension {
    
    public static void main(String[] args) {
        
        A b = new B(); //다형성
        b.paint(); //B D C D  
        b.draw(); //D

        /*
        부모클래스 A타입의 참조변수 b로 자식클래스 B의 인스턴스를 가리키고잇음
        동적바인딩...: 오버라이딩된 메서드를 호출할때 변수의 타입이 실제로 생성된
        객체의 타입을 기준으로 메서드 실행됨

        부모클래스A의 메서드 안에서 다른 메서드(draw)가 호출되더라도
        실제 객체가 자식B라면 자식클래스에서 오버라이딩된 메서드호출

          b.paint(); : b에 paint호출 실제 객체가 B이므로 B클래스 paint()호출

         */
    }
}

