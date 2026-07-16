class A{

   int a ;
   int b ; //클래스안의 멤버변수
   
}

public class Temp {

     static void func1(A m){ //클래스 A의 객체(m)을 매개변수로 받는 정적 메서드..
        m.a *= 10;  // m.a = m.a * 10
    }

    static void func2(A m){ 
         m.a += m.b; // m.a = m.a+ m.b
    }
    public static void main (String [] args){
        
        A m = new A();

        m.a =100;
        func1(m);  //1000

        m.b= m.a;
        func2(m); // 2000 객체m의 참조값을 fuc2로 넘겨 실행 

        
        System.out.println(m.a);
    }   
}


/*
객체의 참조가 메서드로 어떻게 전달되는지 확인
A m 메서드의 매개변수로 넘겨줄때 객체 자체가 복사되는 것이 아니라 
객체가 저장된 메모리 주소 참조값 전달 
 */


  
