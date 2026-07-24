package thread;

public class Name {

    public static void main(String[] args) {
        Thread mainthread = Thread.currentThread();
        System.out.println(mainthread.getName()+"실행"); //main1개

        for(int i=0; i<3 ; i++){ //객체3개
            Thread th1 = new Thread(){
                @Override
                public void run() {
                    System.out.println(getName()+" 실행");
                }
            };
            th1.start();
        }

        Thread chatTh = new Thread(){ //chat1개
            @Override
            public void run() {
                System.out.println(getName()+" 실행");

            }
        };
        chatTh.setName("chat-Thread");
        chatTh.start();
    }
}


/*
스레드는 자신의 이름을 가지고 있다.
작업스레드는 자동적으로 Thread-n 이라는 이름을 지님
작업스레드의 이름을 Thread-n 대신 다른이름으로 설정하려면
setName() 메소드를 사용



Thread 객체
    |
    └── run() 오버라이딩

    Thread 자체가 작업 내용(run)을 가지고 있는 형태
* */
