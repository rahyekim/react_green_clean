package thread;

import java.awt.Toolkit; //컴퓨터의 운영체제 기능

public class Intro {

	public static void main(String[] args) {
		//main 싱글스레드 삐 *5 ->끝난후-> 띵*5
		//만약 멀티스레드라면 삐 띵 *5 
		
		Toolkit toolkit = Toolkit.getDefaultToolkit();
		
		for(int i=0 ; i < 5; i++) {
			toolkit.beep(); //현재 실행 중인 스레드를 0.5초 동안 멈춰라
			
			try {Thread.sleep(500);
		}catch(Exception e){}
		}
		
		for(int i=0; i<5;i++) {
			System.out.println("띵");
			
			try {
				Thread.sleep(500);
			}catch(Exception e) {}
		}
			
	}
	
}



/*
 멀티스레드
 멀티태스킹: 두가지 이상의 작업을 동시 처리
 하나의 프로그램 프로세스 내에서 예를들어
 메신저는 채팅작업을 하면서 동시에 파일 전송 작업을 수행
 하나의 프로세스가 두가지 이상의 작업을 수행할 수 있는 이유
 멀티스레드가 있기 때문에....
 ❄️스레드는 코드의 실행흐름을 말하는데 
 프로세스내에서 스레드가 2개라면 두개의 코드 실행흐름이 생김
 💦 멀티프로세스 4개
 프로세스1[멀티스레드2] 프로세스2[싱글스레드] 프로세스3[싱글] 프로세스4[멀티스레드3]
  💦멀티 프로세스는 프로세스 1,2개가 망가져도 문제없이 작동이됨....
 하지만 ❄️멀티스레드는 프로세스 내부에서 생성되기 때문에
 하나의 스레드가 예외를 발생기키면 프로세스 종료
 그렇기 때문에 예외만전을 기해야함
 
 ❄️ 멀티스레드는 데이터를 분할하여 병렬로 처리하는 곳에서도 사용하고
 안드로이드 앱에서 네트워크 통신을 하기위해서도 사용
 또한 다수의 클라이언트 요청을 처리하는 서버를 개발할때도 사용
 
 💙 자바21부터는 가상스레드가 추가됨
 제한된 운영체제에서 가상스레드를 사용하면 아주 효율적
 
 자바에서는 메인스레드가 main()메소드를 실행하면서 시작됨
 마지막 코드를 실행하거나 리턴문return 만나면 종료..
 
 메인스레드는 필요에 ㄷ따라 추가 작업 스레드를 만들어서 실행시킬 수 있다.
 */

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












