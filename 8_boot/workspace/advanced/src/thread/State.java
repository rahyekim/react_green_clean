package thread;

public class State {

    public static void  main(String[] args){
        SomeThread sumThread = new SomeThread();
        sumThread.start();

        try{
            sumThread.join(); //다른 스레드의 종료를 기다림
        } catch (InterruptedException e) {
        }
        System.out.print("1~100의합: "+sumThread.getSum());
    }
}
/*
join() 누가 멈추는가? sumThread가 아님...
✨join()을 호출한 스레드✨ main이 기다리는 것


<join()이없을때>
main 스레드
--------------------------
start()
바로 getSum() 실행
출력-> 0이나올수도..중간값이나올수도잇음

sumThread
--------------------------
run() 시작
1~100 더함
끝

----<join()을추가하면>
main
-----------------------
start()
join()에서 멈춤
        ↓
(sumThread 끝날 때까지 기다림)
        ↓
getSum()
출력

sumThread
-----------------------
run()
1~100 계산
종료
* */

/*
--일시정지--
sleep: 주어진 시간 동안 스레드를 일시 정지, 주어진 시간이 지나면 자동으로 실행대기
join(): 메소드를 호출한 스레드는 일시 정지상태가 된다.
실행대기 상태가 되려면, join()메소드를 가진 스레드가 종료되어야 함
wait(): 동기화 볼록 내에서 스레드를 일시 정지 상태로 만든다.

--일시정지에서 벗어남--
interrupt() : 일시정지 상태일 경우 InterruptedException 을
발생시켜 실행대기 상태 또는 종료상태로 만든다.
notify():
notifyAll(): wait()메소드로 인해 일시정지 상태인 스레드를 실행 대기 상태로 만든다.

--실행대기로 보냄
yield(): 실행 상태에서 다른 스레드에게 실행을 양보하고 실행 대기 상태가 됨

* 스레드 상태
* 1) 스레드 객체 생성(new)
* 2) start() 메소드를 호출하면
* 3) 곧바로 스레드가 실행되는 것이 아니라 실행 대기상태(Runnable)가 됨...
* 4) 실행 대기 하는 스레드는 CPU스케쥴링에 따라 CPU 점유하고 run() 실행..
* 이때 실행(Running) 상태라고 한다
* 5) 실행스레드는 run()메소드를 모두 실행하기전에
* 스케쥴링에 따라 다시 실행대기상태(Runnable)로 돌아갈 수 있음
* 6) 이렇게 스레드는 실행대기 상태와 실행상태를 번갈아 가면서
* 자신의 run() 메소드를 조금씩 실행...
* 7) run메소드가 종료되면 종료상태(TERMINATED)
* 8) 실행상태에서 일시정지 상태로 가기도 하는데 ...
* 일시정지 상태는 스레드가 실행 할 수 없는 상태
*
 */



