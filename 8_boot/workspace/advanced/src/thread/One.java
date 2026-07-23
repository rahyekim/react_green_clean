package thread;

import java.awt.*;

public class One {
    public static void main(String[] args) {

        Thread thread= new Thread(new Runnable(){
            @Override
            public void run() {
                Toolkit toolkit = Toolkit.getDefaultToolkit();
                for(int i=0; i<5; i++){
                    toolkit.beep();
                    try{
                        Thread.sleep(500);
                    }catch (Exception e){}
                }
            }
        }); //thread 끝나면 세미콜론 꼭!
        thread.start();
        for(int i=0; i<5; i++){
            System.out.println("띵");
            try{Thread.sleep(500);}
            catch (Exception e)
            {throw new RuntimeException(e);
            }
        }
    }

}



/*
java.lang 패키지에 있는 Thread클래스로 부터 작업 스레드 객체 직접 생성
Runnable 구현 객체를 매개값으로 갖는 생성자를 호출
1) Thread thread= new Thraed(Runnable target);

Runnable은 스레드가 작업을 실행할때 사용하는 인터페이스
Runnable에는 run() 메소드가 정의됨
구현클래스는 run()을 재정의해서 스레드가 실행할 코드를 가지고 있어함

2)
	class Task implements Runnable{
		 @Override
		 public void run(){
		 //스레드가 실행할 코드

Runnable 구현 클래스는 작업 내용을 정의한 것으로 스레드에 전달을 해야함
Runnable 구현객체를 생성한 후 Thread 생성자 매개값으로 Runnable객체를 아래와 같이 전달한다

Runnable task = new Task();
Thread thread = new Tread(task);

3) 권장하는 방법
Thread thread= new Thread(new Runnable())
@Override
public void run(){
 //스레드 실행할 코드
};

4) 함수 호출하듯이 스레드 실행
thread.start();

 */

/* 일거리(Runnable)**와 **일꾼(Thread)**을 분리
 외주 작업자(Runnable)에게 일감을 맡겨서 일꾼(Thread)에 집어넣음"
 => 유연성높음 (다른 클래스 상속 가능)
  :Runnable은 implements 방식이라 다른 클래스를 상속받으면서도 스레드로 만들 수 있음!
  Runnable은 그냥 "실행할 작업 내용" 그 자체
10개의 스레드에 넘겨서 동시에 돌릴 수도 있고, 나중에 스레드 풀(Thread Pool)에 넣어서 재사용

 일꾼(Thread) 자체를 새로 만들어서 일시킴
 스스로 일할 줄 아는 전문 일꾼(Thread 자식)을 직접 고용
*/

