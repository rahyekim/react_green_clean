
public class Intro_1 { //자바는 시작할때 class로 시작 대문자로 이름(파일명)을가져야한다


    public static void main(String[] args){ 
        //랜더함수....스레드가관여하지않는한 여기를 먼저출력
 
        String yourName = "Moon"; //변수타입 변수명 = "value값"

        //스스로 프린트를 할 수 없어서 시스템에 접근
        System.out.println("hello" + yourName);


    }
}


/*
👉 main은 시작 버튼 👉 main 없으면 “망하는 게 아니라 실행 자체가 시작이 안 된다”
-시작할때객체없음
👉그래서반드시 static 써야함

먼저 자바 개념 👉 무조건 객체 만들어야 실행 가능
그러나 Java 프로그램 시작은 “아무것도 없는 상태”
그래서 나온 해결책 = static

“객체 만들 시간 없어. 그냥 바로 실행할 함수 필요함” =>static :객체 없이도 바로 실행 가능
👉 static은 “객체 없이 실행하기 위한 출구”다

java함수(메서드)
[반환타입] [함수이름] (매개변수) {}
String      f     ( object x) {} => 문자열반환
Void f () {} : 반환 없음
int f () {return 10;} => 정수 반환 

*/