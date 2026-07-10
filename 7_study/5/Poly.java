class ClassOne {
    int a,b;

    public ClassOne(int a, int b){  //10,11
        this.a = a;
        this.b = b;
    }

    public void print(){
        System.out.println(a+b);
    }
}

class ClassTwo extends ClassOne{

    int po=3;

    public ClassTwo(int i){ //10
        super(i, i+1); 
    }

    public void print(){
        System.out.println(po*po);
    }
}

public class Poly{

    public static void main(String[] args) {
        
        ClassOne one = new ClassTwo(10);
        
        one.print(); //자식메소드..9
        /*
        메서드가 완벽히 오버라이딩된후 껍데기 리모컨 부모타입이라도
        실제 메모리에 만들어진 알맹이 자식객체를 최우선으로 실행
        :동적바인딩....  변수는 정적바인딩...
         */
    }
    
}
