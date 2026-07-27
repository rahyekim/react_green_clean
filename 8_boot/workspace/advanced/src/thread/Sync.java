package thread;

public class Sync {
    public static void main(String[] args) {
        //Calculator 객체 하나가 생성
        Calculator calculator = new Calculator();


        User1 user1 = new User1();
        user1.setCalculator(calculator); //User1에게 그 객체의 주소(참조값) 전달
        user1.start();

        User2 user2 = new User2();
        user2.setCalculator(calculator); //객체공유 같은 주소바라봄
        user2.start();
    }
}

/*
User1 ─┐
       ├── 같은 Calculator 객체 ── memory
User2 ─┘
 */
// setMemory2 일땐 50 50
// setMemory1 일땐 100 50

/*
멀티스레드는 하나의 객체를 공유해서 작업할수도있다
이경우 다른 스레드에 의해 객체 내부 데이터가 쉽게 변경될 수 있기때문에
의도햿던 것과는 다른 결과가 나올 수있다.
잘못하면 데이터가 날라 갈 수 있다.
그래서 객체 내부에 동기화 메소드와 동기화 블록이 여러개 있으면
이 들 중에 하나를 실행할때
다른 스레드는 해당 메소드는 물론이고
다른 동기화 메소드 및 블록도 실행 할 수 없다.
public synchronized void
 */



