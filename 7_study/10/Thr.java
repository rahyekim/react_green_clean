/*
스레드(Thread)
실행되는 작업의 흐름(갈래)라는 뜻
기본적으로 자바 프로그램은 main 메서드라는 하나의 흐름(메인 스레드)에서
위에서 아래로 순차적으로 실행
하지만 스레드를 추가로 생성하면 여러 작업을 동시에(병렬로) 처리 
(cf)비동기는:작업전환

🔥 자바에서 스레드를 만드는법 (⭐Runnable 인터페이스)구현 
자바에서는 스레드를 만들기 위해 보통 Runnable 인터페이스를 구현한다
Runnagble을 구현하겠다고 선언한 클래스 Car는 반드시 내부에
⭐run() 이라는 메서드를 만듦
 🟦 run() 메서드 안에 "새로운 스레드가 해야 할 작업 내용" 적어줌 

왜 new Thread(new Car())
Car클래스는 무엇을 할지 (run) 작업 지시서만 가지고 있을 뿐
스스로 새로운 실행 흐름을 만들어 낼 능력 없음
따라서 실제 일꾼 역할을 하는 Thread 객체를 새로 만들면서 (new Thread())
그 일꾼에게 이 작업 지시대로 일해 라고 Car 객체(new Car())를 넘겨주는것

 🟦 start() 메서드의 중요성
 ????????????????
 */

class Car implements Runnable{

    int a;

    public void run(){
        System.out.println("message");
    }
}


public class Thr {
    
    public static void main(String[] args) {
        
        Thread t1 = new Thread(new Car());
        t1.start(); //백그라운드에서 Car의 run()시작..
    }
}