class TicketSystem {

    private int availableTickets = 10;

    public synchronized void reserveTicket(String userName){
        if (availableTickets>0){
            System.out.println(userName + "님 예매 시도중(남은 티켓: "+availableTickets+ ")");
            availableTickets --;
            System.out.println(userName+ "님 예매성공! ");
        }else{
            System.out.println(userName+ "님 예매실패! 티켓이 매진되었습니다");
        }
    }
}
//스레드 작업 정의
class UserThread extends Thread{
    private TicketSystem ticketSystem 
}
    
