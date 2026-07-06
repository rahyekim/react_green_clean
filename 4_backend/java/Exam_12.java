//오버로딩과 오버라이딩이 동시에 나오는 문제

class A{
    String f(Object x){ //f라는 메소드  매개변수는 object : 모든객체를 받을수잇음
        return "l"; //호출시 1 return
    }
    String g(){    //g 메소드
        return f("a");  //컴파일 할때는 f를호출하는것으로결정 
    }
}

class B extends A{ //A로부터상속..받는 B
    String f(Object x){  //a의 f objec를 다시 만듦 => 오버라이딩
        return "2"; //호출시 2반환
    }
    String f(String x){  
        return "3";
    }
}


public class Exam_12 { 
    public static void main(String[] args){  //프로그램시작!!! 클래스!!!

        A a= new B(); // 객체를 만드는데 큰 A클래스를 객체명 소문자 a로만듦 실제객체는 B
                        //그러나 변수 타입은 a
        System.out.println(a.g()); //b에는 g가존재하지않아서 a의 g를 사용
        //a의 g를 컴파일할때 f(object)밖에 없다. 실제 객체는 new B() 
        //그래서 실행할때는 B의 f(object x)가 호출 
    }
}
