public class Oop_2 {
    
    int x = 5; //클래스안에 숫자형 변수x
    int y = 10; //이런것들을 속성이라한다.

    public static void main(String[] args){
        
        //그래서 위의 것을 객체화 하려면... 자바에서는 클래스명과 동일하게 대입시켜야 함
    Oop_2 myObj = new Oop_2();
    //클래스명 객체명 = new 클래스명에 함수표시 

    myObj.x = 15; //프로그래밍혼란...야기...
                    // ㄴfinal을 붙이면 변수속성값을 바꿀 수 없다.

    String oop = 
    "oop는 객체지향프로그래밍의 약자 object oriented programming\n"+
    "객체지향 프로그래밍은 절차적 프로그래밍에 비해 여러가지 장점이 있다.\n"+
    "객체지향 프로그래밍은 실행속도가 빠르다\n"+
    "DRY원칙을 지키는데 도움을 주며 코드의 유지보수 및 디버깅을 쉽게 만듭니다\n"+
    "더 적은 코드와 더 짧은 개발로 완전히 재사용 가능한 어플리케이션을 만든다.\n";

        System.out.println(oop);

        //객체화 시키고 출력하는 방법
        System.out.println(myObj.x);
        System.out.println(myObj.y);
    }
    
}
