
/* 
정적변수에 공유특성 후위 증가 연산자의 동작순서 
정적변수: static 키워드가 붙은 변수
객체를 여러개 만들더라도 메모리에 딱 하나만 생성
모든객체가 값을 공유 

일반인스턴스 변수 객체마다 독립적으로 가지는 변수
*/

class Static{
    public int a = 20; //인스턴스변수 
    static int b = 0; //모든 객체가 하나의 b값을 공유(static은 class소속)
}
public class Main {
    
    public static void main(String[] args) {

        int a ; //main메서드 안 지역변수 
        a = 10; // 지역변수 a에 10할당

        Static.b = a; //위에 클래스.b에 a의값(10)을 덮어씀..
        Static st = new Static(); // 인스턴스 a는 20으로 초기화 

        System.out.println(Static.b++); //후위증가연산자... 전위는즉시! 후위는 한타임뛰고그다음에..
        //현재 b의값 10을 먼저 화면에 출력 => 다음에 b의값을 1증가시켜 11로만듦 ++Static.b
        
        System.out.println(st.b); //11
        System.out.println(a); //10
        System.out.println(st.a); //20
        




        
        
        
    }

    
}
