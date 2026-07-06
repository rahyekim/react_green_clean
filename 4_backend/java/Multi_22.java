/* ⭐멀티 스레드(Multi-Thread)...........

➡️  main도 하나의 스레드(Main Thread)가 실행하는것➡️

🔥여러 일꾼(스레드)이 하나의 자원(티켓 수량, 통장 잔고 등)을 동시에 건드릴 때, 
순서를 보장하지 않으면 데이터가 꼬인다!
⭐⭐ synchronized 한번에 한스레드만 접근하도록 ..순서맞춰서 한명씩들어가!!
동시성제어!! 스레드안전!🔥
*/
//준비된 티켓

import java.util.concurrent.CountDownLatch;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

class TicketOffice{
    
    private int ticketCount = 100; //준비된 티켓 100장 

    //예매 메서드
    // ⭐ synchronized: 일꾼이 티켓빼는동안 기다리게함..동시에2개씩못빼게..
    public synchronized void bookTicket (){ 
        if (ticketCount >0){
            //약속한듯이 try-catch
            try{
                //스레드간의 경합을 극대화하기위해 아주 짧은 지연시간 추가
                Thread.sleep(1); //0.001초

            }catch(InterruptedException e){
                e.printStackTrace(); //에러분석
            }
            ticketCount--; //티켓차감..
        }
    }
    //다른일 존재함
    public int getTicketCount(){
        return ticketCount;
    }
    
}


public class Multi_22 {
    
    public static void main(String[] args) throws InterruptedException {  //책임전가..ㅋㅋ
        //main출력전 스레드가 관여 스레드 먼저
        
        //준비된티켓 클래스를 office로 객체화
        TicketOffice office = new TicketOffice();
        
        int userCount = 300; //300명 동시접속 => 과부하...위험..

        ExecutorService excutor = Executors.newFixedThreadPool(32);  //만능 관리자 소장님
        //스레드가 작업을 효율적으로 하기 위함,, 미리 32명의 작업자를 생성하여 300명을 감당하게 

        CountDownLatch latch = new CountDownLatch(userCount);
        //300개의 작업이 모두 끝날때까지 메인 스레드 (프로그램의 메인흐름)가 기다려주도록 만드는
        //countdown 타이머 300부터 시작하여 0이되면 풀림
        //메인스레드는 성격급해서 티켓팔든말든ㅇ 자기할일끝나면(코드끝까지읽으면) 퇴근함(프로그램종료시킴)
        
        //반복되는 for loop 사용
        for (int i=0; i < userCount ; i++){  //300개의 예매작업을 스레드풀에 던져준다
            excutor.submit(()->{
                office.bookTicket(); //각스레드가 예매시도
                latch.countDown(); // 예매시도가 끝날때마다 latch숫자를 줄임
            });
        }
        
        latch.await(); //카운트다운이 0이 될때까지...main메서드는 ㄱ꼼짝말고기다림...
        excutor.shutdown(); // 모든작업이 끝나고...32명작업자 퇴근시킴  

        System.out.println("모든 예매 시도 종료");
        System.out.println("남은티켓수: "+ office.getTicketCount());

        
        
        

    }
}
